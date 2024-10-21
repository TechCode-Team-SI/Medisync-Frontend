import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { MenuChannels } from 'src/channels/menuChannels';
import { useRendererListener } from 'src/hooks';

import { MainAppLayout } from './layouts/MainAppLayout';
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
import { disableArea } from './screens/area/disableArea';
import { editArea } from './screens/area/editArea';
import { registerArea } from './screens/area/registerArea';
import { AttendClaims } from './screens/claims/attendClaims';
import { SeeClaims } from './screens/claims/seeClaims';
import { CreateUser } from './screens/createUser/createUser';
import { Dashboard } from './screens/dashboard/dashboard';
import { DashboardAdmin } from './screens/dashboard/dashboardAdmin';
import { deleteDiseases } from './screens/diseases/deleteDiseases';
import { editDiseases } from './screens/diseases/editDiseases';
import { registerDiseases } from './screens/diseases/registerDiseases';
import { seeDiseases } from './screens/diseases/seeDiseases';
import { FetchDataDemo } from './screens/fetchDataDemo/fetchDataDemo';
import { bloodForm } from './screens/form/bloodForm';
import { createForm } from './screens/form/createForm';
import { disableForm } from './screens/form/disableForm';
import { listForm } from './screens/form/listForm';
import { FormDemo } from './screens/formDemo/FormDemo';
import { HostToken } from './screens/HostToken/HostToken';
import { deleteInjury } from './screens/injury/deleteInjury';
import { editInjury } from './screens/injury/editInjury';
import { registerInjury } from './screens/injury/registerInjury';
import { seeInjury } from './screens/injury/seeInjury';
import { Installation } from './screens/Installation/Installation';
import { Login } from './screens/Login/Login';
import { MedicalCenterConfig } from './screens/medicalCenterConfig/medicalCenterConfig';
import { Packages } from './screens/packages/packages';
import { deletePathology } from './screens/pathology/deletePathology';
import { editPathology } from './screens/pathology/editPathology';
import { registerPathology } from './screens/pathology/registerPathology';
import { seePathology } from './screens/pathology/seePathology';
import { CreatePost } from './screens/Post/createPost';
import { DeletePost } from './screens/Post/DeletePost';
import { DisablePost } from './screens/Post/disablePost';
import { EditPost } from './screens/Post/EditPost';
import { createQuestion } from './screens/question/createQuestion';
import { deleteQuestion } from './screens/question/deleteQuestion';
import { listQuestion } from './screens/question/listQuestion';
import { AssignAgenda } from './screens/registerMedical/assignAgenda';
import { AssignAgendaEdit } from './screens/registerMedical/assignAgendaEdit';
import { EditMedical } from './screens/registerMedical/editMedical';
import { EditMedicalStaff } from './screens/registerMedical/editMedicalStaff';
import { RegisterMedical } from './screens/registerMedical/registerMedical';
import { RegisterMedicalStaff } from './screens/registerMedical/registerMedicalStaff';
import { assignRol } from './screens/rol/assignRol';
import { deleteRol } from './screens/rol/deleteRol';
import { editRol } from './screens/rol/editRol';
import { registerRol } from './screens/rol/registerRol';
import { AddSchedule } from './screens/schedules/addSchedule';
import { disableSchedules } from './screens/schedules/DisableSchedules';
import { EditForm } from './screens/schedules/editForm';
import { EdiSchedules } from './screens/schedules/EditSchedules';
import { Schedules } from './screens/schedules/registerSchedules';
import { AssignTemplate } from './screens/specialty/assignTemplate';
import { DisableSpecialty } from './screens/specialty/disableSpecialty';
import { EditSpecialty } from './screens/specialty/editSpecialty';
import { RegisterSpecialty } from './screens/specialty/registerSpecialty';
import { AttendSuggestions } from './screens/suggestions/attendSuggestions';
import { SeeSuggestions } from './screens/suggestions/seeSuggestions';
import { deleteSymptom } from './screens/symptom/deleteSymptom';
import { editSymptom } from './screens/symptom/editSymptom';
import { registerSymptom } from './screens/symptom/registerSymptom';
import { seeSymptom } from './screens/symptom/seeSymptom';
import { TableDemo } from './screens/tableDemo/tableDemo';
import { EditProfile } from './screens/user/editProfile';
import { UserView } from './screens/user/userView';
import { UserViewDetail } from './screens/user/viewUserDetails';

