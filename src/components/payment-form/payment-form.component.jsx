import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./payment-form.styles.scss";
import Button from "../button/button-component";
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Use stripe and elements to handle payment
  };

  return (
    <form>
      <div className="form-container">
        <h2>Cradit card payment: </h2>
        <CardElement />
        <Button buttonType="inverted">Pay Now</Button>
      </div>
    </form>
  );
};

export default PaymentForm;
