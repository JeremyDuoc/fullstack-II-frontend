import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// 1. Importamos los proveedores que <App /> necesita
// (los mismos que están en index.tsx)
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

test('La aplicación se renderiza sin errores', () => {
  // 2. Envolvemos <App /> en los proveedores
  // <App /> ya tiene su propio <BrowserRouter> adentro,
  // así que no necesitamos añadirlo aquí.
  render(
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  );
  
  // 3. (Opcional) Podemos añadir una pequeña verificación
  // para asegurarnos de que la página de inicio (Home) se renderizó.
  // Buscamos el texto "Nuestros Valores"
  const headingElement = screen.getByText(/Nuestros Valores/i);
  expect(headingElement).toBeInTheDocument();
});