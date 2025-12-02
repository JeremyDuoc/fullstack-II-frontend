import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { register } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    
    const exito = await register(nombre, email, password);

    if (exito) {
      alert("¡Cuenta creada con éxito! Ahora inicia sesión.");
      navigate('/login'); 
    } else {
      setError("Error al registrar. Puede que el correo ya exista.");
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '20px' }}>
        <h2 className="text-center text-success mb-4">Crear Cuenta</h2>
        
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input 
              type="text" 
              className="form-control" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-pill">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}