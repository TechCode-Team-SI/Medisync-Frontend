import { useCallback } from 'react';

import { MenuChannels } from 'src/channels/menuChannels';
import { ControlButton } from 'src/components/titlebar/ControlButton';
import { cn } from 'src/utils/utils';
import { WindowState } from 'src/windowState';

// These paths are all drawn to a 10x10 view box and replicate the symbols on Windows controls.
const closePath = 'M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z';
const restorePath = 'm 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z';
const maximizePath = 'M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z';
const minimizePath = 'M 0,5 10,5 10,6 0,6 Z';

interface IWindowControlsProps {
  readonly windowState: WindowState;
}

export default function WindowControls({ windowState }: IWindowControlsProps) {
  const executeWindowCommand = useCallback((command: string) => {
    electron.ipcRenderer.invoke(command, windowState);
  }, []);

  return (
    <section className={cn('flex justify-stretch ml-auto no-draggable text-gray-200', 'type-win32')}>
      <ControlButton
        name='minimize'
        onClick={() => executeWindowCommand(MenuChannels.WINDOW_MINIMIZE)}
        path={minimizePath}
      />
      <ControlButton
        name={windowState === 'maximized' ? 'restore' : 'maximize'}
        onClick={() => executeWindowCommand(MenuChannels.WINDOW_TOGGLE_MAXIMIZE)}
        path={windowState === 'maximized' ? restorePath : maximizePath}
      />
      <ControlButton
        name='close'
        className='hover:bg-red-600 color-gray-200'
        onClick={() => executeWindowCommand(MenuChannels.WINDOW_CLOSE)}
        path={closePath}
      />
    </section>
  );
}
