import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import Productos from './Productos';
import Header from '../components/Header';


jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
  loading: jest.fn(),
  dismiss: jest.fn(),
  Toaster: () => <div data-testid="toaster-mock" />,
  default: jest.fn(), 
}));


jest.mock('../context/AuthContext', () => ({
  ...jest.requireActual('../context/AuthContext'),
  useAuth: () => ({
    currentUser: null, 
    logout: jest.fn(),
  })
}));



const renderProductosPage = () => {
  return render(
    <BrowserRouter>
      <CartProvider> 
        <Header onCartClick={() => {}} /> 
        <Productos />
      </CartProvider>
    </BrowserRouter>
  );
};



test('6. (Prueba de Evento) Añadir un producto al carrito', async () => {
  renderProductosPage();
  const user = userEvent.setup();
  
  const manzanaCard = screen.getByText('Manzanas Fuji').closest('.card');
  
  expect(manzanaCard).toBeInTheDocument();


  const addButton = within(manzanaCard as HTMLElement).getByRole('button', { name: /Añadir al carrito/i });

  await user.click(addButton);

  const cartCount = screen.getByText('1');
  expect(cartCount).toBeInTheDocument();
});

test('7. (Prueba de Evento) Añadir múltiples productos', async () => {
  renderProductosPage();
  const user = userEvent.setup();
  
  const manzanaCard = screen.getByText('Manzanas Fuji').closest('.card');
  
  const manzanaButton = within(manzanaCard as HTMLElement).getByRole('button', { name: /Añadir al carrito/i });

  const naranjaCard = screen.getByText('Naranjas Valencia').closest('.card');
  
  const naranjaButton = within(naranjaCard as HTMLElement).getByRole('button', { name: /Añadir al carrito/i });

  await user.click(manzanaButton); 
  await user.click(naranjaButton); 
  await user.click(manzanaButton); 

  const cartCount = screen.getByText('3');
  expect(cartCount).toBeInTheDocument();
});