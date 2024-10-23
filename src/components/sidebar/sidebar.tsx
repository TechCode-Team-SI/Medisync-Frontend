import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { paths } from 'src/paths';
import { useSessionStore } from 'src/store/sessionStore';
import { allCoincidences, cn, hasCoincidences } from 'src/utils';

import Logo from '../ui/icons/logo';

import {
  SidebarContainer,
  SidebarContainerLink,
  SidebarCopyRight,
  SidebarCopyRightContainer,
  SidebarDescription,
  SidebarLink,
  SideBarList,
  SidebarLogoContainer,
  SidebarOptions,
  SidebarTextLink,
} from './components';
import { navItems, SidebarItemData, SidebarSubItemData } from './elements';

export function Sidebar() {
  const { logout, getPermissions } = useSessionStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(paths.login);
  };

  const renderSidebarItems = () => {
    const updatedNavItems = navItems.map((item) => {
      if (item.id === '21-cerrar-sesion') {
        return {
          ...item,
          onClick: handleLogout,
        };
      }
      return item;
    });

    const currentPermissions = getPermissions();
    const filteredNavItems: SidebarItemData[] = [];

    for (const navItem of updatedNavItems) {
      if (navItem.permissions.length > 0 && !hasCoincidences(navItem.permissions, currentPermissions)) {
        continue;
      }
      const navItemCopy: SidebarItemData = { ...navItem, items: [] };
      const subItems: SidebarSubItemData[] = [];

      for (const item of navItem.items || []) {
        if (item.permissions.length > 0 && !allCoincidences(item.permissions, currentPermissions)) {
          continue;
        }
        subItems.push(item);
      }
      navItemCopy.items = subItems;
      filteredNavItems.push(navItemCopy);
    }

    return filteredNavItems;
  };

  return (
    <SidebarContainer>
      <SidebarLogoContainer>
        <Logo fill='white' className='h-[76px] w-[66px]' />
      </SidebarLogoContainer>

      <SidebarOptions>
        <SideBarList>
          {renderSidebarItems().map((item: SidebarItemData) => (
            <SidebarItem key={item.id} {...item} />
          ))}
        </SideBarList>
      </SidebarOptions>
      <SidebarCopyRightContainer>
        <SidebarCopyRight>Por TechCode</SidebarCopyRight>
      </SidebarCopyRightContainer>
    </SidebarContainer>
  );
}

const SidebarItem = (props: SidebarItemData) => {
  const [isShown, setIsShown] = useState(false);

  const onClickEvent = () => {
    setIsShown((prev) => !prev);
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <>
      <SidebarDescription>{props.category}</SidebarDescription>
      <SideBarList>
        <SidebarContainerLink>
          <SidebarLink to={props.to || '#'} onClick={onClickEvent}>
            {props.Icon}
            <SidebarTextLink>{props.label}</SidebarTextLink>
          </SidebarLink>
        </SidebarContainerLink>
        <SideBarList className={cn(isShown ? '' : 'hidden')}>
          {props.items && (
            <SidebarContainerLink>
              {props.items.map((item) => (
                <SidebarLink key={item.id} to={item.to || '#'} variant={'secondary'}>
                  {item.Icon}
                  <SidebarTextLink>{item.label}</SidebarTextLink>
                </SidebarLink>
              ))}
            </SidebarContainerLink>
          )}
        </SideBarList>
      </SideBarList>
    </>
  );
};
