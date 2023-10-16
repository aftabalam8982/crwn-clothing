import { useDispatch } from "react-redux";

import "./checkout-item.styles.scss";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.reducer";
const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, price, quantity, imageUrl } = cartItem;

  const removeCartHandler = () => dispatch(removeItemFromCart(cartItem));
  const addCartHandler = () => dispatch(addItemToCart(cartItem));
  const clearCartHandler = () => dispatch(clearItemFromCart(cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeCartHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addCartHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearCartHandler}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;
