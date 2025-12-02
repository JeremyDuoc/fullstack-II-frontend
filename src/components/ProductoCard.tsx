import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { Product } from '../types/types';


type ProductoCardProps = {
  producto: Product;
};


export const ProductoCard: React.FC<ProductoCardProps> = ({ producto }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(producto);
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '20px' }}>
        <img src={producto.image} className="card-img-top" alt={producto.name} style={{ height: '250px', objectFit: 'cover', borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }} />
        <div className="card-body d-flex flex-column">
          <h3 className="card-title" style={{ fontFamily: "'Playfair Display', serif", color: '#5c8b5e' }}>{producto.name}</h3>
          <p className="card-text text-secondary flex-grow-1">{producto.description}</p>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold fs-4" style={{ color: '#8e685a' }}>${producto.price.toLocaleString('es-CL')}</span>
            <span className="badge bg-success">En Stock</span>
          </div>
          <button 
            className="btn btn-primary w-100" 
            style={{ borderRadius: '50px', fontWeight: 700 }}
            onClick={handleAddToCart}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};