import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Product } from '../../types/types'; 


function AdminProductos() {
  
  const [productos, setProductos] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error("Error cargando productos:", err));
  }, []);
  
  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const token = localStorage.getItem('token'); 
      const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      if (response.ok) {
        setProductos(productos.filter(p => p.id !== id));
        alert('Producto eliminado');
      } else {
        alert('Error al eliminar');
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión');
    }
  };

  
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success fw-bold">Gestión de Productos</h2>
        <Link to="/admin/nuevo" className="btn btn-success" style={{ borderRadius: '50px' }}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Nuevo Producto
        </Link>
      </div>

      <div className="card border-0 shadow-sm" style={{ borderRadius: '20px' }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th className="text-end pe-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id || producto.name}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <img 
                          src={producto.image} 
                          alt={producto.name} 
                          className="rounded-3 me-3"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                        <div>
                          <h6 className="mb-0 fw-bold">{producto.name}</h6>
                          <small className="text-muted d-block text-truncate" style={{ maxWidth: '200px' }}>
                            {producto.description}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge bg-light text-dark border">{producto.category}</span></td>
                    <td className="fw-bold text-success">${producto.price.toLocaleString('es-CL')}</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-sm btn-outline-primary me-2">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  
}

export default AdminProductos;