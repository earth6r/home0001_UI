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
      @import url("https://earth6r.com/fonts/fonts.css"); @media screen {* {font-family: "FolioBT", Arial, Helvetica, sans-serif !important; font-size: 20px; line-height: 120%; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;} .main-text {padding-left: 5% !important; padding-right: 5% !important;}} @media screen and (min-width: 640px) {* {font-family: "FolioBT", Arial, Helvetica, sans-serif !important; font-size: 33px; line-height: 120%; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;} .main-text {padding-left: 23% !important; padding-right: 23% !important;}}

  body(style="background-color: red; margin: 0; color: white; font-family: Arial, Helvetica, sans-serif; font-size: 20px; line-height: 120%; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;")
    div(style="background-color: white;") 
      a(style="color: white;", href="https://www.earth6r.com") 
        img(
          style="max-height: 300px; margin: 0 auto; height: auto !important; width: 46.68px!important; padding: 25px; display: block; max-width: 100%;",
          src="http://www.earth6r.com/logos/earth-logo.png"
          width="47",
          height="11", 
          alt="Earth Logo"
        )
    div(style="padding-left: 10%; padding-right: 10%;", class="main-text")
      br
`;

// prettier-ignore
const views = {
  "admin-checkout-failure": `
      p Failed Purchase

      p #{customer.email} &lt;#{customer.email}&gt; attempted to purchase #{product.name}
        if product.sku
          span #{' '}(SKU #{product.sku})
        else
          span #{' '}(Invoice ID #{product.invoiceId})
        span , but the order could not be processed.

      p An email has been sent to the customer asking them to contact EARTH6r
`,
  "admin-checkout-success": `
      p New Purchase
      p #{customer.email} &lt;#{customer.email}&gt; has purchased #{product.name}
        if product.invoiceId
          span #{' '}(Invoice ID #{product.invoiceId})
        else
          span #{' '}(SKU #{product.sku})
      p The order total is #{session.currency.toUpperCase()} #{session.amount_total / 100}
`,
  "admin-checkout-confirmed": `
      p New Purchase Confirmation (BitPay)
      p #{customer.email} &lt;#{customer.email}&gt; has been confirmed for their purchase of #{product.name}
        if product.invoiceId
          span #{' '}(Invoice ID #{product.invoiceId})
        else
          span #{' '}(SKU #{product.sku})
      p The order total is #{session.currency.toUpperCase()} #{session.amount_total / 100}
`,
  "admin-checkout-completed": `
      p New Purchase Completed (BitPay)
      p #{customer.email} &lt;#{customer.email}&gt; has completed their purchase of #{product.name}
        if product.invoiceId
          span #{' '}(Invoice ID #{product.invoiceId})
        else
          span #{' '}(SKU #{product.sku})
      p The order total is #{session.currency.toUpperCase()} #{session.amount_total / 100}
`,
  "checkout-failure": `
      p We were unable to process your payment for your Earth membership. Please take a moment to complete the checkout process again and double-check your billing information.
      p Click 
        a(href="https://staging.earth6r.com/checkout/membership") here
        span  to begin the checkout process again.
      p If you have any questions, feel free to reply to this email and we'll get right back to you.
`,
  "checkout-success": `
      p We’re happy that you’ve joined us on our journey to build a planetary housing network. We’ll keep you updated as new homes and new locations become available. 
      p When you’re ready to buy, just follow the link below to schedule a consultation with our team at your convenience. We’ll help you make plans, secure financing and complete your purchase.
      a(
        style="color: white; font-size: 20px; line-height: 120%;",
        href="https://calendly.com/earthcollective/first-call-with-earth"
      ) Schedule a consultation
`,
  "checkout-confirmed": `
      p Your deposit is currently pending. You'll soon be a member — part of the collective. Once your payment is verified, you'll receive a confirmation email with your receipt. You can expect confirmation within the next six hours. We'll keep you posted.
`,
  "checkout-completed": `
      p Your transaction has been verified, and is now complete.
      p We’re happy that you’ve joined us on our journey to build a planetary housing network. We’ll keep you updated as new homes and new locations become available. 
      p When you’re ready to buy, just follow the link below to schedule a consultation with our team at your convenience. We’ll help you make plans, secure financing and complete your purchase.
      a(
        style="color: white; font-size: 20px; line-height: 120%;",
        href="https://calendly.com/earthcollective/first-call-with-earth"
      ) Schedule a consultation
`,
  "checkout-receipt": `
      p Deposit received — thank you.
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

const footer = `
      br
      br
      br
      div 
        a(style="color: red; background-color: red;", href="https://www.earth6r.com") 
          img(
            style="max-height: 300px; margin: 0 auto; height: auto !important; width: 46.68px!important; padding: 25px; display: block; max-width: 100%;",
            src="http://www.earth6r.com/logos/earth-logo-white.png",
            width="47",
            height="11", 
            alt="Earth Logo"
          )
        p(style="text-align: center; font-size: 14px; line-height: 20px; align: center; margin: 0;") © Earth 2021
        p(style="text-align: center; font-size: 14px; line-height: 20px; align: center; margin: 0;") 85 Delancey Street, New York, NY 10002 
        p(style="text-align: center; font-size: 14px; line-height: 20px; align: center; margin: 0;") 360 East 2nd Street, Los Angeles, CA 90012
        div(style="max-height: 300px; margin: 0 auto; height: auto !important; width: 100px !important; display: block; max-width: 100%; padding-top: 20px; padding-bottom: 60px; background-color: red;")
          a(style="color: red; background-color: red;", href="https://www.twitter.com/earth6r")
            img(
              style="display: inline-block; padding-left: 8px; padding-right: 8px;",
              src="http://www.earth6r.com/logos/twitter-logo.png",
              height="25",
              alt="Twitter Logo", 
            )
          a(style="color: red; background-color: red;", href="https://www.instagram.com/earth6r/") 
            img(
              style="display: inline-block; padding-left: 8px; padding-right: 8px;",
              src="http://www.earth6r.com/logos/insta-logo.png",
              width="25",
              height="25",
              alt="Instagram Logo"
            )
`;

module.exports = async function send(event) {
  const { action, data } = event;
  const settings = config(action)(data);

  // Compile template.pug, and render a set of data
  // Sandwich the specific email between the top and bottom of the template
  const view = views[action];
  const template = pug.compile(`${layout}${view}${footer}`);
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
