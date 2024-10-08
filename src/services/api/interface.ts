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
  roles: Role[];
  employeeProfile?: EmployeeProfile;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  phone: string;
}

export interface EmployeeProfile {
  MPPS: null;
  CML: null;
  gender: string;
  id: string;
  address: string;
  birthday: Date;
  dni: string;
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

export interface Permission {
  id: string;
  name: string;
  slug: string;
  description: string;
}
