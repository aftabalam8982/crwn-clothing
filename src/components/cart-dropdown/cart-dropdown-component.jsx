import { useContext } from "react";
import Button from "../button/button-component";
import './cart-dropdown.styles.scss';
import { cartContext } from "../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from 'react-router-dom';


const CartDropdown = () => {
    const {cartItems,setIsCartOpen,isCartOpen} = useContext(cartContext);
     const navigate = useNavigate();
     const nevigateCheckoutPage = () => {
        navigate('/checkout');
        setIsCartOpen(!isCartOpen)
    };
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map(item=>(<CartItem key={item.id} cartItem={item}/>))}
            </div>
            <Button onClick={nevigateCheckoutPage}>go to Checkout</Button>
        </div>
    )
};
export default CartDropdown;