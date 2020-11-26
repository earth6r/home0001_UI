import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import CoinbaseCommerceButton from "react-coinbase-commerce";
import "react-coinbase-commerce/dist/coinbase-commerce-button.css";

// TODO get product data
const StripeCheckoutCreateButton = ({ handleClick }) => (
  <section>
    {/* <div className="product">
      <img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div> */}
    <button id="checkout-button" role="link" onClick={handleClick}>
      Checkout with Stripe
    </button>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

const CheckoutActions = ({ /*sku, */ message, handleClick }) => {
  if (message) return <Message message={message} />;

  // TODO sku -> checkoutId for Coinbase

  return (
    <>
      <StripeCheckoutCreateButton handleClick={handleClick} />
      <CoinbaseCommerceButton
        checkoutId="9d34a029-7038-4e8c-9fbc-3a897ddb0f46"
        onChargeSuccess={(messageData) => navigate("/checkout/success")}
        onChargeFailure={(messageData) => navigate("/checkout/error")}
      />
    </>
  );
};

export default function CheckoutCreate({ sku, stripePromise }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
    }
  }, []);

  const handleClick = async (event) => {
    const data = { sku, quantity: 1 };
    const stripe = await stripePromise;
    const response = await fetch("/.netlify/functions/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const { sessionId } = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      console.log("Err!", result.error);

      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return <CheckoutActions message={message} handleClick={handleClick} />;
}
