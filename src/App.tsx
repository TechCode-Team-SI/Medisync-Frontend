import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { MenuChannels } from 'src/channels/menuChannels';
import Menu from 'src/components/titlebar/Menu';
import Titlebar from 'src/components/titlebar/Titlebar';
import WindowControls from 'src/components/titlebar/WindowControls';
import { useRendererListener } from 'src/hooks';
import { Home } from 'src/screens/home/home';

import { RootLayout } from './layouts/RootLayout';
import { paths } from './paths';
import { FormDemo } from './screens/formDemo/FormDemo';
import { ModalsDemo } from './screens/modalsDemo/modalsDemo';
import { TableDemo } from './screens/tableDemo/tableDemo';

const onMenuEvent = (_: Electron.IpcRendererEvent, channel: string, ...args: any[]) => {
  electron.ipcRenderer.invoke(channel, args);
};

export default function App() {
  useRendererListener(MenuChannels.MENU_EVENT, onMenuEvent);

  return (
    <Router>
      <Titlebar>
        {(windowState) => (
          <>
            <Menu />
            <WindowControls windowState={windowState} />
          </>
        )}
      </Titlebar>
      <Routes>
        <Route Component={RootLayout}>
          <Route path={paths.home} Component={Home} />
          <Route path={paths.tableDemo} Component={TableDemo} />
          <Route path={paths.modalsDemo} Component={ModalsDemo} />
          <Route path={paths.formDemo} Component={FormDemo} />
        </Route>
      </Routes>
    </Router>
  );
}
