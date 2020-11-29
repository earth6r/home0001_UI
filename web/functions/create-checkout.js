/*
 * This function creates a Stripe Checkout session and returns the session ID
 * for use with Stripe.js (specifically the redirectToCheckout method).
 *
 * @see https://stripe.com/docs/payments/checkout/one-time
 */
const { GraphQLClient, gql } = require("graphql-request");
const imageUrlBuilder = require("@sanity/image-url");
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

const builder = imageUrlBuilder({
  projectId: "m8l686jf",
  dataset: "production",
  // projectId: process.env.GATSBY_SANITY_PROJECT_ID || "dsk3cuzk",
  // dataset: process.env.GATSBY_SANITY_DATASET || "production",
});

const buildImageObj = (source = { asset: {} }) => ({
  asset: { _ref: source.asset._id },
});

const imageUrlFor = (source) => builder.image(source);

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
          floorPlan {
            asset {
              _id
            }
          }
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
  const { sku, discount } = JSON.parse(event.body);
  let product;

  // const prevSession = await stripe.checkout.sessions.retrieve(
  //   "cs_test_a16avBuli0UhFqJff8zMkWIB4gx1KCWZiMJOJeJySi3c0gZo3VemJTNZ7O"
  // );

  // const customer = await stripe.customers.retrieve("cus_ITimVU8rpIzWQr");

  // console.log("customer", customer);

  // {
  //   id: 'cs_test_a16avBuli0UhFqJff8zMkWIB4gx1KCWZiMJOJeJySi3c0gZo3VemJTNZ7O',
  //   object: 'checkout.session',
  //   allow_promotion_codes: null,
  //   amount_subtotal: 30000,
  //   amount_total: 30000,
  //   billing_address_collection: 'auto',
  //   cancel_url: 'http://localhost:8888',
  //   client_reference_id: null,
  //   currency: 'usd',
  //   customer: 'cus_ITimVU8rpIzWQr',
  //   customer_email: null,
  //   livemode: false,
  //   locale: null,
  //   metadata: {
  //     items: '[{"sku":"MEMB001","name":"EARTH Membership","quantity":1}]'
  //   },
  //   mode: 'payment',
  //   payment_intent: 'pi_1HslKBEYm5vIOkXEKUSgz4Tn',
  //   payment_method_types: [ 'alipay', 'card' ],
  //   payment_status: 'paid',
  //   setup_intent: null,
  //   shipping: null,
  //   shipping_address_collection: null,
  //   submit_type: null,
  //   subscription: null,
  //   success_url: 'http://localhost:8888/checkout/success',
  //   total_details: { amount_discount: 0, amount_tax: 0 }
  // }

  // console.log("prevSession", prevSession);

  // Handle memberships separately since unnecessary to check if they're available
  if (sku === "MEMB001") {
    product = {
      name: "EARTH Membership",
      description: "Join the collective",
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&h=600&q=80",
      sku,
    };
  } else {
    product = await getUnitByStripeSKU(sku);

    if (!product || product.sold) {
      return {
        statusCode: 422,
        body: JSON.stringify({
          message:
            "The selected product is currently unavailable. Your card has not been charged. Please contact us for more information",
        }),
      };
    }

    product.name = product.title;
    product.description = `Unit ${product.unit}`;
    product.sku = product.stripeSKU;
    product.image = imageUrlFor(buildImageObj(product.floorPlan)).height(300).auto("format").url();
  }

  product.amount = discount ? 20000 : 30000;

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
    cancel_url: `${process.env.SITE_URL}/checkout/cancel`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: product.amount,
          product_data: {
            name: product.name,
            description: product.description,
            images: [product.image],
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
          sku: product.sku,
          name: product.name,
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
