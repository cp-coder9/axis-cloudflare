import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export type UserRole = 'admin' | 'freelancer' | 'client';
interface AuthContextType {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole | null>(() => {
    return localStorage.getItem('userRole') as UserRole | null;
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (role) {
      localStorage.setItem('userRole', role);
    } else {
      localStorage.removeItem('userRole');
    }
  }, [role]);

  const setRole = React.useCallback((newRole: UserRole | null) => {
    if (newRole !== role) {
      setRoleState(newRole);
      if (newRole) {
        navigate(`/${newRole}/dashboard`);
      } else {
        navigate('/');
      }
    }
  }, [role, navigate]);

  const value = useMemo(() => ({ role, setRole }), [role, setRole]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}