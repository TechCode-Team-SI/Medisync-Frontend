import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { MenuChannels } from 'src/channels/menuChannels';
import Menu from 'src/components/titlebar/Menu';
import Titlebar from 'src/components/titlebar/Titlebar';
import WindowControls from 'src/components/titlebar/WindowControls';
import { useRendererListener } from 'src/hooks';

import { RootLayout } from './layouts/RootLayout';
import { paths } from './paths';
import { Agenda } from './screens/agenda/agenda';
import { DisableAgenda } from './screens/agenda/disableAgenda';
import { EditAgenda } from './screens/agenda/editAgenda';
import { EditWorkAgenda } from './screens/agenda/editWorkAgenda';
import { RegisterAgenda } from './screens/agenda/registerAgenda';
import { WorkAgenda } from './screens/agenda/workAgenda';
import { AppointmentDetails } from './screens/appointments/appointmentDetails';
import { Appointments } from './screens/appointments/appointments';
//import { Base } from './screens/base';
import { CreateReference } from './screens/appointments/createReference';
import { Dashboard } from './screens/dashboard/dashboard';
import { DashboardAdmin } from './screens/dashboard/dashboardAdmin';
import { EditProfile } from './screens/editProfile/editProfile';
import { FetchDataDemo } from './screens/fetchDataDemo/fetchDataDemo';
import { FormDemo } from './screens/formDemo/FormDemo';
//import { HostToken } from './screens/HostToken/HostToken';
//import { Installation } from './screens/Installation/Installation';
//import { Login } from './screens/Login/Login';
import { MedicalCenterConfig } from './screens/medicalCenterConfig/medicalCenterConfig';
//import { ModalsDemo } from './screens/modalsDemo/modalsDemo';
import { AddSchedule } from './screens/schedules/addSchedule';
import { DisableSchedules } from './screens/schedules/disableSchedules';
import { EditForm } from './screens/schedules/editForm';
import { EditSchedules } from './screens/schedules/editSchedules';
import { Schedules } from './screens/schedules/registerSchedules';
import { AssignTemplate } from './screens/specialty/assignTemplate';
import { DisableSpecialty } from './screens/specialty/disableSpecialty';
import { EditSpecialty } from './screens/specialty/editSpecialty';
import { RegisterSpecialty } from './screens/specialty/registerSpecialty';
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
          {/* Paginas Principales*/}
          <Route path={paths.dashboard} Component={Dashboard} />
          <Route path={paths.dashboardadmin} Component={DashboardAdmin} />
          <Route path={paths.editProfile} Component={EditProfile} />
          <Route path={paths.agenda} Component={Agenda} />
          <Route path={paths.medicalCenterConfig} Component={MedicalCenterConfig} />

          {/* Paginas de Citas */}
          <Route path={paths.appointments} Component={Appointments} />
          <Route path={paths.appointmentDetails} Component={AppointmentDetails} />
          <Route path={paths.editProfile} Component={EditProfile} />
          <Route path={paths.createReference} Component={CreateReference} />

          {/* Paginas de Agenda Laboral */}
          <Route path={paths.workagenda} Component={WorkAgenda} />
          <Route path={paths.registeragenda} Component={RegisterAgenda} />
          <Route path={paths.editworkagenda} Component={EditWorkAgenda} />
          <Route path={paths.editagenda} Component={EditAgenda} />
          <Route path={paths.disableagenda} Component={DisableAgenda} />

          {/* Paginas de especialidades */}
          <Route path={paths.registerSpecialty} Component={RegisterSpecialty} />
          <Route path={paths.editSpecialty} Component={EditSpecialty} />
          <Route path={paths.disableSpecialty} Component={DisableSpecialty} />
          <Route path={paths.assignTemplate} Component={AssignTemplate} />

          {/* Paginas de Horarios */}
          <Route path={paths.registerSchedules} Component={Schedules} />
          <Route path={paths.editSchedules} Component={EditSchedules} />
          <Route path={paths.disableSchedules} Component={DisableSchedules} />
          <Route path={paths.addSchedule} Component={AddSchedule} />
          <Route path={paths.editForm} Component={EditForm} />

          <Route path={paths.tableDemo} Component={TableDemo} />
          <Route path={paths.formDemo} Component={FormDemo} />
          <Route path={paths.fetchDataDemo} Component={FetchDataDemo} />
        </Route>
      </Routes>
    </Router>
  );
}
