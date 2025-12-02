import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBox, faUsers } from '@fortawesome/free-solid-svg-icons';


const StatCard = ({ title, value, icon, color }: any) => (
  <div className="col-md-4">
    <div className={`card text-white bg-${color} mb-3 shadow`}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">{title}</h5>
          <h3 className="card-text">{value}</h3>
        </div>
        <FontAwesomeIcon icon={icon} size="3x" style={{ opacity: 0.5 }} />
      </div>
    </div>
  </div>
);

function Dashboard() {
  return (
    <div className="container-fluid p-4">
      <h1 className="h2 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Dashboard</h1>
      <p className="text-secondary mb-4">Resumen de las actividades de la tienda.</p>

      {/* Fila de Tarjetas de Estadísticas (como en Figura 9) */}
      <div className="row">
        <StatCard title="Compras" value="1,234" icon={faShoppingCart} color="primary" />
        <StatCard title="Productos" value="400" icon={faBox} color="success" />
        <StatCard title="Usuarios" value="890" icon={faUsers} color="warning" />
      </div>

      <hr className="my-4" />

      
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Actividad Reciente</h5>
            </div>
            <div className="card-body">
              <p className="text-secondary">Próximamente: Gráfico de ventas...</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;