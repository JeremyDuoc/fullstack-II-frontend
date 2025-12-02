import React from 'react';

function Perfil() {
  // Datos de ejemplo (luego vendrán del estado)
  const user = {
    nombre: 'Ana M.',
    correo: 'ana.m@ejemplo.com',
    direccion: 'Av. Principal 123, Santiago',
    telefono: '+56 9 1234 5678',
    fechaRegistro: new Date().toISOString()
  };

  return (
    <section className="py-5" style={{ backgroundColor: '#f9f7f4' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="card border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: '20px' }}>
          <div className="card-body">
            <h2 className="text-center mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: '#8e685a' }}>
              Mi Perfil
            </h2>
            <p className="text-center text-secondary fst-italic mb-4">
              ¡Bienvenido/a de vuelta, {user.nombre}!
            </p>

            <form>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label fw-bold">Nombre Completo</label>
                <input type="text" className="form-control form-control-lg" id="nombre" defaultValue={user.nombre} required />
              </div>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label fw-bold">Correo Electrónico</label>
                <input type="email" className="form-control form-control-lg" id="correo" defaultValue={user.correo} readOnly disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="direccion" className="form-label fw-bold">Dirección</label>
                <input type="text" className="form-control form-control-lg" id="direccion" defaultValue={user.direccion} placeholder="Ej: Av. Principal 123, Santiago" />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label fw-bold">Teléfono</label>
                <input type="tel" className="form-control form-control-lg" id="telefono" defaultValue={user.telefono} placeholder="Ej: +56 9 1234 5678" />
              </div>
              
              <button className="btn btn-primary w-100 btn-lg mt-3" type="submit" style={{ borderRadius: '50px', fontWeight: 700 }}>
                Actualizar Perfil
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Perfil;