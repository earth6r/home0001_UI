const send = require("./mailers/send");
const fetch = require("node-fetch");

// https://bitpay.com/api/?javascript#rest-api-resources-invoices-fetch-an-invoice-by-id
// https://bitpay.com/docs/testing
// https://bitpay.com/docs/invoice-webhooks#:~:text=The%20primary%20purpose%20of%20an,Type%3A%20application%2Fjson%20).
// https://bitpay.com/api/?javascript#notifications-webhooks-instant-payment-notifications-invoices

// Make sure to not rely on whitelisting BitPay’s sending IP addresses, as these IP addresses are subject to change without notice.
// Make sure to use HTTPS for your notificationURL.
// BitPay  does not  sign IPNs, so the information in the payload  should not  be trusted outright.
// The IPN shall be used as a trigger to verify the status of a specific invoice. This can be done via the GET /invoices/:invoiceId API endpoint since the invoiceId is provided in the body of the IPN.
// The invoice status paid does not represent a payment guarantee, so merchants should only process an order after the corresponding BitPay invoice has reached the status confirmed or complete. Learn more about BitPay invoice states.
// Merchants who rely on the invoice status confirmed to fulfil orders also need to monitor IPNs for the complete status, as in some cases the IPN for the status confirmed may not be sent (for instance: node outage or network errors).
// The BitPay server expects an HTTP 200 response with an empty body. Any other HTTP response is considered by BitPay as a failed delivery.
// The BitPay server attempts to send IPNs multiple times until the send is either successful or the BitPay server gives up.

const trimTrailingSlash = (url) => url.replace(/\/+$/, "", url);

exports.handler = async (event) => {
  // console.log("event", event);

  const { id: invoiceId } = event;

  const resourceURL = `${trimTrailingSlash(process.env.GATSBY_BITPAY_API_URL)}/invoices`;
  const token = process.env.GATSBY_BITPAY_POS_TOKEN;
  const headers = {
    "x-accept-version": "2.0.0",
    "Content-Type": "application/json",
  };

  const url = `${resourceURL}/${invoiceId}?token=${token}`;

  try {
    const response = await fetch(url, { method: "GET", headers });
    const { data } = await response.json();
    const { status, buyerProvidedEmail, itemDesc, price, currency } = data;

    const metadata = {};
    const session = { currency, amount_total: price * 100, metadata };
    const customer = { email: buyerProvidedEmail };
    const product = { name: itemDesc, invoiceId };
    const emailData = { session, customer, product };

    // if (status === "confirmed" || status === "complete") {
    // TODO should probably be "complete", but that takes ca. 1 hour, and checking for both will fire the email twice
    if (status === "confirmed") {
      send({ action: "admin-checkout-success", data: emailData });
      send({ action: "checkout-success", data: emailData });
    }

    if (status === "expired" || status === "invalid") {
      send({ action: "admin-checkout-failure", data: emailData });
      send({ action: "checkout-failure", data: emailData });
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: `Webook Error: ${err.message}`,
    };
  }

  return {
    statusCode: 200,
    body: "",
  };
};