const onMenuEvent = (_: Electron.IpcRendererEvent, channel: string, ...args: any[]) => {
  electron.ipcRenderer.invoke(channel, args);
};

export default function App() {
  useRendererListener(MenuChannels.MENU_EVENT, onMenuEvent);

  return (
    <Router>
      <Routes>
        <Route Component={RootLayout}>
          {/* Paginas fuera de la app*/}
          <Route path={paths.installation} Component={Installation} />
          <Route path={paths.hostToken} Component={HostToken} />
          <Route path={paths.login} Component={Login} />
          <Route path={paths.createuser} Component={CreateUser} />
          <Route path={paths.packages} Component={Packages} />

          <Route Component={createForm}>
            {/* Paginas Principales*/}
            <Route path={paths.dashboard} Component={Dashboard} />
            <Route path={paths.dashboardadmin} Component={DashboardAdmin} />
            <Route path={paths.agenda} Component={Agenda} />
            <Route path={paths.medicalCenterConfig} Component={MedicalCenterConfig} />
            {/* Paginas de Usuario */}
            <Route path={paths.editProfile} Component={EditProfile} />
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
            {/* Paginas de Sintomas */}
            <Route path={paths.registersymptom} Component={registerSymptom} />
            <Route path={paths.deletesymptom} Component={deleteSymptom} />
            <Route path={paths.editsymptom} Component={editSymptom} />
            <Route path={paths.seesymptom} Component={seeSymptom} />

            {/* Paginas de patologia */}
            <Route path={paths.registerpathology} Component={registerPathology} />
            <Route path={paths.deletepathology} Component={deletePathology} />
            <Route path={paths.editpathology} Component={editPathology} />
            <Route path={paths.seepathology} Component={seePathology} />

            {/* Paginas de Lesiones */}
            <Route path={paths.registerinjury} Component={registerInjury} />
            <Route path={paths.deleteinjury} Component={deleteInjury} />
            <Route path={paths.editinjury} Component={editInjury} />
            <Route path={paths.seeinjury} Component={seeInjury} />

            {/* Paginas de enfermedades */}
            <Route path={paths.registerdiseases} Component={registerDiseases} />
            <Route path={paths.deletediseases} Component={deleteDiseases} />
            <Route path={paths.editdiseases} Component={editDiseases} />
            <Route path={paths.seediseases} Component={seeDiseases} />

            {/* Paginas de especialidades */}
            <Route path={paths.registerSpecialty} Component={RegisterSpecialty} />
            <Route path={paths.editSpecialty} Component={EditSpecialty} />
            <Route path={paths.disableSpecialty} Component={DisableSpecialty} />

            {/* Paginas de Roles */}
            <Route path={paths.assignrol} Component={assignRol} />
            <Route path={paths.deleterol} Component={deleteRol} />
            <Route path={paths.editrol} Component={editRol} />
            <Route path={paths.registerrol} Component={registerRol} />

            {/* Paginas de Lesiones */}
            <Route path={paths.registerinjury} Component={registerInjury} />
            <Route path={paths.editinjury} Component={editInjury} />
            <Route path={paths.deleteinjury} Component={deleteInjury} />
            <Route path={paths.seeinjury} Component={seeInjury} />
            {/* Paginas de Post */}
            <Route path={paths.createpost} Component={CreatePost} />
            <Route path={paths.editpost} Component={EditPost} />
            <Route path={paths.deletepost} Component={DeletePost} />
            <Route path={paths.disablepost} Component={DisablePost} />
            {/*Paginas de Area */}
            <Route path={paths.registerarea} Component={registerArea} />
            <Route path={paths.editarea} Component={editArea} />
            <Route path={paths.disablearea} Component={disableArea} />

            {/* Paginas de Reclamos */}
            <Route path={paths.attendclaims} Component={AttendClaims} />
            <Route path={paths.seeclaims} Component={SeeClaims} />

            {/* Paginas de Preguntas */}
            <Route path={paths.createquestion} Component={createQuestion} />
            <Route path={paths.deletequestion} Component={deleteQuestion} />
            <Route path={paths.listquestion} Component={listQuestion} />

            {/* Paginas de Formularios */}
            <Route path={paths.createform} Component={createForm} />
            <Route path={paths.disableform} Component={disableForm} />
            <Route path={paths.listform} Component={listForm} />
            <Route path={paths.formblood} Component={bloodForm} />

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
