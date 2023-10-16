import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./payment-form.styles.scss";
import Button from "../button/button-component";
// import { handler } from "../../../netlify/functions/create-payment-intent";
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Use stripe and elements to handle payment
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 10000 }),
    }).then((res) => res.json());
    console.log(response);
  };

  return (
    <form onSubmit={paymentHandler}>
      <div className="for-container">
        <h2>Cradit card payment: </h2>
        <CardElement />
        <Button style={{ marginTop: "20px" }} buttonType="inverted">
          Pay Now
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
