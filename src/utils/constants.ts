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
  MANAGE_STATISTICS = 'manage-statistics',
  VIEW_STATISTICS = 'view-statistics',
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
  CREATE_PRIVATE_REQUEST = 'create-private-request',
}

export enum ChartTypeEnum {
  PIE = 'pie',
  BAR = 'bar',
}

export enum FieldQuestionTypeEnum {
  SELECTION = 'selection',
  TEXT = 'text',
  NUMBER = 'number',
}

export enum NotificationTypeEnum {
  WORK = 'WORK',
  PATIENT = 'PATIENT',
}

export enum FilteredByType {
  NONE = 'none',
  SPECIALTY = 'specialty',
}

export enum RequestStatusEnum {
  PENDING = 'pending',
  ATTENDING = 'attending',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum StatisticsTimeEnum {
  ALL_TIME = 'ALL_TIME',
  THIS_YEAR = 'THIS_YEAR',
  THIS_MONTH = 'THIS_MONTH',
  TODAY = 'TODAY',
}

export enum ElementDiagnosis {
  injury = 'injury',
  symptom = 'symptom',
  treatment = 'treatment',
  pathology = 'pathology',
}

export enum DemographicFilter {
  SEX = 'genders',
  AGE = 'ages',
  DETAILED = 'detailed',
}

export enum GenderEnum {
  MALE = 'M',
  FEMALE = 'F',
}

export enum StatisticsTimeUnitEnum {
  YEAR = 'YEAR',
  MONTH = 'MONTH',
  DAY = 'DAY',
  HOUR = 'HOUR',
}

export interface ChartConfigItem {
  label: string;
  color: string;
}

export type ChartConfig = Record<string, ChartConfigItem>;
export const genderLabel = {
  [GenderEnum.MALE]: 'Masculino',
  [GenderEnum.FEMALE]: 'Femenino',
};

export const DEBOUNCE_DELAY = 400;
