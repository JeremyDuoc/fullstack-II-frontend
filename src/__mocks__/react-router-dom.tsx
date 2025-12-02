import React from 'react';


export const BrowserRouter = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

// Mock de <Link>
export const Link = ({ children, to }: { children: React.ReactNode, to: string }) => (
  <a href={to}>{children}</a>
);

// Mock de <NavLink>
export const NavLink = ({ children, to }: { children: React.ReactNode, to: string }) => (
  <a href={to}>{children}</a>
);

// Mock de <Routes>
export const Routes = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

// Mock de <Route>
export const Route = ({ element }: { element: React.ReactElement }) => (
  <div>{element}</div>
);

// Mock de <Navigate>
export const Navigate = ({ to }: { to: string }) => {
  console.log(`(Mock Navigate) Redirigiendo a: ${to}`);
  return null; // No renderiza nada
};

// Mock de los 'hooks'
export const useLocation = () => ({
  pathname: '/',
  search: '',
  hash: '',
  state: null,
  key: 'testkey',
});

export const useNavigate = () => {
  return (path: string) => {
    console.log(`(Mock Navigate) Navegando a: ${path}`);
  };
};

export {};