import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';

import Dashboard from '../../views/admin/Dashboard';
import AdminProductos from '../../views/admin/AdminProductos';
import AdminUsuarios from '../../views/admin/AdminUsuarios';
import AdminCategorias from '../../views/admin/AdminCategorias';
import AdminNuevoProducto from '../../views/admin/AdminNuevoProducto'; 
import AdminEditarProducto from '../../views/admin/AdminEditarProducto';

export const AdminLayout = () => {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <main className="flex-grow-1" style={{ height: '100vh', overflowY: 'auto' }}>
        
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Rutas de Productos */}
          <Route path="productos" element={<AdminProductos />} />
          
          <Route path="nuevo" element={<AdminNuevoProducto />} />
          
          <Route path="productos/editar/:nombreProducto" element={<AdminEditarProducto />} /> 
          
          {/* Otras rutas */}
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="categorias" element={<AdminCategorias />} />

          {/* Ruta por defecto */}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          
          {/* Catch-all: Si escriben cualquier otra cosa rara en admin, mandarlos al dashboard */}
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
};