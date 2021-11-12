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
  <div className="stripe-button max-w-2xl block w-full mb-6">
    <img src={stripeIcons} />
    <span id="checkout-button" role="link" onClick={handleClick} className="max-w-2xl block w-full">
        <input className="e-checkout my-4 relative special-stripe text-left  text-black  white-box rounded-full w-full block leading-none h-4em md:h-4em justify-center text-mobileNav md:text-desktopNav pl-1 sub-i-6:pl-5 tiny:pl-12 sm:pl-12 md:pl-12" type="submit" value="pay with card" />
    </span>
  </div>
);

const DisabledButton = ({text}) => {
  const clickHandler = () => {
   document.getElementById('terms').classList.add("alert");
  }
  return(
  <div className="disabled-button max-w-2xl stripe-button block w-full">
    <img src={text == 'pay with card' ? stripeIcons : bitIcons} />
    <span id="checkout-button" role="link" onClick={clickHandler} className="max-w-2xl block w-full">
      <input className="e-checkout my-4 relative special-stripe text-left text-black white-box rounded-full w-full block leading-none h-4em md:h-4em justify-center text-mobileNav md:text-desktopNav pl-1 sub-i-6:pl-5 tiny:pl-12 sm:pl-12 md:pl-12" type="submit" value={text} />
    </span>
  </div>
)};

const BitPayCheckoutButton = ({ bitPayID, disabled, onClick }) => (
  <form className="max-w-2xl block w-full" action={process.env.GATSBY_BITPAY_API_URL} method="post">
    <input type="hidden" name="action" value="checkout" />
    <input type="hidden" name="posData" value="" />
    <input type="hidden" name="data" value={bitPayID} />
    <div className="stripe-button max-w-2xl block w-full">
    <img src={bitIcons} />
    <span className="max-w-2xl block w-full">
      <input onClick={onClick} className="e-checkout my-4 relative special-bitcoin text-left text-black white-box rounded-full w-full block leading-none h-4em md:h-4em justify-center text-mobileNav md:text-desktopNav pl-1 sub-i-6:pl-5 tiny:pl-12 sm:pl-12 md:pl-12" type="submit" value="pay with crypto" />
    </span>
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
    <form id='terms' className="mt-8 mb-4 pb-1em">
      <div className="grid grid-cols-4 sm:flex">
        <span className="e-checkbox">
          <input id='agree-to-terms' className="e-checkbox-icon left-0" type="checkbox" value={disabled} onChange={handleChange} />
        </span>
        <label htmlFor="agree-to-terms" className="terms-agreement relative ml-0 col-span-3 "> 
          I agree to the <a target="_blank" href="/deposit-tc/">Deposit Terms and Conditions​</a>
        </label>
      </div>
    </form>
  );
};

const CheckoutActions = ({ unit, discount, discountCode, bitPayID, message, handleStripeClick, handleBitpayClick }) => {
  if (message) return <Message message={message} />;

  const [showStripe, setShowStripe] = useState(1);
  const handleStripe = () => {
    setShowStripe(1)
    console.log(showStripe)
    document.getElementById("bit-radio").checked = false;
  }
  const handleBit = () => {
    setShowStripe(0)
    document.getElementById("stripe-radio").checked = false;
  }
  const [disabled, setDisabled] = useState(1);
  const handleChange = () => {
    setDisabled(1 ^ disabled);

    document.getElementById('terms').classList.remove('alert')


  }

  return (
    <>
      <section className="pb-20 md:mb-20">
        <CheckoutTerms disabled={disabled} handleChange={handleChange} />
        { !disabled &&
          <>
           <StripeCheckoutCreateButton disabled={disabled} handleClick={handleStripeClick} />
           <BitPayCheckoutButton disabled={disabled} bitPayID={bitPayID} onClick={handleBitpayClick}/>
          </>
        }

        {disabled &&
          <>
            <DisabledButton text="pay with card"/>
            <DisabledButton text="pay with crypto"/>
          </>
        }
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

  const sendAnalyticsEvent = (action, category, label) => {
    try {
      if (typeof window !== "undefined") {
        if (window.gtag) {
          window.gtag("event", action, {
            "event_category": category,
            "event_label": label,
          })
        }

        if (window.ga) {
          window.ga("send", {
            hitType: "event",
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
          });
        }
      }
    } catch (error) {
      console.error("Error sending Google Analytics: ", error)
    }
  }

  const handleBitpayClick = () => {
    sendAnalyticsEvent(
      'Bitpay Initiated',
      'Conversion',
      window && window.location && window.location.search || ""
    )
  }

  const handleStripeClick = async (/* event */) => {
    sendAnalyticsEvent(
      'Stripe Initiated',
      'Conversion',
      window && window.location && window.location.search || ""
    )

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
      handleStripeClick={handleStripeClick}
      handleBitpayClick={handleBitpayClick}
    />
  );
}
