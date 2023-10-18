import { loadStripe } from "@stripe/stripe-js";
import React from "react";

export const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLICABLE_KEY}`);