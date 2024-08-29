import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { MenuChannels } from 'src/channels/menuChannels';
import Menu from 'src/components/titlebar/Menu';
import Titlebar from 'src/components/titlebar/Titlebar';
import WindowControls from 'src/components/titlebar/WindowControls';
import { useRendererListener } from 'src/hooks';

//import { Sidebar } from './components/sidebar/sidebar';
import { RootLayout } from './layouts/RootLayout';
import { paths } from './paths';
import { AppointmentDetails } from './screens/appointments/appointmentDetails';
import { Appointments } from './screens/appointments/appointments';
//import { Base } from './screens/base';
import { Dashboard } from './screens/dashboard/dashboard';
import { EditProfile } from './screens/editProfile/editProfile';
import { FetchDataDemo } from './screens/fetchDataDemo/fetchDataDemo';
import { FormDemo } from './screens/formDemo/FormDemo';
//import { HostToken } from './screens/HostToken/HostToken';
//import { Installation } from './screens/Installation/Installation';
import { listCard } from './screens/listCard/listCard';
//import { Login } from './screens/Login/Login';
//import { MedicalCenterConfig } from './screens/medicalCenterConfig/medicalCenterConfig';
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
          <Route path={paths.dashboard} Component={Dashboard} />

          <Route path={paths.appointments} Component={Appointments} />
          <Route path={paths.appointmentDetails} Component={AppointmentDetails} />

          <Route path={paths.editProfile} Component={EditProfile} />

          <Route path={paths.tableDemo} Component={TableDemo} />
          <Route path={paths.modalsDemo} Component={ModalsDemo} />
          <Route path={paths.formDemo} Component={FormDemo} />
          <Route path={paths.listCard} Component={listCard} />
          <Route path={paths.fetchDataDemo} Component={FetchDataDemo} />
        </Route>
      </Routes>
    </Router>
  );
}
