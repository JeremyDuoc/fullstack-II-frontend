import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Login from './Login';


const mockLogin = jest.fn();
jest.mock('../context/AuthContext', () => ({
  ...jest.requireActual('../context/AuthContext'),
  useAuth: () => ({
    login: mockLogin,
    currentUser: null
  })
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
  loading: jest.fn(),
  dismiss: jest.fn(),
  Toaster: () => <div data-testid="toaster-mock" /> 
}));

// Función helper
const renderLogin = () => {
  mockLogin.mockClear(); 
  return render(
    <BrowserRouter>
      <AuthProvider> 
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};



test('4. (Prueba de Estado) El formulario se actualiza al escribir', async () => {
  renderLogin();
  const user = userEvent.setup();

  const emailInput = screen.getByLabelText(/Correo electrónico/i);
  const passwordInput = screen.getByLabelText(/Contraseña/i);

  await user.type(emailInput, 'test@user.com');
  await user.type(passwordInput, 'testpass123');

  expect(emailInput).toHaveValue('test@user.com');
  expect(passwordInput).toHaveValue('testpass123');
});

test('5. (Prueba de Evento) Llama a la función "login" al hacer clic', async () => {
  renderLogin();
  const user = userEvent.setup();

  const emailInput = screen.getByLabelText(/Correo electrónico/i);
  const passwordInput = screen.getByLabelText(/Contraseña/i);
  const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });

  await user.type(emailInput, 'admin@example.com');
  await user.type(passwordInput, 'admin123');
  await user.click(submitButton);

  expect(mockLogin).toHaveBeenCalledTimes(1);
  expect(mockLogin).toHaveBeenCalledWith('admin@example.com', 'admin123');
});


test('10. (Prueba de Evento) No llama a "login" si los campos están vacíos', async () => {
  renderLogin();
  const user = userEvent.setup();


  const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });


  await user.click(submitButton);


  expect(mockLogin).toHaveBeenCalledTimes(0);
});