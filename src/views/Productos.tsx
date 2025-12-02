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
        setError('No se pudo conectar con el Backend (Asegúrate de que esté corriendo en el puerto 8080)');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-10">Cargando productos frescos... 🍎</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
          Nuestros Productos (Desde MySQL)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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