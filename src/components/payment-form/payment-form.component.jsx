import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./payment-form.styles.scss";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useState } from "react";
import { selectCartTotal } from "../../store/cart/cart.selector";
import Button from "../button/button-component";
// import { handler } from "../../../netlify/functions/create-payment-intent";
const PaymentForm = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useSelector(selectCurrentUser);
  const totalAmount = useSelector(selectCartTotal);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);
    console.log(currentUser);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 100 * totalAmount }),
    }).then((res) => res.json());
    console.log(response);


    const {
      paymentIntent: { client_secret },
    } = response;
    console.log(client_secret);
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser && currentUser.diaplayName : "Guest",
          address: {
            line1: "flate 25 Dhaka",
            line2: "bihar india",
            postal_code: 845418,
            city: "Dhaka",
            state: "BR",
            country: "IN",
          },
        },
      },
    });
    setIsProcessingPayment(false);
    if (paymentResult.error) {
      console.log("paymentResult error");
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        console.log("payment sucess error");
        alert("payment sucessful");
      }
    }

  };

  return (
    <form onSubmit={paymentHandler}>
      <div className="for-container">
        <h2>Cradit card payment: </h2>
        <CardElement />

        <Button
          isLoading={isProcessingPayment}
          style={{ marginTop: "20px" }}
          buttonType="inverted"
        >

          Pay Now
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
