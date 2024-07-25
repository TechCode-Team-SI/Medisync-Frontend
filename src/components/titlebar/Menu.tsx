import { createRef, useMemo, useRef } from 'react';

import appLogo from 'assets/icons/icon.png';
import { MenuChannels } from 'src/channels/menuChannels';
import { fixAcceleratorText } from 'src/components/titlebar/windowMenu/accelerators';
import menuList, { getMenu } from 'src/components/titlebar/windowMenu/appMenu';
import { useEventListener } from 'src/hooks';
import { cn } from 'src/utils/utils';

export default function Menu() {
  const activeMenuIndex = useRef<number | null>(null);
  const menusRef = useMemo(() => menuList.map(() => createRef<HTMLDivElement>()), []);

  useEventListener('keydown', (event) => handleKeyDown(event));

  useEventListener('mousedown', (event) => handleClickOutside(event));

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return;
    if (e.altKey) activeMenuIndex.current && closeActiveMenu();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (activeMenuIndex.current != null) {
      if (
        menusRef[activeMenuIndex.current].current &&
        !menusRef[activeMenuIndex.current].current?.contains(event.target as Node)
      ) {
        closeActiveMenu();
      }
    }
  };

  const showMenu = (index: number, e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const currentMenuRef = menusRef[index].current;

    if (!currentMenuRef) return;

    if (currentMenuRef.ariaExpanded === 'true') {
      closeActiveMenu();
    } else {
      currentMenuRef.ariaExpanded = 'true';
      activeMenuIndex.current = index;
    }
  };

  const onMenuHover = (index: number) => {
    if (activeMenuIndex.current != null) {
      const activeMenuRef = menusRef[activeMenuIndex.current].current;
      const newMenuRef = menusRef[index].current;
      if (activeMenuRef) activeMenuRef.ariaExpanded = 'false';
      if (newMenuRef) newMenuRef.ariaExpanded = 'true';

      activeMenuIndex.current = index;
    }
  };

  const closeActiveMenu = () => {
    if (activeMenuIndex.current != null) {
      const activeMenuRef = menusRef[activeMenuIndex.current].current;
      if (activeMenuRef) activeMenuRef.ariaExpanded = 'false';
      activeMenuIndex.current = null;
    }
  };

  const handleAction = (menuItem: Electron.MenuItemConstructorOptions) => {
    closeActiveMenu();
    const actionId = menuItem.id;
    if (actionId) {
      if (actionId === MenuChannels.OPEN_GITHUB_PROFILE) {
        return electron.ipcRenderer.invoke(actionId, menuItem.label);
      }
      return electron.ipcRenderer.send(MenuChannels.EXECUTE_MENU_ITEM_BY_ID, actionId);
    }
  };

  const renderItemAccelerator = (menuItem: Electron.MenuItemConstructorOptions) => {
    if (menuItem.id === MenuChannels.WEB_ZOOM_IN) {
      const firstKey = __DARWIN__ ? '⌘' : 'Ctrl';
      const plus = __DARWIN__ ? '' : '+';
      const thirdKey = '+';
      return `${firstKey}${plus}${thirdKey}`;
    }

    if (menuItem.accelerator) {
      return fixAcceleratorText(menuItem.accelerator);
    }
  };

  return (
    <section className='items-center flex'>
      {/* Titlebar icon */}
      <section className='pl-[0.3em] pt-[0.65em] pb-[0.65em]'>
        <img className='w-6 h-6' src={appLogo} alt='App logo' />
      </section>

      {getMenu(__DEV__).map(({ label, submenu }, menuIndex) => {
        return (
          <div ref={menusRef[menuIndex]} className='group/menu relative' key={`menu_${menuIndex}`}>
            <div
              className={cn(
                'py-2 px-4 text-sm text-gray-200 group-aria-expanded/menu:bg-blue-700 group-aria-expanded/menu:text-gray-300 hover:bg-blue-700 cursor-pointer no-draggable',
              )}
              role='button'
              tabIndex={0}
              onClick={(e) => showMenu(menuIndex, e)}
              onKeyDown={(e) => showMenu(menuIndex, e)}
              onMouseEnter={() => onMenuHover(menuIndex)}
              onDoubleClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.preventDefault()}
            >
              {label}
            </div>
            <div
              className={cn(
                'hidden fixed bg-gray-100 min-w-[70px] py-1 border border-gray-200 shadow-md z-50 group-aria-expanded/menu:block',
              )}
            >
              {Array.isArray(submenu) &&
                submenu.map((menuItem, menuItemIndex) => {
                  if (menuItem.type === 'separator') {
                    return (
                      <div key={`menu_${menuIndex}_popup_item_${menuItemIndex}`} className='h-[1px] my-1 bg-gray-300' />
                    );
                  }

                  return (
                    <div
                      key={`menu_${menuIndex}_popup_item_${menuItemIndex}`}
                      className='group/item flex justify-between text-sm py-1 px-2 hover:bg-blue-600 cursor-pointer'
                      onMouseDown={(e) => e.preventDefault()}
                      onKeyDown={(e) => e.preventDefault()}
                      role='button'
                      tabIndex={0}
                      onClick={() => handleAction(menuItem)}
                    >
                      <div className=' group-hover/item:text-gray-100 pr-8'>{menuItem.label}</div>
                      <div className='text-gray-500 group-hover/item:text-blue-200'>
                        {renderItemAccelerator(menuItem)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </section>
  );
}
