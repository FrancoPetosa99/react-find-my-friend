import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedComponentProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({ 
  children, 
  requireAuth = true,
}) => {
  const { isAuthenticated } = useAuth();

  if (requireAuth && isAuthenticated) {
    return <>{children}</>;
  }

  if (!requireAuth && !isAuthenticated) {
    return <>{children}</>;
  }
};

export default ProtectedComponent; 