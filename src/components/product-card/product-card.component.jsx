import { useContext } from "react";
import Button from "../button/button.component";
import './product-card.styles.scss';
import { cartContext } from "../../context/cart.context";

const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  const {addItemToCart} = useContext(cartContext);

  const addProductToCart = addItemToCart(product)

  return (
    <div className="product-card-container">
      <img src={imageUrl} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>Add to cart</Button>
    </div>
  );
};

export default ProductCard;
