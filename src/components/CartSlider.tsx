import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinus, faPlus, faTrashAlt, faCreditCard } from '@fortawesome/free-solid-svg-icons';

import { useCart } from '../context/CartContext';


type CartSliderProps = {
  isOpen: boolean;
  onClose: () => void; 
};

export const CartSlider: React.FC<CartSliderProps> = ({ isOpen, onClose }) => {
  
  const { items, subtotal, totalItems, updateQuantity, removeFromCart } = useCart();
  const shipping = 2500;

  return (
    <>
      <div 
        className={`offcanvas-backdrop fade ${isOpen ? 'show' : ''}`}
        style={{ display: isOpen ? 'block' : 'none', zIndex: 1040 }}
        onClick={onClose} 
      ></div>


      <div 
        className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`}
        tabIndex={-1} 
        style={{ zIndex: 1045 }} 
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" style={{ fontFamily: "'Playfair Display', serif" }}>
            Mi Carrito ({totalItems})
          </h5>
          <button type="button" className="btn-close text-reset" onClick={onClose}></button>
        </div>
        <div className="offcanvas-body">

    
          {items.length === 0 ? (
            <div className="text-center text-secondary my-5">
              <p>Tu carrito está vacío.</p>
              <Link to="/productos" className="btn btn-outline-primary" onClick={onClose}>
                Ver productos
              </Link>
            </div>
          ) : (
            <div className="list-group list-group-flush">
              {items.map(item => (
                <div key={item.product.name} className="list-group-item py-3">
                  <div className="d-flex w-100">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-1">{item.product.name}</h6>
                      <small className="text-secondary">${item.product.price.toLocaleString('es-CL')} c/u</small>
            
                      <div className="d-flex align-items-center mt-2">
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.product.name, item.quantity - 1)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="mx-2 fw-bold">{item.quantity}</span>
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.product.name, item.quantity + 1)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </div>
                  
                    <div className="text-end">
                      <span className="fw-bold">${(item.product.price * item.quantity).toLocaleString('es-CL')}</span>
                      <button 
                        className="btn btn-sm btn-outline-danger mt-2"
                        onClick={() => removeFromCart(item.product.name)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      
        {items.length > 0 && (
          <div className="offcanvas-footer border-top p-3">
            <div className="d-flex justify-content-between text-secondary">
              <span>Subtotal:</span>
              <span className="fw-bold">${subtotal.toLocaleString('es-CL')}</span>
            </div>
            <div className="d-flex justify-content-between text-secondary">
              <span>Envío:</span>
              <span className="fw-bold">${shipping.toLocaleString('es-CL')}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5" style={{ color: '#5c8b5e' }}>
              <span>Total:</span>
              <span>${(subtotal + shipping).toLocaleString('es-CL')}</span>
            </div>
            
            <Link 
              to="/carrito" 
              className="btn btn-primary w-100 mt-3 fw-bold"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faCreditCard} className="me-2" />
              Proceder al Pago
            </Link>
          </div>
        )}
      </div>
    </>
  );
};  