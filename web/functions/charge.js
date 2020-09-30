// const express = require("express");
// const app = express();
// const { resolve } = require("path");
// This is your real test secret API key.
const stripe = require("stripe")(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

// app.use(express.static("."));
// app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

window.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// app.listen(4242, () => console.log("Node server listening on port 4242!"));

// var stripe = require("stripe")(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

// module.exports.handler = (event, context, callback) => {
//   const requestBody = JSON.parse(event.body);
//   const token = requestBody.token.id;
//   const amount = requestBody.charge.amount;
//   const currency = requestBody.charge.currency;
//   const email = requestBody.charge.email;

//   console.log(token);
//   console.log(email);
//   console.log(currency);
//   console.log(amount);
//   console.log("handler called from netlify");

//   return stripe.charges
//     .create({
//       // Create Stripe charge with token
//       amount,
//       currency,
//       receipt_email: email,
//       description: "Serverless Stripe Test charge",
//       source: token,
//     })
//     .then((charge) => {
//       // Success response
//       const response = {
//         statusCode: 200,
//         body: JSON.stringify({
//           message: `Charge processed succesfully!`,
//           charge,
//         }),
//       };
//       callback(null, response);
//     })
//     .catch((err) => {
//       // Error response
//       const response = {
//         statusCode: 500,
//         body: JSON.stringify({
//           error: err.message,
//         }),
//       };
//       callback(null, response);
//     });
// };
