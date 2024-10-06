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
