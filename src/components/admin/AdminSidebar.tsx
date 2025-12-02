import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBoxOpen, faTags, faUsers, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext'; 

export const AdminSidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px', height: '100vh' }}>
      <a href="/admin" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
        <span className="fs-4">Admin HuertoHogar</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
    
          <NavLink to="/admin/dashboard" className="nav-link text-white">
            <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/productos" className="nav-link text-white">
            <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categorias" className="nav-link text-white">
            <FontAwesomeIcon icon={faTags} className="me-2" />
            Categorías
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/usuarios" className="nav-link text-white">
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            Usuarios
          </NavLink>
        </li>
      </ul>
      <hr />

      <div className="dropdown">
        <button onClick={logout} className="btn btn-outline-danger w-100">
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};