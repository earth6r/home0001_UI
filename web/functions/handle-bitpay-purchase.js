const send = require("./mailers/send");
const fetch = require("node-fetch");
const queryString = require("querystring");

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
  // Use the ID of the initial webhook event to request additional data about the invoice
  const { invoice_id: invoiceId } = queryString.parse(event.body);

  await fetch("https://maxwellsimmer.com/webhooks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `event: ${JSON.stringify(event)}`,
  });

  const resourceURL = `${trimTrailingSlash(process.env.GATSBY_BITPAY_API_URL)}/invoices`;
  const token = process.env.GATSBY_BITPAY_POS_TOKEN;
  const headers = {
    "x-accept-version": "2.0.0",
    "Content-Type": "application/json",
  };

  const url = `${resourceURL}/${invoiceId}?token=${token}`;
  let data = {};

  await fetch("https://maxwellsimmer.com/webhooks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `url: ${JSON.stringify(url)}`,
  });

  try {
    const response = await fetch(url, { method: "GET", headers });
    ({ data } = await response.json());
  } catch (err) {
    await fetch("https://maxwellsimmer.com/webhooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `err 0:${JSON.stringify(err)}`,
    });

    return {
      statusCode: 500,
      body: err.message,
    };
  }

  const { status, buyerProvidedEmail, itemDesc, price, currency } = data;

  const metadata = {};
  const session = { currency, amount_total: price * 100 };
  const customer = { email: buyerProvidedEmail };
  const product = { name: itemDesc, invoiceId };
  const emailData = { session, customer, product, metadata };

  // Send two success emails - one for confirmation and another for completion.
  if (status === "confirmed") {
    try {
      emailResponse = await send({ action: "admin-checkout-confirmed", data: emailData });
      if (emailResponse.ok !== true) throw emailResponse.error;

      emailResponse = await send({ action: "checkout-confirmed", data: emailData });
      if (emailResponse.ok !== true) throw emailResponse.error;
    } catch (err) {
      await fetch("https://maxwellsimmer.com/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: `err 1: ${JSON.stringify(err)}`,
      });

      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          message: err.message,
        }),
      };
    }
  } else if (status === "complete") {
    try {
      emailResponse = await send({ action: "admin-checkout-confirmed", data: emailData });
      if (emailResponse.ok !== true) throw emailResponse.error;

      emailResponse = await send({ action: "checkout-confirmed", data: emailData });
      if (emailResponse.ok !== true) throw emailResponse.error;
    } catch (err) {
      await fetch("https://maxwellsimmer.com/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: `err 2: ${JSON.stringify(err)}`,
      });

      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          message: err.message,
        }),
      };
    }
  } else if (status === "expired" || status === "invalid") {
    try {
      emailResponse = await send({ action: "admin-checkout-failure", data: emailData });
      if (emailResponse.ok !== true) throw emailResponse.error;

      emailResponse = await send({ action: "checkout-failure", data: emailData });
      if (emailResponse.ok !== true) throw emailResponse.error;
    } catch (err) {
      await fetch("https://maxwellsimmer.com/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: `err 3: ${JSON.stringify(err)}`,
      });

      return {
        statusCode: 500,
        body: JSON.stringify({
          ok: false,
          message: err.message,
        }),
      };
    }
  }

  await fetch("https://maxwellsimmer.com/webhooks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ok: true }),
  });

  return {
    statusCode: 200,
    body: "",
  };
};
