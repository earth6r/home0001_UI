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
          font-family: "FolioBT", Arial, Helvetica, sans-serif !important;
          font-size: 33px;
          line-height: 120%;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      }

      body {
        background-color: red;
        margin: 0;
        color: white;
      }

      header {
        background-color: white;
      }
      svg {
        max-height: 300px;

        margin: 0 auto; /* poor attempt at centering */

        height: auto !important; /* overrides inline */
        width: auto!important; /* overrides inline */ 
        
        display: block;
        max-width: 100%;
      }
      .earth-svg {
        width: 46.68px;
        padding: 25px;
      }

      .main-text {
       padding-left: 23%;
       padding-right: 23%;
      }
      a {
          font-size: 20px;
          line-height: 120%;
          color: white;
      }

      footer p {
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        align: center;
        margin: 0;
      }
      footer a {
        color: red;
        background-color: red;
      }
      .social-box-footer {
        max-height: 300px;

        margin: 0 auto; /* poor attempt at centering */

        height: auto !important; /* overrides inline */
        width: 95px !important; /* overrides inline */ 
        
        display: block;
        max-width: 100%;
        padding-top: 20px;
        padding-bottom: 60px;

        background-color: red;
      }
      .social-logo {
        display: inline-block;
        padding-left: 8px;
        padding-right: 8px;
      }

  body
    header 
      a(href="https://www.earth6r.com") 
        svg(
          class="earth-svg",
          width="47",
          height="11", 
          viewBox="0 0 47 11", 
          fill="none", 
          xmlns="http://www.w3.org/2000/svg"
        )
          path(
            d="M0.324219 11H8.23422V8.95598H2.70422V6.53399H7.40822V4.64398H2.70422V2.57198H8.13622V0.583984H0.324219V11Z", 
            fill="#FF0000"
          )
          path(
            d="M9.38113 11H11.7751L12.4191 9.01198H16.1991L16.8571 11H19.3771L15.6111 0.583984H13.1331L9.38113 11ZM13.6231 5.35798C13.9591 4.33598 14.3231 2.58598 14.3231 2.58598H14.3511C14.3511 2.58598 14.5751 3.92999 15.0231 5.35798L15.6531 7.30398H12.9791L13.6231 5.35798Z", 
            fill="#FF0000"
          )
          path(
            d="M20.8517 11H23.2317V7.02398H24.9957C26.1437 7.02398 26.6617 7.55598 26.7877 8.59198C26.9137 9.73998 26.8857 10.846 27.1657 11H29.5177V10.888C29.1817 10.748 29.2657 9.57199 29.0697 8.15798C28.9297 7.03798 28.4677 6.46398 27.4317 6.14198V6.09998C28.7617 5.66598 29.3637 4.78398 29.3637 3.56598C29.3637 1.66198 27.8377 0.583984 25.8077 0.583984H20.8517V11ZM23.2317 2.47398H25.4157C26.4657 2.47398 26.9837 3.03398 26.9837 3.88798C26.9837 4.71398 26.4097 5.25998 25.3457 5.25998H23.2317V2.47398Z", 
            fill="#FF0000"
          )
          path(
            d="M30.7072 2.61398H33.8012V11H36.1952V2.61398H39.3032V0.583984H30.7072V2.61398Z", 
            fill="#FF0000"
          )
          path(
            d="M40 6.63198V4.64398L44.62 4.60198V0.583984H47V11H44.62V6.58998L40 6.63198Z", 
            fill="#FF0000"
          )
    div(class="main-text")
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
      p Welcome to Earth.
      p We’re happy that you’ve joined us on our journey to build a planetary housing network. We’ll keep you updated as new homes and new locations become available. When you’re ready to buy, just schedule a consultation with our team to make plans, secure financing and complete your purchase. You can follow the link below to connect with our team at your convenience. 
      a(
        class="schedule-link",
        href="https://calendly.com/earthcollective/first-call-with-earth"
      ) Schedule a consultation
`,
  "checkout-confirmed": `
      p Welcome to Earth.
      p Your deposit is currently pending. You'll soon be a member — part of the collective. Once your payment is verified, you'll receive a confirmation email with your receipt. You can expect confirmation within the next six hours. We'll keep you posted.
