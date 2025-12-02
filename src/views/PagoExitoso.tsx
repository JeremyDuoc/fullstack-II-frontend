import React, { useState, useEffect } from 'react'; // <-- 1. IMPORTAMOS useState y useEffect
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // <-- 2. IMPORTAMOS useAuth
import toast from 'react-hot-toast';

function Carrito() {
  const { items, subtotal, totalItems, clearCart } = useCart();
  const { user } = useAuth(); // Obtenemos el usuario logueado
  const navigate = useNavigate();

  // --- 3. ESTADO LOCAL PARA EL FORMULARIO DE CHECKOUT ---
  // (Basado en Figura 6)
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [calle, setCalle] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [region, setRegion] = useState('Región Metropolitana de Santiago');
  const [comuna, setComuna] = useState('Cerrillos');
  const [indicaciones, setIndicaciones] = useState('');

  useEffect(() => {
    if (user) {

      const nombreString = user.nombre || ''; 
      const nameParts = nombreString.split(' ');
      setNombre(nameParts[0] || '');
      setApellidos(nameParts.slice(1).join(' ') || '');
      setCorreo(user.email || '');
    }
  }, [user]); 

  const shipping = 2500;
  const total = subtotal + shipping;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenimos que el form recargue la página

    // Verificación 1: ¿Hay items?
    if (totalItems === 0) {
      toast.error('Tu carrito está vacío.');
      return;
    }
    
    // Verificación 2: ¿Está el usuario logueado?
    // (Ya lo comprobamos, pero es buena práctica)
    if (!user) {
      toast.error('Debes iniciar sesión para pagar.');
      navigate('/login');
      return;
    }
    
    // Verificación 3: ¿Formulario básico lleno?
    if (!nombre || !apellidos || !correo || !calle) {
      toast.error('Por favor, completa tu información de cliente y dirección.');
      return;
    }

    // --- 5. RECOPILAMOS LOS DATOS DEL FORMULARIO ---
    const checkoutData = {
      cliente: { nombre, apellidos, correo },
      entrega: { calle, departamento, region, comuna, indicaciones }
    };

    toast.loading('Procesando pago...');
    
    const isSuccess = Math.random() < 0.8;
    
    setTimeout(() => {
      toast.dismiss();
      
      if (isSuccess) {
        toast.success('¡Pago aprobado!');
        const orderId = `HH-${Math.floor(Math.random() * 10000)}`;
        
        // --- 6. ENVIAMOS LOS DATOS DEL PEDIDO Y DEL FORMULARIO ---
        navigate('/pago-exitoso', { 
          state: { 
            orderId: orderId,
            items: items, 
            total: total,
            checkoutData: checkoutData // <-- Pasamos los datos del formulario
          } 
        });
        
        clearCart();
        
      } else {
        toast.error('Pago rechazado por el banco.');
        navigate('/pago-fallido');
      }
    }, 2000);
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#f9f7f4' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 className="text-center mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: '#8e685a' }}>
          Finalizar Compra
        </h1>
        
        {/* Usamos un <form> que llame a handleCheckout */}
        <form onSubmit={handleCheckout}>
          <div className="row g-5">
            {/* --- COLUMNA IZQUIERDA: FORMULARIO (FIGURA 6) --- */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-lg p-4" style={{ borderRadius: '20px' }}>
                <div className="card-body">
                  
                  {/* Información del cliente [cite: 293] */}
                  <h4 style={{ fontFamily: "'Playfair Display', serif" }}>Información del cliente</h4>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                      <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="apellidos" className="form-label fw-bold">Apellidos</label>
                      <input type="text" className="form-control" id="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="correo" className="form-label fw-bold">Correo</label>
                      <input type="email" className="form-control" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Dirección de entrega [cite: 298] */}
                  <h4 style={{ fontFamily: "'Playfair Display', serif" }}>Dirección de entrega</h4>
                  <div className="row g-3">
                    <div className="col-12">
                      <label htmlFor="calle" className="form-label fw-bold">Calle</label>
                      <input type="text" className="form-control" id="calle" value={calle} onChange={(e) => setCalle(e.target.value)} required />
                    </div>
                    <div className="col-12">
                      <label htmlFor="departamento" className="form-label fw-bold">Departamento (opcional)</label>
                      <input type="text" className="form-control" id="departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="region" className="form-label fw-bold">Región</label>
                      <select className="form-select" id="region" value={region} onChange={(e) => setRegion(e.target.value)}>
                        <option>Región Metropolitana de Santiago</option>
                        {/* ... (otras regiones) ... */}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="comuna" className="form-label fw-bold">Comuna</label>
                      <select className="form-select" id="comuna" value={comuna} onChange={(e) => setComuna(e.target.value)}>
                        <option>Cerrillos</option>
                        {/* ... (otras comunas) ... */}
                      </select>
                    </div>
                    <div className="col-12">
                      <label htmlFor="indicaciones" className="form-label fw-bold">Indicaciones (opcional)</label>
                      <textarea className="form-control" id="indicaciones" rows={2} value={indicaciones} onChange={(e) => setIndicaciones(e.target.value)}></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- COLUMNA DERECHA: RESUMEN DEL CARRITO --- */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-lg p-4" style={{ borderRadius: '20px', position: 'sticky', top: '100px' }}>
                <div className="card-body">
                  <h4 style={{ fontFamily: "'Playfair Display', serif" }}>Resumen del Pedido</h4>
                  {items.length === 0 ? (
                    <p className="text-secondary">Tu carrito está vacío.</p>
                  ) : (
                    <>
                      {/* Lista de Items */}
                      <table className="table align-middle">
                        <tbody>
                          {items.map(item => (
                            <tr key={item.product.name}>
                              <td>
                                <img src={item.product.image} alt={item.product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                              </td>
                              <td className="small">{item.product.name} (x{item.quantity})</td>
                              <td className="text-end fw-bold small">${(item.product.price * item.quantity).toLocaleString('es-CL')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      <hr />
                      
                      {/* Totales */}
                      <div className="d-flex justify-content-between text-secondary">
                        <span>Subtotal:</span>
                        <span className="fw-bold">${subtotal.toLocaleString('es-CL')}</span>
                      </div>
                      <div className="d-flex justify-content-between text-secondary">
                        <span>Envío:</span>
                        <span className="fw-bold">${shipping.toLocaleString('es-CL')}</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between fs-4">
                        <span className="fw-bold" style={{ color: '#5c8b5e' }}>Total:</span>
                        <span className="fw-bold" style={{ color: '#5c8b5e' }}>${total.toLocaleString('es-CL')}</span>
                      </div>
                    </>
                  )}
                  
                  {/* Botón de Pagar (ahora es tipo 'submit' para el form) */}
                  <button type="submit" className="btn btn-primary w-100 btn-lg mt-4" style={{ borderRadius: '50px', fontWeight: 700 }}>
                    Pagar Ahora ${total.toLocaleString('es-CL')}
                  </button>
                  <Link to="/productos" className="btn btn-outline-secondary w-100 mt-2" style={{ borderRadius: '50px' }}>
                    Seguir Comprando
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </section>
  );
}

export default Carrito;