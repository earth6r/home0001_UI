const nodemailer = require("nodemailer");
const pug = require("pug");
const config = require("./config")(process.env.EMAIL_USERNAME);

const trimTrailingSlash = (url) => url.replace(/\/+$/, "", url);

const layout = `
<!DOCTYPE html>
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title EARTH6r
    style(type="text/css").
      @import url("https://earth6r.com/fonts/fonts.css");

      @media screen {
        * {
          font-family: "GP", Arial, Helvetica, sans-serif !important;
          font-size: 1.625rem;
          line-height: 1.875rem;
          letter-spacing: .01em;
        }
      }

      h1 {
        text-align: center;
      }

  body
`;

// prettier-ignore
const views = {
  "admin-checkout-failure": `
    h1 Failed Purchase

    p #{customer.email} &lt;#{customer.email}&gt; attempted to purchased #{product.name}
      if product.sku
        span #{' '}(SKU #{product.sku})
      else
        span #{' '}(Invoice ID #{product.invoiceId})
      span , but the order could not be processed.

    p An email has been sent to the customer asking them to contact EARTH6r
`,
  "admin-checkout-success": `
    h1 New Purchase
    p #{customer.email} &lt;#{customer.email}&gt; has purchased #{product.name}
      if product.invoiceId
        span #{' '}(Invoice ID #{product.invoiceId})
      else
        span #{' '}(SKU #{product.sku})
    p The order total is #{session.currency.toUpperCase()} #{session.amount_total / 100}
`,
  "admin-checkout-confirmed": `
    h1 New Purchase Confirmation (BitPay)
    p #{customer.email} &lt;#{customer.email}&gt; has been confirmed for their purchase of #{product.name}
      if product.invoiceId
        span #{' '}(Invoice ID #{product.invoiceId})
      else
        span #{' '}(SKU #{product.sku})
    p The order total is #{session.currency.toUpperCase()} #{session.amount_total / 100}
`,
  "admin-checkout-completed": `
    h1 New Purchase Completed (BitPay)
    p #{customer.email} &lt;#{customer.email}&gt; has completed their purchase of #{product.name}
      if product.invoiceId
        span #{' '}(Invoice ID #{product.invoiceId})
      else
        span #{' '}(SKU #{product.sku})
    p The order total is #{session.currency.toUpperCase()} #{session.amount_total / 100}
`,
  "checkout-failure": `
    p We were unable to process your payment for your EARTH membership. Please take a moment to complete the checkout process again and double-check your billing information.
    p Click
      a(href="https://earth6r.com/collective") here
      span to begin the checkout process again.
    p If you have any questions about your checkout, reply to this email and we'll get right back to you.
`,
  "checkout-success": `
    h1 Deposit received — thank you.
    p You are now a member — part of the collective. We’ll keep you updated as new homes and new locations become available. When you’re ready, schedule a consultation with our team to ask questions, make plans, secure financing and complete your purchase.
`,
  "checkout-confirmed": `
    h1 Welcome to Earth.
    p Your deposit is currently pending. You'll soon be a member — part of the collective. Once your payment is verified, you'll receive a confirmation email with your receipt. You can expect confirmation within the next six hours. We'll keep you posted.
`,
  "checkout-completed": `
    h1 Your transaction has been verified, and is now complete.
    p You are now a member — part of the collective. We’ll keep you updated as new homes and new locations become available. When you’re ready, schedule a consultation with our team to ask questions, make plans, secure financing and complete your purchase.
    p You can follow the link below to connect with our team.
      br
      br
      a(href="https://calendly.com/earthcollective/first-call-with-earth") Schedule a consultation
`,
  "checkout-receipt": `
    h1 Deposit received — thank you.
    p Your payment's been verified. Please save this email for your records.

    if product.invoiceId
      p Receipt #{product.invoiceId}

    p The deposit amount is #{session.currency.toUpperCase()} #{session.amount_total / 100}
    p If you have any questions, feel free to reply to this email and we'll get right back to you.
`,
  "schedule-success": `
    p Your meeting has been scheduled.
`,
  "admin-schedule-success": `
    p A meeting has been scheduled with #{customer.name} &lt;#{customer.email}&gt;.
`,
};

module.exports = async function send(event) {
  const { action, data } = event;
  const settings = config(action)(data);

  // Compile template.pug, and render a set of data
  const view = views[action];
  const template = pug.compile(`${layout}${view}`);
  const html = template(settings.templateOptions);

  // Strip tags and add newlines for text content
  const text = html
    .replace(/(?:.*<body>|<\/body>*)/g, "")
    .replace(/<\/\w+?>/g, "\n")
    .replace(/<\/?[^>]+?>/g, "");

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Send mail with defined transport object
  try {
    const info = await transporter.sendMail(
      Object.assign({ html, text }, settings.transporterOptions)
    );

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    const etherealTestEnv = /ethereal/.test(process.env.EMAIL_HOST);

    const body = JSON.stringify(
      etherealTestEnv
        ? {
            messageId: info.messageId,
            previewURL: nodemailer.getTestMessageUrl(info),
          }
        : {}
    );

    return {
      ok: true,
      body,
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
};
