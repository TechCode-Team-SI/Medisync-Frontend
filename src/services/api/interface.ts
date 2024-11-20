import { FieldQuestionTypeEnum, GenderEnum, RequestStatusEnum } from 'src/utils/constants';

export interface getLista<T> {
  data: T[];
  prevPage?: string | null;
  nextPage?: string | null;
  currentPage: number;
  totalPages: number;
}

export interface WithPagination {
  page?: string;
  limit?: string;
}

export interface WithSearch {
  search?: string;
}

export interface Session {
  refreshToken: string;
  token: string;
  tokenExpires: number;
  user: User;
}
export interface UserAdmin {
  id: number;
  step: number;
  user: Session;
}
export interface Installation {
  id: number;
  step: number;
}

export interface MedicalCenter {
  instagramName: string;
  twitterName: string;
  facebookName: string;
  tiktokName: string;
  email: string;
  id: number;
  name: string;
  address: string;
  state: string;
  municipality: string;
  parish: string;
  localPhone: string;
  mobilePhone: string;
  mission: string;
  vision: string;
}

export interface Packages {
  id: string;
  name: string;
  slug: string;
  description: string;
  applied: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface User {
  id: string;
  email: string;
  fullName: string;
  roles?: Role[];
  employeeProfile?: EmployeeProfile;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  phone: string;
  photo: Image;
}

export interface EmployeeProfile {
  MPPS: string;
  CML: string;
  gender: string;
  id: string;
  address: string;
  birthday: Date;
  dni: string;
  status: boolean;
  specialties?: Specialty[];
  room?: Area;
  agenda?: Agenda;
  isMedic: boolean;
}

export interface Role {
  slug: string;
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isMutable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Specialty {
  id: string;
  name: string;
  description: string;
  isGroup: boolean;
  isPublic: boolean;
  isDisabled: boolean;
  requestTemplate?: RequestTemplate;
  image: Image;
  createdAt: string;
  updatedAt: string;
  agenda?: Agenda;
}
export interface Area {
  id: string;
  name: string;
  address: string;
  specialty?: Specialty;
  isDisabled: boolean;
}

export interface FileImage {
  file: Image;
}

export interface Image {
  id: string;
  path: string;
}

export interface Articles {
  id: string;
  title: string;
  description: string;
  photo: Image;
  categories?: ArticleCategory[];
  updatedBy: UpdatedBy;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdatedBy {
  phone: null;
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}

export interface GlossaryType {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Injury = GlossaryType;
export type Symptoms = GlossaryType;
export type Pathology = GlossaryType;
export type Disease = GlossaryType;
export type Treatment = GlossaryType;

export interface ArticleCategory {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Claim {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  comment: string;
  createdBy?: User;
  closedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  comments: string;
  createdBy?: User;
  closedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FieldQuestion {
  id: string;
  name: string;
  label: string;
  slug: string;
  description?: string;
  type: FieldQuestionTypeEnum;
  selectionConfig: SelectionConfig;
  selections: Selection[];
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SelectionConfig {
  id: string;
  isMultiple: boolean;
}

export interface Selection {
  id: string;
  value: string;
  isSelected: boolean;
}

export interface Agenda {
  id: string;
  name: string;
  weekdays: string[];
  daysOffs: daysOffs[];
  from: string;
  to: string;
  slotTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface RequestTemplate {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface daysOffs {
  from: string;
  to: string;
}

export interface UserPatient {
  id: string;
  fullName: string;
  dni: string;
  gender: GenderEnum;
  birthday: Date;
  address: null;
  familyRelationship: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Requests {
  id: string;
  patientFullName: string;
  patientDNI: string;
  patientAddress: string;
  patient: UserPatient;
  appointmentHour: string;
  status: RequestStatusEnum;
  appointmentDate: Date;
  referredContent: null;
  createdAt: Date;
  requestedMedic: User;
  requestedSpecialty: Specialty;
  madeFor: UserPatient;
  fields: Field[];
}

export interface Field {
  id: string;
  order: number;
  label: string;
  description: null | string;
  type: FieldQuestionTypeEnum;
  isRequired: boolean;
  selectionConfig?: SelectionConfig;
  selections?: Selection[];
  value?: string;
}
