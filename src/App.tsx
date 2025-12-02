import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { useAuth } from './context/AuthContext';
import toast from 'react-hot-toast';


const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { user } = useAuth();

  // 1. Si no hay usuario, mandamos al login
  if (!user) {
    toast.error('Debes iniciar sesión para ver esta página.');
    return <Navigate to="/login" replace />;
  }

  // Debug: Muestra en la consola (F12) qué rol tiene el usuario
  console.log("Rol del usuario actual:", user.role);

  // 2. Verificamos el rol ignorando mayúsculas/minúsculas
  // Convertimos lo que venga a mayúsculas y comparamos con "ADMIN"
  if (user.role?.toUpperCase() !== 'ADMIN') {
    toast.error('No tienes permiso para acceder a esta sección.');
    return <Navigate to="/perfil" replace />;
  }

  return children;
};


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route 
          path="/admin/*" 
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          } 
        />
        

        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;