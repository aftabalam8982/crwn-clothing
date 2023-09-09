import { createContext, useEffect, useState } from "react";


const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains a productToAdd.
    const existingCartItem = cartItems.find(cartItem =>cartItem.id === productToAdd.id);
    // if cartItems contains a productToAdd then cartItem quantity increment by 1.
    if(existingCartItem) {
     return cartItems.map(cartItem =>{
          return cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity+1} : cartItem;
     })
    };
    // if cartItems does not contain a productToAdd then add cartItem quantity by 1.
    return [...cartItems,{...productToAdd, quantity:1}];
}


const removeCartItem = (cartItems, productToRemove) => {
    // find if cartItems contains a productToAdd.
    const existingCartItem = cartItems.find(cartItem =>cartItem.id === productToRemove.id);
      // if cartItems contains quantity is 0 then remove cartItem.
    if(existingCartItem.quantity === 1) {
      return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
    };
    // if cartItems contains a productToAdd then cartItem quantity decrement by 1.
    return cartItems.map(cartItem =>{
        return cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity-1} : cartItem;
   })};


   const clearCartItem = (cartItems, productToClear) =>{
        return cartItems.filter(cartItem => cartItem.id !== productToClear.id);
   }

export const cartContext = createContext({
    isCartOpen:false,
    setIsCartOpen:() => {},
    cartItems : [],
    addItemToCart:() => {},
    cartCount:0,
    removeItemFromCart:() => {},
    clearItemFromCart:() => {},
    total:0,
});

 export const CartProvider = ({children}) =>{
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] =  useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [ cartTotal, setCartTotal]= useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
        setCartCount(newCartCount);
    },[cartItems])
    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0);
        setCartTotal(newCartTotal);
    },[cartItems])

    const addItemToCart = (productToAdd) =>{
       setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemFromCart = (productToRemove) =>{
       setCartItems(removeCartItem(cartItems, productToRemove));
    }
    const clearItemFromCart = (productToClear) =>{
       setCartItems(clearCartItem(cartItems, productToClear));
    }

    const value = {isCartOpen,setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal}
    return <cartContext.Provider value={value}>{children}</cartContext.Provider>
}
