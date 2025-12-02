import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

function AdminNuevoProducto() {
  const navigate = useNavigate();
  const { token } = useAuth(); 

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'Frutas', 
    description: '',
    image: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validamos que el precio sea número
    const precioNumerico = parseInt(form.price);
    if (isNaN(precioNumerico)) {
      toast.error("El precio debe ser un número");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          ...form,
          price: precioNumerico
        })
      });

      if (response.ok) {
        toast.success('¡Producto creado con éxito!');
        navigate('/admin/productos'); 
      } else {
        toast.error('Error al crear el producto');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error de conexión con el servidor');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-success mb-4">Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0" style={{maxWidth: '600px', borderRadius: '20px'}}>
        
        <div className="mb-3">
          <label className="form-label">Nombre del Producto</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Precio</label>
            <input name="price" type="number" className="form-control" value={form.price} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Categoría</label>
            <select name="category" className="form-select" value={form.category} onChange={handleChange}>
              <option value="Frutas">Frutas</option>
              <option value="Verduras">Verduras</option>
              <option value="Herramientas">Herramientas</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">URL de la Imagen</label>
          <input name="image" type="url" className="form-control" placeholder="https://..." value={form.image} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea name="description" className="form-control" rows={3} value={form.description} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-success w-100 rounded-pill">Guardar Producto</button>
      </form>
    </div>
  );
}

export default AdminNuevoProducto;