import React, { useState, useEffect } from "react";
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";
import ButtonLink from "./global/buttonLink";
import { Link } from "gatsby";
import bitIcons from "./images/bit-icons-02.svg"
import bitDisabled from "./images/bit-icons-01.svg"
import stripeIcons from "./images/color.svg"
import stripeDisabled from "./images/stripe-icons2-01.svg"
import { StyledPageLink } from "./global/internalLink";

const StripeCheckoutCreateButton = ({ handleClick, disabled }) => (
  <div className="stripe-button">
  <img src={disabled ? stripeDisabled : stripeIcons} />
  <ButtonLink
    color="black"
    disabled={disabled}
    className="e-checkout special-stripe"
    id="checkout-button"
    role="link"
    onClick={handleClick}
    type="button"
    value=" "
  />
  </div>
);

const BitPayCheckoutButton = ({ bitPayID, disabled }) => (
  <form action={process.env.GATSBY_BITPAY_API_URL} method="post">
    <input type="hidden" name="action" value="checkout" />
    <input type="hidden" name="posData" value="" />
    <input type="hidden" name="data" value={bitPayID} />
    <div className="stripe-button bit-button">
    <img src={disabled ? bitDisabled : bitIcons} />
    <ButtonLink
      disabled={disabled}
      color="black"
      className="e-checkout special-bitcoin"
      type="submit"
      value=" "
    />
    </div>
  </form>
);

const Message = ({ message }) => (
  <section className="pt-1em">
    <p>{message}</p>
  </section>
);

const Price = ({ discount, color }) => {
  if (discount)
    return (
      <span>
        <s>$300</s>&nbsp;<span>$200</span>
      </span>
    );

  return <span>$300</span>;
};

const CheckoutTerms = ({ disabled, handleChange }) => {
  return (
    <p className="mt-10">
      <span className="e-checkbox">
        <input className="e-checkbox-icon" type="checkbox" value={disabled} onChange={handleChange} />
       
      </span>
      I agree to the <a target="_blank" href="/deposit-tc/">Deposit Terms and Conditions​</a>
    </p>
  );
};

const CheckoutActions = ({ unit, discount, discountCode, bitPayID, message, handleClick }) => {
  if (message) return <Message message={message} />;

  const [disabled, setDisabled] = useState(1);
  const handleChange = () => setDisabled(1 ^ disabled);

  return (
    <>
      <section className="mb-10 md:mb-20">
      <CheckoutTerms disabled={disabled} handleChange={handleChange} />
        {/* <ProductDetails discount={discount} discountCode={discountCode} unit={unit} /> */}
        <StripeCheckoutCreateButton disabled={disabled} handleClick={handleClick} />
        <div className="py-1em">
        <BitPayCheckoutButton disabled={disabled} bitPayID={bitPayID} /> 
        </div> 

        {/*<div className="py-1em">
          <span className="max-w-4xl block w-full md:pl-1/10">
            <Link
              className="box rounded-md w-full block text-center leading-none h-2em  flex items-center justify-center text-mobileBody md:text-desktopBody uppercase"
              to="/homes"
            >
              <span className="-mt-1/4em md:mt-0">Available Homes</span>
            </Link>
          </span>
        </div>*/}
      </section>
    </>
  );
};

export default function CheckoutCreate({
  discount,
  discountCode,
  unit,
  sku,
  codes,
  bitPayID,
  stripePromise,
}) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage("Order canceled - continue to shop around and checkout when you're ready.");
    }
  }, []);

  const handleClick = async (/* event */) => {
    const stripe = await stripePromise;
    const data = { sku, discount, discountCode };

    const response = await fetch("/.netlify/functions/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const session = await response.json();

    if (!response.ok) {
      console.error(response);
      setMessage(session.message || "An error occurred. Please contact us to resolve the issue");
      return;
    }

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (result.error) {
      console.error(result.error);
      setMessage(result.error.message);
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <CheckoutActions
      bitPayID={bitPayID}
      unit={unit}
      codes={codes}
      discount={discount}
      discountCode={discountCode}
      message={message}
      handleClick={handleClick}
    />
  );
}
