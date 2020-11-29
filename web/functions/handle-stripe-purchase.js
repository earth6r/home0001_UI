const stripe = require("stripe")(process.env.GATSBY_STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
  maxNetworkRetries: 2,
});
const send = require("./mailers/send");

// Find your endpoint's secret in your Dashboard's webhook settings
// stripe listen --forward-to localhost:8888/.netlify/functions/handle-stripe-purchase
const endpointSecret = "whsec_Uid33Tu81tbSr4knrQyuFHXeRVb58Vk8";

exports.handler = async ({ body, headers }) => {
  const payload = body;
  const sig = headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        ok: false,
        message: `Webhook Error: ${err.message}`,
      }),
    };
  }

  // Handle the checkout.session.completed event
  switch (event.type) {
    case "checkout.session.completed": {
      // The customer has successfully authorized the debit payment by submitting the Checkout form.
      // Wait for the payment to succeed or fail.
      const session = event.data.object;

      // console.log("checkout.session.completed", session);

      const { customer: id, metadata } = session;
      const customer = await stripe.customers.retrieve(id);
      const data = { session, customer, product: JSON.parse(metadata.items)[0] };

      // Save an order in your database, marked as 'awaiting payment'
      // createOrder(session);

      // Check if the order is paid (e.g., from a card payment)
      //
      // A delayed notification payment will have an `unpaid` status, as
      // you're still waiting for funds to be transferred from the customer's
      // account.
      if (session.payment_status === "paid") {
        send({ action: "admin-checkout-success", data });
        send({ action: "checkout-success", data });
      }

      break;
    }

    case "checkout.session.async_payment_succeeded": {
      // The customer’s payment succeeded.
      // Fulfill the purchased goods or services.
      const session = event.data.object;

      // console.log("checkout.session.async_payment_succeeded", session);

      const { customer: id, metadata } = session;
      const customer = await stripe.customers.retrieve(id);
      const data = { session, customer, product: JSON.parse(metadata.items)[0] };

      send({ action: "admin-checkout-success", data });
      send({ action: "checkout-success", data });

      break;
    }

    case "checkout.session.async_payment_failed": {
      // The payment was declined, or failed for some other reason.
      // Contact the customer via email and request that they place a new order.
      const session = event.data.object;

      console.log("checkout.session.async_payment_failed", session);

      // Send an email to the customer asking them to retry their order
      const { customer: id, metadata } = session;
      const customer = await stripe.customers.retrieve(id);
      const data = { session, customer, product: JSON.parse(metadata.items)[0] };

      send({ action: "admin-checkout-failure", data });
      send({ action: "checkout-failure", data });

      break;
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
};
