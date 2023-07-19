import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    } else {
      ls?.removeItem('cart');
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')))
    }
  }, []);

  function addProduct(productId) {
    setCartProducts(previous => [...previous, productId]);
  };
  function removeProduct(productId){
    setCartProducts(previous => {
        const position = previous.indexOf(productId);
        if(position !== -1)
        {
            return previous.filter((value, index) => index !== position);
        }
        return previous;
    });
  };
  function clearCart(){
    setCartProducts([]);
    ls?.removeItem('cart');
  }

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, 
    addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
