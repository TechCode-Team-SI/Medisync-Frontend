export interface getLista<T> {
  data: T[];
  prevPage?: string | null;
  nextPage?: string | null;
  currentPage: number;
  totalPages: number;
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
  schedule?: { idSchedule: string };
  rooms?: { idRooms: string };
  employeeProfile?: EmployeeProfile;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  phone: string;
  image: Image;
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
  specialties?: [{ idspecialties: string }];
}

export interface Role {
  slug: string;
  id: string;
  name: string;
  permissions: Permission[];
  isMutable: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface Schedules {
  id: string;
  name: string;
  from: string;
  to: string;
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
  image: Image;
  createdAt: string;
  updatedAt: string;
}
export interface Area {
  id: string;
  name: string;
  address: string;
  specialty: Specialty;
  employeeProfile: EmployeeProfile;
}

export interface Image {
  id: string;
  path: string;
}

export interface Articles {
  id: string;
  title: string;
  description: string;
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

export interface Injury {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Symptoms {
  id: string;
  name: string;
  description: string;
}

export interface Pathology {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Claim {
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
