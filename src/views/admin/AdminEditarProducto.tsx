import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../types/types'; 

function AdminEditarProducto() {
  const navigate = useNavigate();
  const { nombreProducto } = useParams<{ nombreProducto: string }>(); 
  
  // Estado
  const [id, setId] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [categoria, setCategoria] = useState('Frutas');
  const [imagenUrl, setImagenUrl] = useState('');

  const categorias = ['Frutas', 'Verduras', 'Herramientas', 'Semillas'];

  // 1. Cargar datos
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/productos');
        if (response.ok) {
          const productos: Product[] = await response.json();
          const prod = productos.find(p => p.name === decodeURIComponent(nombreProducto || ''));

          if (prod) {
            setId(prod.id || 0); 
            setNombre(prod.name);
            setDescripcion(prod.description);
            setPrecio(prod.price);
            setCategoria(prod.category);
            setImagenUrl(prod.image);
          } else {
            toast.error('Producto no encontrado');
            navigate('/admin/productos');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducto();
  }, [nombreProducto, navigate]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
        toast.error("Error: No se encontró el ID del producto.");
        return;
    }

    try {
        const token = localStorage.getItem('token'); 

        const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: nombre,
                description: descripcion,
                price: precio,
                category: categoria,
                image: imagenUrl
            })
        });

        if (response.ok) {
            toast.success(`¡Producto actualizado!`);
            navigate('/admin/productos');
        } else {
            toast.error('Error al actualizar.');
        }

    } catch (error) {
        console.error(error);
        toast.error('Error de conexión');
    }
  };

  return (
    <div className="container-fluid p-4">
      <h1 className="h2 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
        Editar Producto
      </h1>

      <div className="card shadow-sm" style={{ borderRadius: '20px' }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Nombre del Producto</label>
              <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Descripción</label>
              <textarea className="form-control" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Precio</label>
                <input type="number" className="form-control" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Categoría</label>
                <select className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">URL Imagen</label>
              <input type="text" className="form-control" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} />
            </div>

            <hr className="my-4" />
            <div className="text-end">
              <Link to="/admin/productos" className="btn btn-outline-secondary me-2">
                <FontAwesomeIcon icon={faTimes} className="me-2" /> Cancelar
              </Link>
              <button type="submit" className="btn btn-primary">
                <FontAwesomeIcon icon={faSave} className="me-2" /> Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminEditarProducto;