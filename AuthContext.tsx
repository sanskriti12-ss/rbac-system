import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - In a real application, this would come from your backend
const mockUsers = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: {
      id: '1',
      name: 'admin',
      permissions: [
        { id: '1', name: 'create_user', description: 'Can create users' },
        { id: '2', name: 'edit_user', description: 'Can edit users' },
        { id: '3', name: 'delete_user', description: 'Can delete users' },
      ],
    },
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    role: {
      id: '2',
      name: 'user',
      permissions: [
        { id: '1', name: 'view_profile', description: 'Can view profile' },
      ],
    },
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock authentication - In a real app, this would be an API call
    const foundUser = mockUsers.find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
