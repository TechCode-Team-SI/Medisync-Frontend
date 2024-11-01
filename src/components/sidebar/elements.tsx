import { ExitIcon } from '@radix-ui/react-icons';

import { paths } from 'src/paths';
import { PermissionsEnum } from 'src/utils/constants';

import Agenda from '../ui/icons/agenda';
import Calendar from '../ui/icons/calendar';
import CalendarAgg from '../ui/icons/calendarAgg';
import Claims from '../ui/icons/claims';
import Clock from '../ui/icons/clock';
import Form from '../ui/icons/form';
import Home from '../ui/icons/home';
import Injuries from '../ui/icons/injuries';
import Location from '../ui/icons/location';
import MedicalStaff from '../ui/icons/medicalStaff';
import Publications from '../ui/icons/publications';
import Questions from '../ui/icons/questions';
import Rol from '../ui/icons/rol';
import Settings from '../ui/icons/settings';
import Specialties from '../ui/icons/specialties';
import Suggestions from '../ui/icons/suggestions';
import User from '../ui/icons/user';

export type SidebarSubItemData = {
  id: string;
  label: string;
  to?: string;
  Icon?: JSX.Element;
  permissions: PermissionsEnum[];
};

export type SidebarItemData = {
  id: string;
  category: string;
  label: string;
  permissions: PermissionsEnum[];
  Icon?: JSX.Element;
  to?: string;
  items?: SidebarSubItemData[];
  onClick?: () => void;
};

const iconStyle = 'w-[19px] h-[18px] mr-3 fill-current';

