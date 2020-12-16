import React, { useState, useEffect } from "react";
// import getMemberPrice from "../utils/get-member-price";
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";

const StripeCheckoutCreateButton = ({ handleClick }) => (
  <button id="checkout-button" role="link" onClick={handleClick}>
    Checkout with Stripe
  </button>
);

const DiscountNotice = ({ discountCode }) => {
  if (!discountCode) return null;
  return <p>Discount “{discountCode}” applied</p>;
};

const BitPayCheckoutButton = ({ bitPayID }) => (
  <form action={process.env.BITPAY_API_URL} method="post">
    <input type="hidden" name="action" value="checkout" />
    <input type="hidden" name="posData" value="" />
    <input type="hidden" name="data" value={bitPayID} />
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

const MembershipProductDetails = ({ discount, discountCode }) => (
  <div className="product pt-1em pb-1em">
    <div className="description">
      <h3>Membership</h3>
      <h5>
        <Price discount={discount} />
        <DiscountNotice discountCode={discountCode} />
      </h5>
    </div>
  </div>
);

const UnitProductDetails = ({ discount, discountCode, unit }) => (
  <div className="product pt-1/2em pb-1em">
    <img
      className="pb-1em"
      src={imageUrlFor(buildImageObj(unit._rawFloorPlan))
        .height(Math.floor((9 / 16) * 600))
        .auto("format")
        .url()}
      alt={unit.title}
    />
    <div className="description">
      <h3>{unit.title}</h3>
      <h5>
        <Price discount={discount} />
        <DiscountNotice discountCode={discountCode} />
      </h5>
    </div>
  </div>
);

const ProductDetails = ({ discount, discountCode, unit }) => {
  if (!unit) return <MembershipProductDetails discount={discount} discountCode={discountCode} />;
  return <UnitProductDetails discount={discount} discountCode={discountCode} unit={unit} />;
};

const CheckoutActions = ({ unit, discount, discountCode, bitPayID, message, handleClick }) => {
  if (message) return <Message message={message} />;

  return (
    <>
      <section>
        <ProductDetails discount={discount} discountCode={discountCode} unit={unit} />
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

export default function CheckoutCreate({
  discount,
  discountCode,
  unit,
  sku,
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

  const handleClick = async (event) => {
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
      unit={unit}
      bitPayID={bitPayID}
      discount={discount}
      discountCode={discountCode}
      message={message}
      handleClick={handleClick}
    />
  );
}
