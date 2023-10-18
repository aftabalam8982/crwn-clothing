import "./button.styles.scss";

const Button_Types_Classes = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, isLoading, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${Button_Types_Classes[buttonType]} ${
        isLoading ? "spinner" : ""
      } `}
      disabled={isLoading}
      {...otherProps}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
