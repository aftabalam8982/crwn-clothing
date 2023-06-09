import { createContext, useState } from "react";

export const cartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { createContext, useState } from 'react';

// export const addCartItem = (cartItems, productToAdd) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === productToAdd.id
//   );

//   if (existingCartItem) {
//     return cartItems.map((cartItem) =>
//       cartItem.id === productToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//   }

//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsOpen: () => {},
//   cartItems: [],
//   addItemToCart: () => {},
// });

// export const CartProvider = ({ children }) => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);

//   const addItemToCart = (product) =>
//     setCartItems(addCartItem(cartItems, product));

//   const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
