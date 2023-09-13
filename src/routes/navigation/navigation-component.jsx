import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import "./navigation-styles.scss";
import { UserContext } from "../../context/user.context";
import { userSignOut } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon-component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown-component";
import { cartContext } from "../../context/cart.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(cartContext);
  const handleSignOut = async () => {
    await userSignOut();
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link to={"/"} className="logo-container">
          <CrownLogo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to={"/shop"}>
            Shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={handleSignOut}>
              Sign out
            </span>
          ) : (
            <Link className="nav-link" to={"/auth"}>
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
