import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast'; 

// Definimos el tipo aquí para evitar el error de "implicitly has an any type"
type User = {
  id: number;
  nombre: string;
  email: string; // Cambiado de 'correo' a 'email' para coincidir con tu backend
  role: string;
};

function AdminUsuarios() {
  // 1. CORRECCIÓN: Quitamos useAuth() y usamos un estado local
  // Por ahora lo dejamos vacío. Más adelante podrías hacer un fetch('/api/usuarios')
  const [users] = useState<User[]>([]); 

  const handleEdit = (userName: string) => {
    toast(`Próximamente: Editar ${userName}`);
  };

  const handleDelete = (userName: string) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${userName}?`)) {
      toast.success(`Usuario ${userName} eliminado`);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold">Gestión de Usuarios</h2>
        <button className="btn btn-success" style={{ borderRadius: '50px' }}>
          <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Nuevo Usuario
        </button>
      </div>

      <div className="card border-0 shadow-sm" style={{ borderRadius: '20px' }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th className="text-end pe-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-muted">
                      No hay usuarios cargados (Falta endpoint en Backend)
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="ps-4 fw-bold">{user.nombre}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === 'ADMIN' ? 'bg-danger' : 'bg-info'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(user.nombre)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(user.nombre)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsuarios;