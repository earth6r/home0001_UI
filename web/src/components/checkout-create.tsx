import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import CoinbaseCommerceButton from "react-coinbase-commerce";
// import getMemberPrice from "../utils/get-member-price";
// import "react-coinbase-commerce/dist/coinbase-commerce-button.css";
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";

const StripeCheckoutCreateButton = ({ handleClick }) => (
  <button id="checkout-button" role="link" onClick={handleClick}>
    Checkout with Stripe
  </button>
);

const BitPayCheckoutButton = ({ bitPayID }) => (
  <form action="https://test.bitpay.com/checkout" method="post">
    <input type="hidden" name="action" value="checkout" />
    <input type="hidden" name="posData" value="" />
    <input
      type="hidden"
      name="data"
      // value={bitPayID}
      //
      // localhost:
      // value="8i9z07Urk0j2YyISpSvcMlpcnbPuCVN0VA5k6ZtbFu/oN/hvP+i42ilIxjZkqSTOgum96D0V4+9meApk6LJgJLxBoT9x5hawpU5BzaTshmHvIMUf77SVcq9e/UNbAq7gfaFxPgh/tcQyfcE/fw6fAaYI6PwMTqzU8ojHROTsMpuvddyPYZAJOxxSvf/YHys7H6evuDEngH7C/qDavKG0G+Gk2YrNjiPqAvSsuKZyInzZznwFvNpBOOvE7nfJKvdJxYvC3BOKO+n5t01s2W38mdIn/zOuzDTA0f0HPE3ZIqBk1HAtigHk4bAy2L0r28+2z8mt5UdUJIBhycLv9M1fthTzZtZqG8YjOIwZq59QgoVbCVq0ziNxSU9PJOTpLBox"
      //
      // staging:
      value="8i9z07Urk0j2YyISpSvcMlpcnbPuCVN0VA5k6ZtbFu/oN/hvP+i42ilIxjZkqSTOgum96D0V4+9meApk6LJgJIhQcDIG6ef/3W8iZTzFKz2fNfmUMKirscfXOa948zTCH7y/uZ67PlxJdirj9eDKWKs5j+5ewjMCJzt7Fb5yS4gtS3T84e8kxEDkmyqPFsELdbYoA6+XBq9Mmj+qHMviIQWobSwelJC3KfSeizqtMHLdJTUWwzx6JRue0YEB6iYy6COziLvRUP5u0hntdx7i36BbIZALJEgtBU+e82CnOwsV5q1sBezo1rYyp1r42b7BB5Bewr94dZ4NiFoPWlHwIGa03acyUQSxeA03oJ/hatKI7+ESMFHp1zqPSRQrFLyE"
    />
    <input className="e-checkout" type="submit" value="Checkout with BitPay" />
  </form>
);

const Message = ({ message }) => (
  <section className="pt-1em">
    <p>{message}</p>
  </section>
);

const Price = ({ discount }) => {
  if (discount)
    return (
      <span>
        $<s>300</s>
        <span>200</span>
      </span>
    );

  return <span>$300</span>;
};

const MembershipProductDeatils = ({ discount }) => (
  <div className="product pt-1em pb-1em">
    <div className="description">
      <h3>Membership</h3>
      <h5>
        <Price discount={discount} />
      </h5>
    </div>
  </div>
);

const UnitProductDetails = ({ discount, unit }) => (
  <div className="product pt-1/2em pb-1em">
    <img
      className="pb-1em"
      src={imageUrlFor(buildImageObj(unit._rawFloorPlan))
        .width(600)
        .height(Math.floor((9 / 16) * 600))
        .auto("format")
        .url()}
      alt={unit.title}
    />
    <div className="description">
      <h3>{unit.title}</h3>
      <h5>
        <Price discount={discount} />
      </h5>
    </div>
  </div>
);

const ProductDetails = ({ discount, unit }) => {
  if (!unit) return <MembershipProductDeatils discount={discount} />;
  return <UnitProductDetails discount={discount} unit={unit} />;
};

const CheckoutActions = ({ unit, discount, bitPayID, message, handleClick }) => {
  if (message) return <Message message={message} />;

  return (
    <>
      <section>
        <ProductDetails discount={discount} unit={unit} />
        <StripeCheckoutCreateButton handleClick={handleClick} />
        <BitPayCheckoutButton bitPayID={bitPayID} />

        {/* <CoinbaseCommerceButton
        checkoutId={checkoutId}
        // checkoutId={`9d34a029-7038-4e8c-9fbc-3a897ddb0f46`}
        onChargeSuccess={(messageData) => navigate("/checkout/success")}
        onChargeFailure={(messageData) => navigate("/checkout/error")}
        */}
      </section>
    </>
  );
};

export default function CheckoutCreate({ discount, unit, sku, bitPayID, stripePromise }) {
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

  const handleClick = async (event) => {
    const stripe = await stripePromise;
    const data = { sku, discount };

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
      unit={unit}
      bitPayID={bitPayID}
      discount={discount}
      message={message}
      handleClick={handleClick}
    />
  );
}
