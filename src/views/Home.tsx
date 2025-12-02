import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLeaf, faSeedling, faHandHoldingHeart, 
  faBasketShopping, faBoxOpen, faTruckFast,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

// --- ¡NUEVOS IMPORTS PARA EL MAPA! ---
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';

// --- AQUÍ ESTÁ LA CORRECCIÓN ---
// Definición completa del tipo para FeatureCard
type FeatureCardProps = {
  icon: any;
  title: string;
  text: string;
};

// --- (El componente FeatureCard) ---
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, text }) => (
  <div className="col-lg-4 mb-4">
    <div className="card h-100 text-center shadow-sm border-0 p-4">
      <div className="card-body">
        <FontAwesomeIcon icon={icon} size="3x" className="mb-3" style={{ color: '#5c8b5e' }} />
        <h3 className="card-title" style={{ fontFamily: "'Playfair Display', serif", color: '#5c8b5e' }}>{title}</h3>
        <p className="card-text text-secondary">{text}</p>
      </div>
    </div>
  </div>
);


// --- DATOS PARA NUESTRO NUEVO MAPA ---
const locations = [
  { city: 'Santiago', region: 'Región Metropolitana', coords: [-33.4489, -70.6693] as [number, number] },
  { city: 'Valparaíso', region: 'Región de Valparaíso', coords: [-33.0458, -71.6197] as [number, number] },
  { city: 'Viña del Mar', region: 'Región de Valparaíso', coords: [-33.0246, -71.5518] as [number, number] },
  { city: 'Concepción', region: 'Región del Biobío', coords: [-36.8269, -73.0498] as [number, number] },
  { city: 'Nacimiento', region: 'Región del Biobío', coords: [-37.5050, -72.6738] as [number, number] },
  { city: 'Villarica', region: 'Región de la Araucanía', coords: [-39.2746, -72.2275] as [number, number] },
  { city: 'Puerto Montt', region: 'Región de Los Lagos', coords: [-41.4718, -72.9429] as [number, number] },
];

// Creamos un ícono personalizado
const customMarkerIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png', // Un ícono de marcador
  iconSize: [38, 38], // tamaño
});


function Home() {
  return (
    <>
      {/* --- HERO (Igual que antes, con la imagen) --- */}
      <section 
        className="py-5 text-center position-relative" 
        style={{ 
          backgroundImage: `url('https://img.freepik.com/fotos-premium/verduleria-frutas-verduras-frescas_266732-15692.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: '#2a2a2a'
        }}
      >
        <div 
          className="position-absolute"
          style={{ 
            inset: 0, 
            backgroundColor: 'rgba(249, 247, 244, 0.65)' 
          }}
        ></div>
        
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '4rem', color: '#8e685a', textShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
            Descubre la frescura que nace de la tierra
          </h1>
          <p className="lead text-secondary my-4 fw-bold" style={{ maxWidth: '800px', margin: '0 auto', color: '#2a2a2a !important' }}>
            En HuertoHogar, conectamos a tu familia con la naturaleza. Productos cultivados con amor y dedicación, entregados directamente en tu puerta.
          </p>
          <Link to="/productos" className="btn btn-primary btn-lg" style={{ padding: '14px 35px', borderRadius: '50px', fontWeight: 700, textTransform: 'uppercase' }}>
            Explorar Productos
          </Link>
        </div>
      </section>

      {/* --- SECCIÓN VALORES --- */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: '#8e685a' }}>
            Nuestros Valores
          </h2>
          <div className="row">
            <FeatureCard 
              icon={faLeaf} 
              title="Orgánico y Local" 
              text="Trabajamos de la mano con agricultores chilenos que priorizan métodos de cultivo sostenibles y orgánicos." 
            />
            <FeatureCard 
              icon={faSeedling} 
              title="Sostenibilidad" 
              text="Minimizamos nuestra huella de carbono con empaques eco-amigables y rutas de entrega eficientes." 
            />
            <FeatureCard 
              icon={faHandHoldingHeart} 
              title="Comunidad" 
              text="Fomentamos una conexión real entre el campo y la ciudad, celebrando el trabajo de nuestros agricultores." 
            />
          </div>
        </div>
      </section>

      {/* --- CÓMO FUNCIONA --- */}
      <section className="py-5" style={{ backgroundColor: '#e8f0e8' }}>
        <div className="container">
          <h2 className="text-center mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: '#8e685a' }}>
            ¿Cómo Funcionamos?
          </h2>
          <div className="row">
            <FeatureCard 
              icon={faBasketShopping} 
              title="1. Elige tu Producto" 
              text="Selecciona entre una amplia variedad de frutas, verduras y productos de la granja." 
            />
            <FeatureCard 
              icon={faBoxOpen} 
              title="2. Preparamos tu Pedido" 
              text="Recogemos los productos más frescos del día, garantizando su calidad." 
            />
            <FeatureCard 
              icon={faTruckFast} 
              title="3. Recibe en Casa" 
              text="Entregamos tu pedido de manera rápida y segura, directo a tu hogar." 
            />
          </div>
        </div>
      </section>

      {/* --- MAPA INTERACTIVO --- */}
      <section className="py-5" style={{ backgroundColor: '#e8f0e8' }}>
        <div className="container">
          <h2 className="text-center mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: '#8e685a' }}>
            Nuestras Tiendas
          </h2>
          <p className="text-center lead text-secondary mx-auto mb-5" style={{ maxWidth: '800px' }}>
            Encuéntranos en 7 ciudades estratégicas de Chile. Haz zoom y explora nuestras ubicaciones.
          </p>
          
          <div className="map-container mx-auto shadow-lg" style={{ maxWidth: '900px', borderRadius: '20px', overflow: 'hidden' }}>
            <MapContainer 
              center={[-37.0, -71.5]} 
              zoom={5} 
              scrollWheelZoom={false} 
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {locations.map(loc => (
                <Marker key={loc.city} position={loc.coords} icon={customMarkerIcon}>
                  <Popup>
                    <div className="text-center">
                      <strong style={{ color: '#5c8b5e' }}>{loc.city}</strong>
                      <br/>
                      {loc.region}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          
          {/* Lista de ciudades (Grid) */}
          <div className="row mt-5">
            {locations.map((item, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                <div className="card h-100 shadow-sm border-0 text-center">
                  <div className="card-body">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-secondary fs-3 mb-2" style={{ color: '#8e685a' }}/>
                    <h5 className="card-title" style={{ color: '#5c8b5e' }}>{item.city}</h5>
                    <p className="card-text text-secondary" style={{ fontSize: '0.9rem' }}>{item.region}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4"></div> 
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
