import { useEffect, useState } from 'react';
import { ProductoCard } from '../components/ProductoCard';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

export default function Productos() {
  
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al conectar con el servidor');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Productos cargados:", data); 
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('No se pudo conectar con la base de datos.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-5">Cargando productos frescos... 🍎</div>;
  if (error) return <div className="text-center p-5 text-danger">{error}</div>;

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold text-success" style={{ fontFamily: "'Playfair Display', serif" }}>
          Nuestros Productos
        </h2>
        
        <div className="row">
          {productos.map((producto) => (
            <ProductoCard 
              key={producto.id} 
              producto={producto} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}