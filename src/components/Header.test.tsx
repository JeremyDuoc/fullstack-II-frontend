import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

import { AuthProvider, useAuth } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';


const mockUseAuth = jest.fn();
jest.mock('../context/AuthContext', () => ({
  ...jest.requireActual('../context/AuthContext'), 
  useAuth: () => mockUseAuth() 
}));


jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
  loading: jest.fn(),
  dismiss: jest.fn(),
  Toaster: () => <div data-testid="toaster-mock" />,
  default: jest.fn(),
}));


const renderHeader = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header onCartClick={() => {}} /> 
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};


beforeEach(() => {

  mockUseAuth.mockReturnValue({
    currentUser: null,
    logout: jest.fn(),
  });
});

test('1. Renderiza el logo "HuertoHogar"', () => {
  renderHeader();
  const logoElement = screen.getByText(/HuertoHogar/i); 
  expect(logoElement).toBeInTheDocument();
});

test('2. Muestra "Login" y "Mi Perfil" (deslogueado)', () => {
  renderHeader();
  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByText('Mi Perfil')).toBeInTheDocument();
});

test('3. Muestra el contador del carrito en 0 (por defecto)', () => {
  renderHeader();
  const cartCount = screen.getByText('0');
  expect(cartCount).toBeInTheDocument();
});


test('9. Muestra "Hola, [Nombre]" y "Cerrar Sesión" (logueado)', () => {

  mockUseAuth.mockReturnValue({
    currentUser: {
      id: '1',
      nombre: 'KiwixTest', 
      correo: 'test@test.com',
      role: 'customer',
      direccion: '',
      telefono: ''
    },
    logout: jest.fn(),
  });
  
  renderHeader();
  

  expect(screen.getByText(/Hola, KiwixTest/i)).toBeInTheDocument();
  expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();
  

  expect(screen.queryByText('Login')).not.toBeInTheDocument();
  expect(screen.queryByText('Mi Perfil')).not.toBeInTheDocument();
});