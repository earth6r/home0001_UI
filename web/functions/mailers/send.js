const nodemailer = require("nodemailer");
const pug = require("pug");
const config = require("./config")(process.env.EMAIL_USERNAME);

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

const views = {
  "admin-checkout-failure": `
    h1 Failed Purchase

    p #{customer.email} <#{customer.email}> attempted to purchased #{product.name}
      if product.sku
        span #{' '}(SKU #{product.sku})
      else
        span #{' '}(Invoice ID #{product.invoiceId})
      span , but the order could not be processed.

    p An email has been sent to the customer asking them to contact EARTH6r
`,
  "admin-checkout-success": `
    h1 New Purchase
    p #{customer.email} <#{customer.email}> has purchased #{product.name}
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

    if metadata.postscript
      p #{metadata.postscript}
`,
  "schedule-success": `
    p Your meeting has been scheduled.
`,
  "admin-schedule-success": `
    p A meeting has been scheduled with #{customer.name} <#{customer.email}>.
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

    return {
      ok: true,
      body: JSON.stringify({
        messageId: info.messageId,
        previewURL: nodemailer.getTestMessageUrl(info),
      }),
    };
  } catch (err) {
    return {
      ok: false,
      error: err,
    };
  }
};
