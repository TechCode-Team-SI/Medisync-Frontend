export const FILE_NAMES = {
  SETTINGS: 'settings.json',
  SYSTEM: 'sys.json',
  URL_WS: 'wss://chengkev.online',
};

export enum PermissionsEnum {
  CREATE_USER = 'create-user',
  EDIT_USER = 'edit-user',
  SOFT_DELETE_USER = 'soft-delete-user',
  USE_MOBILE = 'use-mobile',
  ACCESS_DESKTOP = 'access-desktop',
  CREATE_ROLE = 'create-role',
  UPDATE_ROLE = 'update-role',
  DELETE_ROLE = 'delete-role',
  CONFIGURE_MEDICAL_CENTER = 'configure-medical-center',
  CONFIGURE_PACKAGES = 'configure-packages',
  VIEW_SUGGESTION = 'view-suggestion',
  VIEW_COMPLAINT = 'view-complaint',
  ATTEND_SUGGESTION = 'attend-suggestion',
  ATTEND_COMPLAINT = 'attend-complaint',
  MANAGE_ARTICLES = 'manage-articles',
  MANAGE_QUESTIONS = 'manage-questions',
  MANAGE_FORMS = 'manage-forms',
  SET_FORM_FOR_SPECIALTY = 'set-form-for-specialty',
  MANAGE_SPECIALTIES = 'manage-specialties',
  MANAGE_STATISTICS = 'view-statistics',
  MANAGE_ILLNESSES = 'manage-illnesses',
  MANAGE_TREATMENTS = 'manage-treatments',
  MANAGE_INJURIES = 'manage-injuries',
  MANAGE_PATHOLOGIES = 'manage-pathologies',
  MANAGE_SYMPTOMS = 'manage-symptoms',
  MANAGE_ROLES = 'manage-roles',
  MANAGE_AREAS = 'manage-areas',
  MANAGE_AGENDA = 'manage-agenda',
  MANAGE_SCHEDULE = 'manage-schedule',
  VIEW_ALL_USERS = 'view-users',
  ASSIGN_AGENDA = 'assign-agenda',
  MANAGE_EMPLOYEES = 'manage-employees',
  VIEW_ALL_REQUESTS = 'view-all-requests',
}

export enum FieldQuestionTypeEnum {
  SELECTION = 'selection',
  TEXT = 'text',
  NUMBER = 'number',
}

export enum RequestStatusEnum {
  PENDING = 'pending',
  ATTENDING = 'attending',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum GenderEnum {
  MALE = 'M',
  FEMALE = 'F',
}

export const DEBOUNCE_DELAY = 400;
