import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { MenuChannels } from 'src/channels/menuChannels';
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
import { AttendAppointment } from './screens/appointments/attendAppointment';
import { CreateReference } from './screens/appointments/createReference';
import { AttendClaims } from './screens/claims/attendClaims';
import { SeeClaims } from './screens/claims/seeClaims';
import { CreateUserAdmin } from './screens/createUserAdmin/createUserAdmin';
import { Dashboard } from './screens/dashboard/dashboard';
import { DashboardAdmin } from './screens/dashboard/dashboardAdmin';
//import { DatePickerDemo } from './screens/datePickerDemo/DatePickerDemo';
import { FetchDataDemo } from './screens/fetchDataDemo/fetchDataDemo';
import { FormDemo } from './screens/formDemo/FormDemo';
import { Login } from './screens/Login/Login';
import { MedicalCenterConfig } from './screens/medicalCenterConfig/medicalCenterConfig';
import { Packages } from './screens/packages/packages';
import { CreatePost } from './screens/Post/createPost';
import { DeletePost } from './screens/Post/deletePost';
import { DisablePost } from './screens/Post/disablePost';
import { EditPost } from './screens/Post/editPost';
import { AssignAgenda } from './screens/registerMedical/assignAgenda';
import { AssignAgendaEdit } from './screens/registerMedical/assignAgendaEdit';
import { EditMedical } from './screens/registerMedical/editMedical';
import { EditMedicalStaff } from './screens/registerMedical/editMedicalStaff';
import { RegisterMedical } from './screens/registerMedical/registerMedical';
import { RegisterMedicalStaff } from './screens/registerMedical/registerMedicalStaff';
import { AddSchedule } from './screens/schedules/addSchedule';
import { disableSchedules } from './screens/schedules/DisableSchedules';
import { EditForm } from './screens/schedules/editForm';
import { EdiSchedules } from './screens/schedules/EditSchedules';
import { Schedules } from './screens/schedules/registerSchedules';
import { AssignTemplate } from './screens/specialty/assignTemplate';
import { DisableSpecialty } from './screens/specialty/disableSpecialty';
import { EditSpecialty } from './screens/specialty/editSpecialty';
import { RegisterSpecialty } from './screens/specialty/registerSpecialty';
import { Start } from './screens/start';
import { AttendSuggestions } from './screens/suggestions/attendSuggestions';
import { SeeSuggestions } from './screens/suggestions/seeSuggestions';
import { TableDemo } from './screens/tableDemo/tableDemo';
import { CreateUser } from './screens/user/createUser';
import { EditProfile } from './screens/user/editProfile';
import { UserView } from './screens/user/userView';
import { UserViewDetail } from './screens/user/viewUserDetails';
import { useSessionStore } from './store/sessionStore';
import { ProtectedRoute, PublicRoute } from './utils/protectedRoutes';

const onMenuEvent = (_: Electron.IpcRendererEvent, channel: string, ...args: any[]) => {
  electron.ipcRenderer.invoke(channel, args);
};

export default function App() {
  useRendererListener(MenuChannels.MENU_EVENT, onMenuEvent);

  const { isAuth } = useSessionStore();

  return (
    <Router>
      <Routes>
        <Route Component={RootLayout}>
          {/* Paginas fuera de la app*/}

          <Route element={<PublicRoute canActive={isAuth()} />}>
            <Route path={paths.start} Component={Start} />
            <Route path={paths.createuseradmin} Component={CreateUserAdmin} />
            <Route path={paths.packages} Component={Packages} />
            <Route path={paths.medicalCenterConfig} Component={MedicalCenterConfig} />
            <Route path={paths.login} Component={Login} />
          </Route>

          <Route element={<ProtectedRoute canActive={isAuth()} />}>
            {/* Paginas Principales*/}
            <Route path={paths.dashboard} Component={Dashboard} />
            <Route path={paths.dashboardadmin} Component={DashboardAdmin} />

            <Route path={paths.agenda} Component={Agenda} />
            {/* Paginas de Usuario */}
            <Route path={paths.editProfile} Component={EditProfile} />
            <Route path={paths.createuser} Component={CreateUser} />
            <Route path={paths.userview} Component={UserView} />
            <Route path={paths.userviewdetail} Component={UserViewDetail} />
            {/* Paginas de Citas */}
            <Route path={paths.appointments} Component={Appointments} />
            <Route path={paths.appointmentDetails} Component={AppointmentDetails} />
            <Route path={paths.attendappointment} Component={AttendAppointment} />
            <Route path={paths.createReference} Component={CreateReference} />
            {/* Paginas de Personal Medico */}
            <Route path={paths.registermedical} Component={RegisterMedical} />
            <Route path={paths.registermedicalstaff} Component={RegisterMedicalStaff} />
            <Route path={paths.editmedical} Component={EditMedical} />
            <Route path={paths.editmedicalstaff} Component={EditMedicalStaff} />
            <Route path={paths.assignagenda} Component={AssignAgenda} />
            <Route path={paths.assignagendaedit} Component={AssignAgendaEdit} />
            {/* Paginas de Horario*/}
            <Route path={paths.registerSchedules} Component={Schedules} />
            <Route path={paths.editSchedules} Component={EdiSchedules} />
            <Route path={paths.disableSchedules} Component={disableSchedules} />
            <Route path={paths.addSchedule} Component={AddSchedule} />
            <Route path={paths.editForm} Component={EditForm} />
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
            {/* Paginas de Post */}
            <Route path={paths.createpost} Component={CreatePost} />
            <Route path={paths.editpost} Component={EditPost} />
            <Route path={paths.deletepost} Component={DeletePost} />
            <Route path={paths.disablepost} Component={DisablePost} />

            {/* Paginas de Reclamos */}
            <Route path={paths.attendclaims} Component={AttendClaims} />
            <Route path={paths.seeclaims} Component={SeeClaims} />

            {/* Paginas de Sugerencias */}
            <Route path={paths.seesuggestions} Component={SeeSuggestions} />
            <Route path={paths.attendsuggestions} Component={AttendSuggestions} />

            <Route path={paths.assignTemplate} Component={AssignTemplate} />
            <Route path={paths.tableDemo} Component={TableDemo} />
            <Route path={paths.formDemo} Component={FormDemo} />
            <Route path={paths.fetchDataDemo} Component={FetchDataDemo} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
