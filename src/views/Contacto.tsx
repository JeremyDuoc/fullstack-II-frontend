import React from 'react';

function Contacto() {
  return (
    <>
      {/* --- HERO --- */}
      <section className="py-5 text-center" style={{ background: 'linear-gradient(135deg, #f9f7f4 50%, #e8f0e8 100%)' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.5rem', color: '#8e685a' }}>
          Contáctanos
        </h1>
        <p className="lead text-secondary">¿Tienes preguntas? Estamos aquí para ayudarte.</p>
      </section>

      {/* --- FORMULARIO --- */}
      <section className="py-5">
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="card border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: '20px' }}>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                  <input type="text" className="form-control form-control-lg" id="nombre" placeholder="Tu nombre completo" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label fw-bold">Correo electrónico</label>
                  <input type="email" className="form-control form-control-lg" id="correo" placeholder="correo@ejemplo.com" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label fw-bold">Mensaje</label>
                  <textarea className="form-control form-control-lg" id="mensaje" rows={4} placeholder="Escribe tu mensaje aquí..." required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100 btn-lg mt-3" style={{ borderRadius: '50px', fontWeight: 700 }}>
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contacto;