import { useState } from 'react';

import { MenuChannels } from 'src/channels/menuChannels';
import { useRendererListener } from 'src/hooks';
import { WindowState } from 'src/windowState';

interface ITitleBarProps {
  children: (props: WindowState) => React.ReactNode;
}

const handleDoubleClick = () => {
  electron.ipcRenderer.invoke(MenuChannels.WINDOW_TOGGLE_MAXIMIZE);
};

export default function Titlebar({ children }: ITitleBarProps) {
  const [windowState, setWindowState] = useState<WindowState>('normal');

  useRendererListener('window-state-changed', (_, windowState: WindowState) => setWindowState(windowState));

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className='fixed top-0 left-0 w-full z-50 h-8 overflow-hidden draggable select-none flex content-stretch text-sm bg-blue-600/50'
    >
      {children(windowState)}
    </div>
  );
}
