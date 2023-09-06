import { useContext } from "react";
import Button from "../button/button-component";
import './cart-dropdown.styles.scss';
import { cartContext } from "../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";


const CartDropdown = () => {
    const {cartItems} = useContext(cartContext);
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map(item=>(<CartItem key={item.id} cartItem={item}/>))}
            </div>
            <Button >go to Checkout</Button>
        </div>
    )
};
export default CartDropdown;