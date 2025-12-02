import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';


type HeaderProps = {
  onCartClick: () => void;
};


const Header: React.FC<HeaderProps> = ({ onCartClick }) => {

  const { user, logout } = useAuth();
  const { totalItems } = useCart();


  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
      <div className="container">
        
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <FontAwesomeIcon icon={faSeedling} className="me-2" style={{ color: '#8e685a' }} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#5c8b5e' }}>
            HuertoHogar
          </span>
        </Link>

        {/* Botón Responsivo */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links de Navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/productos" className="nav-link">Productos</NavLink>
            </li>
    
            <li className="nav-item">
              <NavLink to="/contacto" className="nav-link">Contacto</NavLink>
            </li>

            {/* Lógica de Autenticación Visual */}
            {user ? (
              // Si HAY usuario
              <>
                <li className="nav-item">
                  <NavLink to="/perfil" className="nav-link">
                    Hola, {user.nombre}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a href="#" onClick={handleLogout} className="nav-link">Cerrar Sesión</a>
                </li>
              </>
            ) : (
              // Si NO hay usuario
              <>
                <li className="nav-item">
                  <NavLink to="/perfil" className="nav-link">Mi Perfil</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">Login</NavLink>
                </li>
              </>
            )}
            
            {/* Botón del Carrito */}
            <li className="nav-item ms-3">
              <button 
                className="btn btn-success position-relative"
                onClick={onCartClick} 
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                  <span className="visually-hidden">items in cart</span>
                </span>
              </button>
            </li>

          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;