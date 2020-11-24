import React, { useState, useEffect } from "react";

const CheckoutCreateButton = ({ handleClick }) => (
  <section>
    <div className="product">
      <img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <button id="checkout-button" role="link" onClick={handleClick}>
      Checkout
    </button>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function CheckoutCreate({ stripePromise }) {
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
    const stripe = await stripePromise;

    const response = await fetch("/.netlify/functions/create-checkout", {
      method: "POST",
    });

    // {
    //   errorType: "Error",
    //   errorMessage: "You did not provide an API key. You need to provide your API key in the Authorization header, using Bearer auth (e.g. 'Authorization: Bearer YOUR_SECRET_KEY'). See https://stripe.com/docs/api#authentication for details, or we can help at https://support.stripe.com/.",
    //   trace: [
    //   "Error: You did not provide an API key. You need to provide your API key in the Authorization header, using Bearer auth (e.g. 'Authorization: Bearer YOUR_SECRET_KEY'). See https://stripe.com/docs/api#authentication for details, or we can help at https://support.stripe.com/.",
    //   " at IncomingMessage.<anonymous> (/var/task/src/node_modules/stripe/lib/StripeResource.js:169:21)",
    //   " at Object.onceWrapper (events.js:420:28)",
    //   " at IncomingMessage.emit (events.js:326:22)",
    //   " at endReadableNT (_stream_readable.js:1223:12)",
    //   " at processTicksAndRejections (internal/process/task_queues.js:84:21)"
    //   ]
    //   }

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

  return message ? (
    <Message message={message} />
  ) : (
    <CheckoutCreateButton handleClick={handleClick} />
  );
}
