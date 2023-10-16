import { createSlice } from "@reduxjs/toolkit";
//  import { CART_ACTION_TYPES } from "./cart.types";


export const addCartItem = (cartItems, productToAdd) => {

  // find if cartItems contains a productToAdd.
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if cartItems contains a productToAdd then cartItem quantity increment by 1.
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }
  // if cartItems does not contain a productToAdd then add cartItem quantity by 1.
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  // find if cartItems contains a productToAdd.
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  // if cartItems contains quantity is 0 then remove cartItem.
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
  // if cartItems contains a productToAdd then cartItem quantity decrement by 1.
  return cartItems.map((cartItem) => {
    return cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
  };

  
export const cartSlice = createSlice({
  name: 'cart',
  initialState:INITIAL_STATE,
  reducers:{
      setIsCartOpen(state,action){
        state.isCartOpen = action.payload;
      },
      addItemToCart(state,action){
        state.cartItems = addCartItem(state.cartItems, action.payload);
      },
      removeItemFromCart(state,action){
        state.cartItems = removeCartItem(state.cartItems, action.payload);
      },
      clearItemFromCart(state,action){
        state.cartItems = clearCartItem(state.cartItems, action.payload);
      }

  }
})

export const {setIsCartOpen,addItemToCart,removeItemFromCart,clearItemFromCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;


// export const cartReducer = (state=INITIAL_STATE, action) => {
    // const { payload, type } = action;
    // switch (type) {
    //   case CART_ACTION_TYPES.SET_CART_ITEMS:
    //     return {
    //       ...state,
    //       cartItems:payload,
    //     };
    //   case CART_ACTION_TYPES.SET_IS_CART_OPEN:
    //     return {
    //       ...state,
    //       isCartOpen: payload,
    //     };
    //   default:
    //     return state;
    // }
  // };
  