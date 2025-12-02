import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function PagoFallido() {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/carrito');
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#f9f7f4' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="card border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: '20px' }}>
          <div className="card-body text-center">
            
            <FontAwesomeIcon icon={faTimesCircle} size="4x" className="mb-3 text-danger" />
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#8e685a' }}>Error en el Pago</h1>
            <p className="lead text-secondary">No se pudo procesar tu pago.</p>
            <p>Por favor, revisa tus datos e inténtalo de nuevo.</p>
            
            <hr className="my-4" />
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <Link to="/productos" className="btn btn-outline-secondary" style={{ borderRadius: '50px', fontWeight: 700 }}>
                Volver a la tienda
              </Link>
              <button onClick={handleRetry} className="btn btn-primary" style={{ borderRadius: '50px', fontWeight: 700 }}>
                Reintentar Pago
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default PagoFallido;