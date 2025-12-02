import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';
import { CartSlider } from './CartSlider';
import Home from '../views/Home';
import Productos from '../views/Productos';
import Contacto from '../views/Contacto';
import Perfil from '../views/Perfil';
import Login from '../views/Login';
import Registro from '../views/Registro';
import Carrito from '../views/Carrito';
import PagoExitoso from '../views/PagoExitoso';
import PagoFallido from '../views/PagoFallido';

export const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <>
      <Header onCartClick={openCart} />
      <Toaster position="top-right" />
      <CartSlider isOpen={isCartOpen} onClose={closeCart} />

      <div style={{ minHeight: '80vh', backgroundColor: '#f9f7f4' }}>
        <Routes>
          <Route path="/" element={<Home />} />
 
         <Route path="/productos" element={<Productos />} />
         <Route path="/contacto" element={<Contacto />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pago-exitoso" element={<PagoExitoso />} />
          <Route path="/pago-fallido" element={<PagoFallido />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};