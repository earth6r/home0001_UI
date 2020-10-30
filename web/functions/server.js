const express = require("express");
const app = express();
const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

app.use(express.static("."));
app.use(express.json());

const paymentIntent = await stripe.paymentIntents.create({
  amount: 300,
  currency: 'usd',
  // Verify your integration in this guide by including this parameter
  metadata: {integration_check: 'accept_a_payment'},
});

paymentRequest.on('paymentmethod', async (ev) => {
  // Confirm the PaymentIntent without handling potential next actions (yet).
  const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
    clientSecret,
    {payment_method: ev.paymentMethod.id},
    {handleActions: false}
  );

  if (confirmError) {
    // Report to the browser that the payment failed, prompting it to
    // re-show the payment interface, or show an error message and close
    // the payment interface.
    ev.complete('fail');
  } else {
    // Report to the browser that the confirmation was successful, prompting
    // it to close the browser payment method collection interface.
    ev.complete('success');
    // Check if the PaymentIntent requires any actions and if so let Stripe.js
    // handle the flow. If using an API version older than "2019-02-11" instead
    // instead check for: `paymentIntent.status === "requires_source_action"`.
    if (paymentIntent.status === "requires_action") {
      // Let Stripe.js handle the rest of the payment flow.
      const {error} = await stripe.confirmCardPayment(clientSecret);
      if (error) {
        // The payment failed -- ask your customer for a new payment method.
      } else {
        // The payment has succeeded.
      }
    } else {
      // The payment has succeeded.
    }
  }
});