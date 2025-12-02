import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext'; // Importamos para usar el Token
import { Product } from '../../types/types'; // Importamos el tipo de dato

function AdminEditarProducto() {
  const navigate = useNavigate();
  const { nombreProducto } = useParams<{ nombreProducto: string }>(); // Leemos el nombre de la URL
  const { token } = useAuth(); // Necesitamos el token para tener permiso de editar

  // Estados del formulario
  const [id, setId] = useState<number | null>(null); // Guardamos el ID real (necesario para el PUT)
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [categoria, setCategoria] = useState('Frutas');
  const [imagenUrl, setImagenUrl] = useState('');
  
  // Categorías disponibles (puedes agregar más)
  const categorias = ['Frutas', 'Verduras', 'Herramientas', 'Semillas'];

  // 1. EFECTO: Cargar los datos del producto al entrar a la página
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        // Pedimos todos los productos para buscar el que coincida con el nombre de la URL
        // (Idealmente el backend tendría un endpoint GET /api/productos/nombre/{nombre}, pero esto sirve)
        const response = await fetch('http://localhost:8080/api/productos');
        if (response.ok) {
          const productos: Product[] = await response.json();
          // Buscamos el producto específico
          // Decodificamos el nombre por si viene con %20 (espacios)
          const productoEncontrado = productos.find(p => p.name === decodeURIComponent(nombreProducto || ''));

          if (productoEncontrado) {
            setId(productoEncontrado.id || 0); // Guardamos el ID vital para editar
            setNombre(productoEncontrado.name);
            setDescripcion(productoEncontrado.description);
            setPrecio(productoEncontrado.price);
            setCategoria(productoEncontrado.category);
            setImagenUrl(productoEncontrado.image);
          } else {
            toast.error('Producto no encontrado en la base de datos');
            navigate('/admin/productos');
          }
        } else {
          toast.error('Error al conectar con el servidor');
        }
      } catch (error) {
        console.error(error);
        toast.error('Error cargando el producto');
      }
    };

    fetchProducto();
  }, [nombreProducto, navigate]);


  // 2. FUNCIÓN GUARDAR: Envía la petición PUT al Backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
        toast.error("Error: No se identificó el ID del producto");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
            method: 'PUT', // Usamos PUT para actualizar
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Autenticación JWT
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
            toast.success(`¡Producto "${nombre}" actualizado correctamente!`);
            navigate('/admin/productos');
        } else {
            toast.error('Error al actualizar el producto');
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
              <label htmlFor="nombre" className="form-label fw-bold">Nombre del Producto</label>
              <input 
                type="text" 
                className="form-control" 
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)} // Ahora permitimos editar el nombre también
              />
            </div>

            {/* Campo Descripción */}
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label fw-bold">Descripción</label>
              <textarea 
                className="form-control" 
                id="descripcion" 
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              ></textarea>
            </div>

            <div className="row">
              {/* Campo Precio */}
              <div className="col-md-6 mb-3">
                <label htmlFor="precio" className="form-label fw-bold">Precio (CLP)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="precio"
                  min="0"
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                  required
                />
              </div>

              {/* Campo Categoría */}
              <div className="col-md-6 mb-3">
                <label htmlFor="categoria" className="form-label fw-bold">Categoría</label>
                <select 
                  className="form-select" 
                  id="categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Campo URL de Imagen */}
            <div className="mb-3">
              <label htmlFor="imagenUrl" className="form-label fw-bold">URL de la Imagen</label>
              <input 
                type="text" 
                className="form-control" 
                id="imagenUrl"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={imagenUrl}
                onChange={(e) => setImagenUrl(e.target.value)}
              />
            </div>

            {/* Vista previa de imagen pequeña (Opcional) */}
            {imagenUrl && (
                <div className="mb-3">
                    <p className="small text-muted">Vista previa:</p>
                    <img src={imagenUrl} alt="Vista previa" style={{height: '100px', borderRadius: '10px'}} />
                </div>
            )}

            {/* Botones de Acción */}
            <hr className="my-4" />
            <div className="text-end">
              <Link to="/admin/productos" className="btn btn-outline-secondary me-2">
                <FontAwesomeIcon icon={faTimes} className="me-2" />
                Cancelar
              </Link>
              <button type="submit" className="btn btn-primary">
                <FontAwesomeIcon icon={faSave} className="me-2" />
                Guardar Cambios
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminEditarProducto;