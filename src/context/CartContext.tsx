import React, { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';


type Product = {
  name: string;
  price: number;
  image: string;
};


type CartItem = {
  product: Product;
  quantity: number;
};


type CartContextType = {
  items: CartItem[]; 
  totalItems: number; 
  subtotal: number; 
  addToCart: (product: Product) => void;
  removeFromCart: (productName: string) => void;
  updateQuantity: (productName: string, quantity: number) => void;
  clearCart: () => void; 
};


const CartContext = createContext<CartContextType>(null!);


type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {

  const [items, setItems] = useState<CartItem[]>([]);


  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.product.name === product.name
      );

      if (existingItem) {
     
        return prevItems.map((i) =>
          i.product.name === product.name
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
    
        return [...prevItems, { product: product, quantity: 1 }];
      }
    });
    
    toast.success(`¡Añadido! "${product.name}" al carrito.`);
  };

 
  const removeFromCart = (productName: string) => {
    setItems((prevItems) =>
      prevItems.filter((i) => i.product.name !== productName)
    );
    
    toast.error(`"${productName}" eliminado del carrito.`);
  };
  
 
  const updateQuantity = (productName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productName);
    } else {
      setItems((prevItems) => 
        prevItems.map((i) => 
          i.product.name === productName ? { ...i, quantity: quantity } : i
        )
      );
    }
  };

 
  const clearCart = () => {
    setItems([]); 
  };


  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  
  const value = {
    items,
    totalItems,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart, 
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


export function useCart() {
  return useContext(CartContext);
}