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

export const cartContext = createContext({
    isCartOpen:false,
    setIsCartOpen:() => {},
    cartItems : [],
    addItemToCart:() => {},
    cartCount:0,
});

 export const CartProvider = ({children}) =>{
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] =  useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
        setCartCount(newCartCount);
    },[cartItems])

    const addItemToCart = (productToAdd) =>{
       setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {isCartOpen,setIsCartOpen, addItemToCart, cartItems, cartCount}
    return <cartContext.Provider value={value}>{children}</cartContext.Provider>
}