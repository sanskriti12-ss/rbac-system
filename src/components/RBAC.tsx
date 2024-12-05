import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RBACProps } from '../types';

export const RBAC: React.FC<RBACProps> = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const hasPermission = allowedRoles.includes(user.role.name);

  if (!hasPermission) {
    return null;
  }

  return <>{children}</>;
};

export const withRBAC = (WrappedComponent: React.ComponentType, allowedRoles: string[]) => {
  return (props: any) => (
    <RBAC allowedRoles={allowedRoles}>
      <WrappedComponent {...props} />
    </RBAC>
  );
};
