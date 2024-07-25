import { MenuChannels } from 'src/channels/menuChannels';
import { emitEvent } from 'src/webContents';

const MenuItems: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'View',
    submenu: [
      {
        id: MenuChannels.WEB_ACTUAL_SIZE,
        label: 'Reset Zoom',
        role: 'resetZoom',
        accelerator: 'CmdOrCtrl+0',
      },
      {
        id: MenuChannels.WEB_ZOOM_IN,
        label: 'Zoom In',
        role: 'zoomIn',
      },
      {
        id: MenuChannels.WEB_ZOOM_OUT,
        label: 'Zoom Out',
        role: 'zoomOut',
        accelerator: 'CmdOrCtrl+-',
      },
    ],
  },
  {
    label: 'Dev',
    submenu: [
      {
        id: MenuChannels.WEB_TOGGLE_DEVTOOLS,
        label: 'Toogle Developer Tools',
        role: 'toggleDevTools',
        accelerator: 'CmdOrCtrl+Shift+I',
      },
    ],
  },
  {
    label: 'Authors',
    submenu: [
      {
        id: MenuChannels.OPEN_GITHUB_PROFILE,
        label: 'TechCode',
        click: emitEvent(MenuChannels.OPEN_GITHUB_PROFILE, 'techcode'),
      },
    ],
  },
];

export const getMenu = (isDev: boolean): Electron.MenuItemConstructorOptions[] => {
  const menu: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'View',
      submenu: [
        {
          id: MenuChannels.WEB_ACTUAL_SIZE,
          label: 'Reset Zoom',
          role: 'resetZoom',
          accelerator: 'CmdOrCtrl+0',
        },
        {
          id: MenuChannels.WEB_ZOOM_IN,
          label: 'Zoom In',
          role: 'zoomIn',
        },
        {
          id: MenuChannels.WEB_ZOOM_OUT,
          label: 'Zoom Out',
          role: 'zoomOut',
          accelerator: 'CmdOrCtrl+-',
        },
      ],
    },
    {
      label: 'Authors',
      submenu: [
        {
          id: MenuChannels.OPEN_GITHUB_PROFILE,
          label: 'TechCode',
          click: emitEvent(MenuChannels.OPEN_GITHUB_PROFILE, 'techcode'),
        },
      ],
    },
  ];

  if (isDev) {
    menu.push({
      label: 'Dev',
      submenu: [
        {
          id: MenuChannels.WEB_TOGGLE_DEVTOOLS,
          label: 'Toogle Developer Tools',
          role: 'toggleDevTools',
          accelerator: 'CmdOrCtrl+Shift+I',
        },
      ],
    });
  }

  return menu;
};

export default MenuItems;