`,
  "checkout-completed": `
      p Your transaction has been verified, and is now complete.
      p We’re happy that you’ve joined us on our journey to build a planetary housing network. We’ll keep you updated as new homes and new locations become available. When you’re ready to buy, just schedule a consultation with our team to make plans, secure financing and complete your purchase. You can follow the link below to connect with our team at your convenience. 
      a(
        class="schedule-link",
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
      footer 
        a(href="https://www.earth6r.com") 
          svg(
            class="earth-svg",
            width="47",
            height="11", 
            viewBox="0 0 47 11", 
            fill="none", 
            xmlns="http://www.w3.org/2000/svg"
          )
            path(
              d="M0.324219 11H8.23422V8.95598H2.70422V6.53399H7.40822V4.64398H2.70422V2.57198H8.13622V0.583984H0.324219V11Z", 
              fill="#FFFFFF"
            )
            path(
              d="M9.38113 11H11.7751L12.4191 9.01198H16.1991L16.8571 11H19.3771L15.6111 0.583984H13.1331L9.38113 11ZM13.6231 5.35798C13.9591 4.33598 14.3231 2.58598 14.3231 2.58598H14.3511C14.3511 2.58598 14.5751 3.92999 15.0231 5.35798L15.6531 7.30398H12.9791L13.6231 5.35798Z", 
              fill="#FFFFFF"
            )
            path(
              d="M20.8517 11H23.2317V7.02398H24.9957C26.1437 7.02398 26.6617 7.55598 26.7877 8.59198C26.9137 9.73998 26.8857 10.846 27.1657 11H29.5177V10.888C29.1817 10.748 29.2657 9.57199 29.0697 8.15798C28.9297 7.03798 28.4677 6.46398 27.4317 6.14198V6.09998C28.7617 5.66598 29.3637 4.78398 29.3637 3.56598C29.3637 1.66198 27.8377 0.583984 25.8077 0.583984H20.8517V11ZM23.2317 2.47398H25.4157C26.4657 2.47398 26.9837 3.03398 26.9837 3.88798C26.9837 4.71398 26.4097 5.25998 25.3457 5.25998H23.2317V2.47398Z", 
              fill="#FFFFFF"
            )
            path(
              d="M30.7072 2.61398H33.8012V11H36.1952V2.61398H39.3032V0.583984H30.7072V2.61398Z", 
              fill="#FFFFFF"
            )
            path(
              d="M40 6.63198V4.64398L44.62 4.60198V0.583984H47V11H44.62V6.58998L40 6.63198Z", 
              fill="#FFFFFF"
            )
        p © Earth 2021
        p 85 Delancey Street, New York, NY 10002 | 360 East 2nd Street, Los Angeles, CA 90012
        div(class="social-box-footer")
          a(href="https://www.twitter.com/earth6r")
            svg(
              class="social-logo"
              height="25",
              viewBox="328 355 335 276", 
              xmlns="http://www.w3.org/2000/svg"
            )
              title twitter
              path(
                d="M 630, 425 A 195, 195 0 0 1 331, 600 A 142, 142 0 0 0 428, 570 A  70,  70 0 0 1 370, 523  A  70,  70 0 0 0 401, 521 A  70,  70 0 0 1 344, 455 A  70,  70 0 0 0 372, 460 A  70,  70 0 0 1 354, 370 A 195, 195 0 0 0 495, 442 A  67,  67 0 0 1 611, 380 A 117, 117 0 0 0 654, 363 A  65,  65 0 0 1 623, 401 A 117, 117 0 0 0 662, 390 A  65,  65 0 0 1 630, 425 Z",
                fill="#FFFFFF"
              )
          a(href="https://www.instagram.com/earth6r/") 
            svg(
              class="social-logo",
              xmlns="http://www.w3.org/2000/svg",
              width="25",
              height="25",
              viewBox="0 0 256 256"
            )
              title Instagram
              path(
                d="M127.999746,23.06353 C162.177385,23.06353 166.225393,23.1936027 179.722476,23.8094161 C192.20235,24.3789926 198.979853,26.4642218 203.490736,28.2166477 C209.464938,30.5386501 213.729395,33.3128586 218.208268,37.7917319 C222.687141,42.2706052 225.46135,46.5350617 227.782844,52.5092638 C229.535778,57.0201472 231.621007,63.7976504 232.190584,76.277016 C232.806397,89.7746075 232.93647,93.8226147 232.93647,128.000254 C232.93647,162.177893 232.806397,166.225901 232.190584,179.722984 C231.621007,192.202858 229.535778,198.980361 227.782844,203.491244 C225.46135,209.465446 222.687141,213.729903 218.208268,218.208776 C213.729395,222.687649 209.464938,225.461858 203.490736,227.783352 C198.979853,229.536286 192.20235,231.621516 179.722476,232.191092 C166.227425,232.806905 162.179418,232.936978 127.999746,232.936978 C93.8200742,232.936978 89.772067,232.806905 76.277016,232.191092 C63.7971424,231.621516 57.0196391,229.536286 52.5092638,227.783352 C46.5345536,225.461858 42.2700971,222.687649 37.7912238,218.208776 C33.3123505,213.729903 30.538142,209.465446 28.2166477,203.491244 C26.4637138,198.980361 24.3784845,192.202858 23.808908,179.723492 C23.1930946,166.225901 23.0630219,162.177893 23.0630219,128.000254 C23.0630219,93.8226147 23.1930946,89.7746075 23.808908,76.2775241 C24.3784845,63.7976504 26.4637138,57.0201472 28.2166477,52.5092638 C30.538142,46.5350617 33.3123505,42.2706052 37.7912238,37.7917319 C42.2700971,33.3128586 46.5345536,30.5386501 52.5092638,28.2166477 C57.0196391,26.4642218 63.7971424,24.3789926 76.2765079,23.8094161 C89.7740994,23.1936027 93.8221066,23.06353 127.999746,23.06353 M127.999746,0 C93.2367791,0 88.8783247,0.147348072 75.2257637,0.770274749 C61.601148,1.39218523 52.2968794,3.55566141 44.1546281,6.72008828 C35.7374966,9.99121548 28.5992446,14.3679613 21.4833489,21.483857 C14.3674532,28.5997527 9.99070739,35.7380046 6.71958019,44.1551362 C3.55515331,52.2973875 1.39167714,61.6016561 0.769766653,75.2262718 C0.146839975,88.8783247 0,93.2372872 0,128.000254 C0,162.763221 0.146839975,167.122183 0.769766653,180.774236 C1.39167714,194.398852 3.55515331,203.703121 6.71958019,211.845372 C9.99070739,220.261995 14.3674532,227.400755 21.4833489,234.516651 C28.5992446,241.632547 35.7374966,246.009293 44.1546281,249.28042 C52.2968794,252.444847 61.601148,254.608323 75.2257637,255.230233 C88.8783247,255.85316 93.2367791,256 127.999746,256 C162.762713,256 167.121675,255.85316 180.773728,255.230233 C194.398344,254.608323 203.702613,252.444847 211.844864,249.28042 C220.261995,246.009293 227.400247,241.632547 234.516143,234.516651 C241.632039,227.400755 246.008785,220.262503 249.279912,211.845372 C252.444339,203.703121 254.607815,194.398852 255.229725,180.774236 C255.852652,167.122183 256,162.763221 256,128.000254 C256,93.2372872 255.852652,88.8783247 255.229725,75.2262718 C254.607815,61.6016561 252.444339,52.2973875 249.279912,44.1551362 C246.008785,35.7380046 241.632039,28.5997527 234.516143,21.483857 C227.400247,14.3679613 220.261995,9.99121548 211.844864,6.72008828 C203.702613,3.55566141 194.398344,1.39218523 180.773728,0.770274749 C167.121675,0.147348072 162.762713,0 127.999746,0 Z M127.999746,62.2703115 C91.698262,62.2703115 62.2698034,91.69877 62.2698034,128.000254 C62.2698034,164.301738 91.698262,193.730197 127.999746,193.730197 C164.30123,193.730197 193.729689,164.301738 193.729689,128.000254 C193.729689,91.69877 164.30123,62.2703115 127.999746,62.2703115 Z M127.999746,170.667175 C104.435741,170.667175 85.3328252,151.564259 85.3328252,128.000254 C85.3328252,104.436249 104.435741,85.3333333 127.999746,85.3333333 C151.563751,85.3333333 170.666667,104.436249 170.666667,128.000254 C170.666667,151.564259 151.563751,170.667175 127.999746,170.667175 Z M211.686338,59.6734287 C211.686338,68.1566129 204.809755,75.0337031 196.326571,75.0337031 C187.843387,75.0337031 180.966297,68.1566129 180.966297,59.6734287 C180.966297,51.1902445 187.843387,44.3136624 196.326571,44.3136624 C204.809755,44.3136624 211.686338,51.1902445 211.686338,59.6734287 Z",
                fill="#FFFFFF"
              )
`;

module.exports = async function send(event) {
  const { action, data } = event;
  const settings = config(action)(data);

  // Compile template.pug, and render a set of data
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
