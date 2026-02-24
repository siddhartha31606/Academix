import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AppSidebar from '@/components/layout/AppSidebar';

const AppLayout = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
