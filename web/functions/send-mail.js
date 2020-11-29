const nodemailer = require("nodemailer");
const pug = require("pug");
const fs = require("fs");
const config = require("./mailers/config")(process.env.EMAIL_USERNAME);

exports.handler = async (/*event*/) => {
  const event = {
    action: "admin-checkout-success",
    data: {
      name: "Timothy",
      email: "tim@foo.com",
      product: {
        name: "Test Product",
      },
    },
  };

  const { action, data } = event;
  const settings = config(action)(data);

  // Compile template.pug, and render a set of data
  const filename = require.resolve(`./mailers/${action}.pug`);
  const html = pug.render(
    fs.readFileSync(filename),
    Object.assign({ filename }, settings.templateOptions)
  );

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
  const info = await transporter.sendMail(
    Object.assign({ html, text }, settings.transporterOptions)
  );

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  return {
    statusCode: 200,
    body: JSON.stringify({
      messageId: info.messageId,
      previewURL: nodemailer.getTestMessageUrl(info),
    }),
  };
};
