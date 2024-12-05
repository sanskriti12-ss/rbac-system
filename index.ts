import React from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface RBACProps {
  children: React.ReactNode;
  allowedRoles: string[];
}
