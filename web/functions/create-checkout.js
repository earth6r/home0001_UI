/*
 * This function creates a Stripe Checkout session and returns the session ID
 * for use with Stripe.js (specifically the redirectToCheckout method).
 *
 * @see https://stripe.com/docs/payments/checkout/one-time
 */
const { GraphQLClient, gql } = require("graphql-request");
const stripe = require("stripe")(process.env.GATSBY_STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
  maxNetworkRetries: 2,
});

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */

// const inventory = require("./data/products.json");

async function getUnitByStripeSKU(sku) {
  if (!sku) return null;

  const endpoint = process.env.SANITY_GRAPHQL_API_ENDPOINT;
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: { authorization: `Bearer ${process.env.SANITY_READ_TOKEN}` },
  });

  const query = gql`
    {
      allHome {
        units {
          title
          sold
          stripeSKU
          unit
        }
      }
    }
  `;

  const response = await graphQLClient.request(query);
  const { allHome: edges } = response;

  if (!edges.length) return null;

  const unit = edges
    .reduce((acc, curr) => acc.concat(curr.units), [])
    .find((unit) => unit.stripeSKU === sku);

  return unit && !unit.sold ? unit : null;
}

exports.handler = async (event) => {
  const { sku, discount /*, quantity */ } = JSON.parse(event.body);
  const product = await getUnitByStripeSKU(sku);

  if (!product || product.sold) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message:
          "The selected product is currently unavailable. Your card has not been charged. Please contact us for more information",
      }),
    };
  }

  const regularPrice = 30000;
  const amount = discount ? 200 : regularPrice;
  const description = `Unit ${product.unit}`;

  // TODO if membership ...

  // const product = inventory.find((p) => p.sku === sku);

  // ensure that the quantity is within the allowed range
  // const validatedQuantity = quantity > 0 && quantity < 11 ? quantity : 1;
  const validatedQuantity = 1;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    // With Stripe Checkout, Apple Pay and Google Pay are automatically enabled.
    // alipay, card, ideal, fpx, bacs_debit, bancontact, giropay, p24, eps, sofort, sepa_debit, or grabpay
    payment_method_types: ["alipay", "card"],
    billing_address_collection: "auto",

    // shipping_address_collection: {
    //   allowed_countries: ["US", "CA"],
    // },

    /*
     * This env var is set by Netlify and inserts the live site URL. If you want
     * to use a different URL, you can hard-code it here or check out the
     * other environment variables Netlify exposes:
     * https://docs.netlify.com/configure-builds/environment-variables/
     */
    success_url: `${process.env.SITE_URL}/checkout/success`,
    cancel_url: process.env.SITE_URL,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: product.title,
            description: description,
            // images: [product.image],
          },
        },
        quantity: validatedQuantity,
      },
    ],
    // We are using the metadata to track which items were purchased.
    // We can access this meatadata in our webhook handler to then handle
    // the fulfillment process.
    // In a real application you would track this in an order object in your database.
    metadata: {
      items: JSON.stringify([
        {
          sku: product.stripeSKU,
          name: product.title,
          quantity: validatedQuantity,
        },
      ]),
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
      publishableKey: process.env.GATSBY_STRIPE_PUBLISHABLE_KEY,
    }),
  };
};
