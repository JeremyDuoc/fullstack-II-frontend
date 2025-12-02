import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { useAuth } from '../context/AuthContext';

import toast from 'react-hot-toast';

function Login() {
  
  const { login } = useAuth();
  const navigate = useNavigate(); 

  
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!correo || !password) {
      toast.error('Por favor, completa todos los campos.');
      return; 
    }
    try {
     
      const loginExitoso = await login(correo, password);

      if (loginExitoso) {

        navigate('/perfil');
      } else {
       
        toast.error('Correo o contraseña incorrectos.');
      }
    } catch (err) {
      toast.error('Ocurrió un error inesperado. Inténtalo de nuevo.');
    }
  };

  return (
    <>
      {/* --- HERO --- */}
      <section className="py-5 text-center" style={{ background: 'linear-gradient(135deg, #f9f7f4 50%, #e8f0e8 100%)' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.5rem', color: '#8e685a' }}>
          Iniciar Sesión
        </h1>
        <p className="lead text-secondary">Accede a tu cuenta para gestionar tu perfil y pedidos.</p>
      </section>

      {/* --- FORMULARIO --- */}
      <section className="py-5">
        <div className="container" style={{ maxWidth: '500px' }}>
          <div className="card border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: '20px' }}>
            <div className="card-body">
              
             
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label fw-bold">Correo electrónico</label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    id="correo" 
                    placeholder="correo@ejemplo.com" 
                    required 
                    value={correo} // Conectado al estado
                    onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-bold">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control form-control-lg" 
                    id="password" 
                    placeholder="Tu contraseña" 
                    required 
                    value={password} // Conectado al estado
                    onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 btn-lg mt-3" style={{ borderRadius: '50px', fontWeight: 700 }}>
                  Iniciar Sesión
                </button>
                
                <hr className="my-4" />
                
                <p className="text-center text-secondary">
                  ¿No tienes una cuenta? 
                  <Link to="/registro" className="fw-bold ms-1" style={{ color: '#5c8b5e', textDecoration: 'none' }}>
                    Regístrate aquí
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;