export const navItems: SidebarItemData[] = [
  {
    id: '1-servicios',
    category: 'SERVICIOS',
    label: 'Dashboard',
    Icon: <Home className={iconStyle} />,
    permissions: [PermissionsEnum.MANAGE_STATISTICS],
    to: paths.dashboard,
  },
  {
    id: '2-citas',
    category: 'CITAS',
    label: 'Citas médicas',
    Icon: <CalendarAgg className={iconStyle} />,
    permissions: [],
    items: [
      {
        id: '2-1-ver-citas',
        label: 'Ver citas',
        to: paths.appointments,
        permissions: [],
        Icon: <Calendar className={iconStyle} />,
      },
      {
        id: '2-2-atender-citas',
        label: 'Atender citas',
        to: paths.attendappointment,
        permissions: [],
        Icon: <Calendar className={iconStyle} />,
      },
      {
        id: '2-3-calendario',
        label: 'Calendario',
        permissions: [],
        Icon: <Calendar className={iconStyle} />,
      },
    ],
  },
  {
    id: '3-gestion-usuarios',
    category: 'GESTIÓN DE USUARIOS',
    label: 'Personal médico',
    Icon: <MedicalStaff className={iconStyle} />,
    permissions: [PermissionsEnum.CREATE_USER, PermissionsEnum.EDIT_USER, PermissionsEnum.ASSIGN_AGENDA],
    items: [
      {
        id: '3-1-registrar-personal',
        label: 'Registrar personal',
        to: paths.registermedical,
        permissions: [PermissionsEnum.CREATE_USER],
        Icon: <MedicalStaff className={iconStyle} />,
      },
      {
        id: '3-2-editar-personal',
        label: 'Editar personal',
        to: paths.editmedical,
        permissions: [PermissionsEnum.EDIT_USER],
        Icon: <MedicalStaff className={iconStyle} />,
      },
      {
        id: '3-3-asignar-agenda',
        label: 'Asignar agenda',
        to: paths.assignagenda,
        permissions: [PermissionsEnum.ASSIGN_AGENDA],
        Icon: <Agenda className={iconStyle} />,
      },
    ],
  },
  {
    id: '4-especialidades',
    category: 'GESTIÓN DE USUARIOS',
    label: 'Especialidades',
    Icon: <Specialties className={iconStyle} />,
    permissions: [PermissionsEnum.MANAGE_SPECIALTIES],
    items: [
      {
        id: '4-1-registrar-especialidad',
        label: 'Registrar especialidad',
        to: paths.registerSpecialty,
        permissions: [PermissionsEnum.MANAGE_SPECIALTIES],
        Icon: <Specialties className={iconStyle} />,
      },
      {
        id: '4-2-editar-especialidad',
        label: 'Editar especialidad',
        to: paths.editSpecialty,
        permissions: [PermissionsEnum.MANAGE_SPECIALTIES],
        Icon: <Specialties className={iconStyle} />,
      },
      {
        id: '4-3-deshabilitar-especialidad',
        label: 'Deshabilitar especialidad',
        to: paths.disableSpecialty,
        permissions: [PermissionsEnum.MANAGE_SPECIALTIES],
        Icon: <Specialties className={iconStyle} />,
      },
      {
        id: '4-4-asignar-plantilla',
        label: 'Asignar plantilla',
        to: paths.assignTemplate,
        permissions: [PermissionsEnum.MANAGE_SPECIALTIES],
        Icon: <Specialties className={iconStyle} />,
      },
    ],
  },
  {
    id: '5-usuarios',
    category: 'GESTIÓN DE USUARIOS',
    label: 'Usuarios',
    Icon: <User className={iconStyle} />,
    permissions: [PermissionsEnum.VIEW_ALL_USERS],
    items: [
      {
        id: '5-1-ver-usuarios',
        label: 'Ver usuarios',
        to: paths.userview,
        permissions: [PermissionsEnum.VIEW_ALL_USERS],
        Icon: <User className={iconStyle} />,
      },
    ],
  },
  {
    id: '6-configuracion',
    category: 'CONFIGURACIÓN',
    label: 'Horarios',
    Icon: <Clock className={iconStyle} />,
    permissions: [PermissionsEnum.MANAGE_SCHEDULE],
    items: [
      {
        id: '6-1-registrar-horario',
        label: 'Registrar Horario',
        to: paths.registerSchedules,
        permissions: [PermissionsEnum.MANAGE_SCHEDULE],
        Icon: <Clock className={iconStyle} />,
      },
      {
        id: '6-2-editar-horario',
        label: 'Editar Horario',
        to: paths.editSchedules,
        permissions: [PermissionsEnum.MANAGE_SCHEDULE],
        Icon: <Clock className={iconStyle} />,
      },
      {
        id: '6-3-deshabilitar-horario',
        label: 'Deshabilitar Horario',
        to: paths.disableSchedules,
        permissions: [PermissionsEnum.MANAGE_SCHEDULE],
        Icon: <Clock className={iconStyle} />,
      },
    ],
  },
  {
    id: '7-agenda-laboral',
    category: 'CONFIGURACIÓN',
    label: 'Agenda Laboral',
    Icon: <Clock className={iconStyle} />,
    permissions: [PermissionsEnum.MANAGE_AGENDA],
    items: [
      {
        id: '7-1-registrar-agenda',
        label: 'Registrar Agenda',
        to: '/workAgenda',
        permissions: [PermissionsEnum.MANAGE_AGENDA],
        Icon: <Clock className={iconStyle} />,
      },
      {
        id: '7-2-editar-agenda',
        label: 'Editar Agenda',
        to: '/editWorkAgenda',
        permissions: [PermissionsEnum.MANAGE_AGENDA],
        Icon: <Clock className={iconStyle} />,
      },
      {
        id: '7-3-deshabilitar-agenda',
        label: 'Deshabilitar Agenda',
        to: '/disableAgenda',
        permissions: [PermissionsEnum.MANAGE_AGENDA],
        Icon: <Clock className={iconStyle} />,
      },
    ],
  },
  {
    id: '8-areas',
    category: 'CONFIGURACIÓN',
    label: 'Áreas',
    Icon: <Location className={iconStyle} />,
    permissions: [PermissionsEnum.MANAGE_AREAS],
    items: [
      {
        id: '8-1-registrar-area',
        label: 'Registrar Área',
        permissions: [PermissionsEnum.MANAGE_AREAS],
        Icon: <Location className={iconStyle} />,
      },
      {
        id: '8-2-editar-area',
        label: 'Editar Área',
        permissions: [PermissionsEnum.MANAGE_AREAS],
        Icon: <Location className={iconStyle} />,
      },
      {
        id: '8-3-deshabilitar-area',
        label: 'Deshabilitar Área',
        permissions: [PermissionsEnum.MANAGE_AREAS],
        Icon: <Location className={iconStyle} />,
      },
    ],
  },
  {
    id: '9-roles',
    category: 'CONFIGURACIÓN',
    label: 'Roles',
    Icon: <Rol className={iconStyle} />,
    permissions: [PermissionsEnum.MANAGE_ROLES],
    items: [
      {
        id: '9-1-registrar-rol',
        label: 'Registrar Rol',
        to: paths.registerrol,
        permissions: [PermissionsEnum.MANAGE_ROLES],
        Icon: <Rol className={iconStyle} />,
      },
      {
        id: '9-2-editar-rol',
        label: 'Editar Rol',
        to: paths.editrol,
        permissions: [PermissionsEnum.MANAGE_ROLES],
        Icon: <Rol className={iconStyle} />,
      },
      {
        id: '9-3-asignar-rol',
        label: 'Asignar Rol',
        to: paths.assignrol,
        permissions: [PermissionsEnum.MANAGE_ROLES],
        Icon: <Rol className={iconStyle} />,
      },
      {
        id: '9-4-eliminar-rol',
        label: 'Eliminar Rol',
        to: paths.deleterol,
        permissions: [PermissionsEnum.MANAGE_ROLES],
        Icon: <Rol className={iconStyle} />,
      },
    ],
  },
  {
    id: '10-lesiones',
    category: 'DIAGNÓSTICOS',
    label: 'Lesiones',
    Icon: <Injuries className={iconStyle} />,
    permissions: [PermissionsEnum.MANAGE_INJURIES],
    items: [
      {
        id: '10-1-registrar-lesion',
        label: 'Registrar Lesión',
        to: paths.registerinjury,
        permissions: [PermissionsEnum.MANAGE_INJURIES],
        Icon: <Injuries className={iconStyle} />,
      },
      {
        id: '10-2-editar-lesion',
        label: 'Editar Lesión',
        to: paths.editinjury,
        permissions: [PermissionsEnum.MANAGE_INJURIES],
        Icon: <Injuries className={iconStyle} />,
      },
      {
        id: '10-3-ver-lesion',
        label: 'Ver Lesión',
        to: paths.seeinjury,
        permissions: [PermissionsEnum.MANAGE_INJURIES],
        Icon: <Injuries className={iconStyle} />,
      },
      {
        id: '10-4-eliminar-lesion',
        label: 'Eliminar Lesión',
        to: paths.deleteinjury,
        permissions: [PermissionsEnum.MANAGE_INJURIES],
        Icon: <Injuries className={iconStyle} />,
      },
    ],
  },
  {
    id: '11-patologias',
    category: 'DIAGNÓSTICOS',
    label: 'Patologías',
    Icon: <Injuries className={iconStyle} />,
    permissions: [PermissionsEnum.MANAGE_PATHOLOGIES],
    items: [
      {
        id: '11-1-registrar-patologia',
        label: 'Registrar Patología',
        permissions: [PermissionsEnum.MANAGE_PATHOLOGIES],
        Icon: <Injuries className={iconStyle} />,
      },
      {
        id: '11-2-editar-patologia',
        label: 'Editar Patología',
        permissions: [PermissionsEnum.MANAGE_PATHOLOGIES],
        Icon: <Injuries className={iconStyle} />,
      },
      {
        id: '11-3-ver-patologia',
        label: 'Ver Patología',
        permissions: [PermissionsEnum.MANAGE_PATHOLOGIES],
        Icon: <Injuries className={iconStyle} />,
      },
      {
        id: '11-4-eliminar-patologia',
        label: 'Eliminar Patología',
        permissions: [PermissionsEnum.MANAGE_PATHOLOGIES],
        Icon: <Injuries className={iconStyle} />,
      },
    ],
  },
  {
    id: '12-sintomas',
    category: 'DIAGNÓSTICOS',
    label: 'Síntomas',
    Icon: <Injuries className={iconStyle} />,
    permissions: [PermissionsEnum.MANAGE_SYMPTOMS],
    items: [
      {
        id: '12-1-registrar-sintoma',
        label: 'Registrar Síntoma',
        permissions: [PermissionsEnum.MANAGE_SYMPTOMS],
        Icon: <Injuries className={iconStyle} />,
      },
      {
        id: '12-2-editar-sintoma',
        label: 'Editar Síntoma',
        permissions: [PermissionsEnum.MANAGE_SYMPTOMS],
        Icon: <Injuries className={iconStyle} />,
      },
      {
        id: '12-3-ver-sintoma',
        label: 'Ver Síntoma',
        permissions: [PermissionsEnum.MANAGE_SYMPTOMS],
        Icon: <Injuries className={iconStyle} />,
      },
      {
        id: '12-4-eliminar-sintoma',
        label: 'Eliminar Síntoma',
        permissions: [PermissionsEnum.MANAGE_SYMPTOMS],
        Icon: <Injuries className={iconStyle} />,
      },
    ],
  },
  {
    id: '13-enfermedades',
    category: 'DIAGNÓSTICOS',
    label: 'Enfermedades',
    Icon: <Injuries className={iconStyle} />,
    permissions: [PermissionsEnum.MANAGE_ILLNESSES],
    items: [
      {
        id: '13-1-registrar-enfermedad',
        label: 'Registrar Enfermedad',
        permissions: [PermissionsEnum.MANAGE_ILLNESSES],
        Icon: <Injuries className={iconStyle} />,
      },
      {
        id: '13-2-editar-enfermedad',
        label: 'Editar Enfermedad',
        permissions: [PermissionsEnum.MANAGE_ILLNESSES],
        Icon: <Injuries className={iconStyle} />,
      },
      {
        id: '13-3-ver-enfermedad',
        label: 'Ver Enfermedad',
        permissions: [PermissionsEnum.MANAGE_ILLNESSES],
        Icon: <Injuries className={iconStyle} />,
      },
      {
        id: '13-4-eliminar-enfermedad',
        label: 'Eliminar Enfermedad',
        permissions: [PermissionsEnum.MANAGE_ILLNESSES],
        Icon: <Injuries className={iconStyle} />,
      },
    ],
  },
  {
    id: '14-formularios',
    category: 'FORMULARIOS',
    label: 'Formularios',
    Icon: <Form className={iconStyle} />,
    permissions: [PermissionsEnum.MANAGE_FORMS],
    items: [
      {
        id: '14-1-crear-formulario',
        label: 'Crear Formulario',
        permissions: [PermissionsEnum.MANAGE_FORMS],
        Icon: <Form className={iconStyle} />,
      },
      {
        id: '14-2-deshabilitar-formularios',
        label: 'Deshabilitar Formularios',
        permissions: [PermissionsEnum.MANAGE_FORMS],
        Icon: <Form className={iconStyle} />,
      },
    ],
  },
  {
    id: '15-preguntas',
    category: 'FORMULARIOS',
    label: 'Preguntas',
    Icon: <Questions className={iconStyle} />,
    permissions: [PermissionsEnum.MANAGE_QUESTIONS],
    items: [
      {
        id: '15-1-crear-pregunta',
        label: 'Crear Pregunta',
        permissions: [PermissionsEnum.MANAGE_QUESTIONS],
        Icon: <Questions className={iconStyle} />,
      },
      {
        id: '15-2-eliminar-pregunta',
        label: 'Eliminar Pregunta',
        permissions: [PermissionsEnum.MANAGE_QUESTIONS],
        Icon: <Questions className={iconStyle} />,
      },
    ],
  },
  {
    id: '16-publicaciones',
    category: 'PUBLICACIONES',
    label: 'Publicaciones',
    Icon: <Publications className={iconStyle} />,
    permissions: [PermissionsEnum.MANAGE_ARTICLES],
    items: [
      {
        id: '16-1-crear-publicacion',
        label: 'Crear Publicación',
        to: paths.createpost,
        permissions: [PermissionsEnum.MANAGE_ARTICLES],
        Icon: <Publications className={iconStyle} />,
      },
      {
        id: '16-2-editar-publicacion',
        label: 'Editar Publicación',
        to: paths.editpost,
        permissions: [PermissionsEnum.MANAGE_ARTICLES],
        Icon: <Publications className={iconStyle} />,
      },
      {
        id: '16-3-eliminar-publicacion',
        label: 'Eliminar Publicación',
        to: paths.deletepost,
        permissions: [PermissionsEnum.MANAGE_ARTICLES],
        Icon: <Publications className={iconStyle} />,
      },
      {
        id: '16-4-deshabilitar-publicacion',
        label: 'Deshabilitar Publicación',
        to: paths.disablepost,
        permissions: [PermissionsEnum.MANAGE_ARTICLES],
        Icon: <Publications className={iconStyle} />,
      },
    ],
  },
  {
    id: '17-reclamos',
    category: 'ASISTENCIA',
    label: 'Reclamos',
    Icon: <Claims className={iconStyle} />,
    permissions: [PermissionsEnum.VIEW_COMPLAINT, PermissionsEnum.ATTEND_COMPLAINT],
    items: [
      {
        id: '17-1-ver-reclamo',
        label: 'Ver Reclamo',
        to: paths.seeclaims,
        permissions: [PermissionsEnum.VIEW_COMPLAINT],
        Icon: <Claims className={iconStyle} />,
      },
      {
        id: '17-2-atender-reclamo',
        label: 'Atender Reclamo',
        to: paths.attendclaims,
        permissions: [PermissionsEnum.ATTEND_COMPLAINT],
        Icon: <Claims className={iconStyle} />,
      },
    ],
  },
  {
    id: '18-sugerencias',
    category: 'ASISTENCIA',
    label: 'Sugerencias',
    Icon: <Suggestions className={iconStyle} />,
    permissions: [PermissionsEnum.VIEW_SUGGESTION, PermissionsEnum.ATTEND_SUGGESTION],
    items: [
      {
        id: '18-1-ver-sugerencia',
        label: 'Ver Sugerencia',
        to: paths.seesuggestions,
        permissions: [PermissionsEnum.VIEW_SUGGESTION],
        Icon: <Suggestions className={iconStyle} />,
      },
      {
        id: '18-2-atender-sugerencia',
        label: 'Atender Sugerencia',
        to: paths.attendsuggestions,
        permissions: [PermissionsEnum.ATTEND_SUGGESTION],
        Icon: <Suggestions className={iconStyle} />,
      },
    ],
  },
  {
    id: '19-mis-ajustes',
    category: 'MIS AJUSTES',
    label: 'Mi perfil',
    Icon: <User className={iconStyle} />,
    permissions: [],
    to: paths.editProfile,
  },
  {
    id: '20-configurar-centro-medico',
    category: 'MIS AJUSTES',
    label: 'Configurar Centro Médico',
    Icon: <Settings className='fill-current text-white mr-3 h-5 w-5' />,
    permissions: [PermissionsEnum.CONFIGURE_MEDICAL_CENTER, PermissionsEnum.CONFIGURE_PACKAGES],
    items: [
      {
        id: '20-1-info-centro-medico',
        label: 'Información Centro Médico',
        to: paths.medicalCenterUpdate,
        permissions: [PermissionsEnum.CONFIGURE_MEDICAL_CENTER],
        Icon: <Settings className='fill-current text-white mr-3 h-5 w-5' />,
      },
      {
        id: '20-2-paquetes-instalados',
        label: 'Paquetes Instalados',
        to: paths.packagesupdate,
        permissions: [PermissionsEnum.CONFIGURE_PACKAGES],
        Icon: <Settings className='fill-current text-white mr-3 h-5 w-5' />,
      },
    ],
  },
  {
    id: '21-cerrar-sesion',
    category: 'MIS AJUSTES',
    label: 'Cerrar Sesion',
    Icon: <ExitIcon className={iconStyle} />,
    permissions: [],
  },
];
