import { cartContext } from '../../context/cart.context';
import './checkout-item.styles.scss';

import React, { useContext } from 'react'

const CheckoutItem = ({cartItem}) => {

    const {name, price, quantity, imageUrl} = cartItem;
    const {clearItemFromCart, addItemToCart, removeItemFromCart} = useContext(cartContext);

    const removeCartHandler =()=> removeItemFromCart(cartItem);
    const addCartHandler =()=> addItemToCart(cartItem);
    const clearCartHandler =()=> clearItemFromCart(cartItem);

  return (
    <div className='checkout-item-container'>
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeCartHandler}>&#10094;</div>
        <span className='value'>
        {quantity}
        </span>
        <div className="arrow" onClick={addCartHandler}>&#10095;</div>
        </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearCartHandler}>&#10005;</span>
    </div>
  )
}

export default CheckoutItem;
