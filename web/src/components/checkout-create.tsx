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
  <div className="stripe-button max-w-2xl block w-full">

  
  <span id="checkout-button" role="link" onClick={handleClick} className="max-w-2xl block w-full">
      <input className="e-checkout relative special-stripe text-center bg-white text-black  white-box rounded-full w-full block leading-none h-3em md:h-2em justify-center text-mobileBody md:text-desktopBody" type="submit" value="Join Now" />
    </span>
  </div>
);

const DisabledButton = () => {
  const clickHandler = () => {
   document.getElementById('terms').classList.add("alert");
  }
  return(
  <div className="disabled-button max-w-2xl block w-full">

    
    <span id="checkout-button" role="link" onClick={clickHandler} className="max-w-2xl block w-full">
        <input className="e-checkout relative special-stripe text-center bg-white text-black white-box rounded-full w-full block leading-none h-3em md:h-2em justify-center text-mobileBody md:text-desktopBody" type="submit" value="Join Now" />
      </span>
  </div>
)};

const BitPayCheckoutButton = ({ bitPayID, disabled }) => (
  <form className="max-w-2xl block w-full" action={process.env.GATSBY_BITPAY_API_URL} method="post">
    <input type="hidden" name="action" value="checkout" />
    <input type="hidden" name="posData" value="" />
    <input type="hidden" name="data" value={bitPayID} />
    <div className="stripe-button bit-button">

    <span className="max-w-2xl block w-full">
      <input className="e-checkout relative special-bitcoin text-center bg-white text-black white-box rounded-full w-full block leading-none h-3em md:h-2em    justify-center text-mobileBody md:text-desktopBody" type="submit" value="Join Now" />
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
      <span className="e-checkbox">
        <input id='agree-to-terms' className="e-checkbox-icon" type="checkbox" value={disabled} onChange={handleChange} />
       
      </span>
      
     <label htmlFor="agree-to-terms" className="terms-agreement relative"> I agree to the <a target="_blank" href="/deposit-tc/">Deposit Terms and Conditions​</a></label>
 
    </form>
  );
};

const CheckoutActions = ({ unit, discount, discountCode, bitPayID, message, handleClick }) => {
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
      <section className="mb-10 md:mb-20">
        <form>
        <div className="stripe-button max-w-2xl py-2 block w-full">
          <img src={stripeIcons} />
          <span id="checkout-button" role="link" onClick={handleStripe} className="relative text-gray-700 max-w-2xl block w-full">
            <input defaultChecked={showStripe ? true :  false} id="stripe-radio" type="radio" className="absolute bg-none"/><label htmlFor="stripe-radio" className="e-checkout rounded-md option-button-checkout special-stripe text-left text-white  box rounded-none w-full block h-2rem justify-center">Pay with card</label>
          </span>
        </div>

        <div className="stripe-button pt-2 bit-button max-w-2xl block w-full">
          <img src={bitIcons} />
          <span onClick={handleBit} className="max-w-2xl block w-full relative text-gray-700">
            <input id="bit-radio" type="radio" className="absolute bg-none"/><label htmlFor="bit-radio" className="e-checkout option-button-checkout special-bitcoin rounded-md text-left text-white text-gray-700 box w-full block h-2rem rounded-none justify-center ">Pay with crypto</label>
          </span>
        </div>
        </form>

        <CheckoutTerms disabled={disabled} handleChange={handleChange} /> 
        { !disabled &&
          <>
          {showStripe ?
           <StripeCheckoutCreateButton disabled={disabled} handleClick={handleClick} />
           :
           <BitPayCheckoutButton disabled={disabled} bitPayID={bitPayID} /> 
          }
          </>
        }

        {disabled ?
          <DisabledButton/>
          : ""
        }
 
            
        
       
        
         

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
