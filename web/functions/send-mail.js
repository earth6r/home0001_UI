const nodemailer = require("nodemailer");
const pug = require("pug");
const fs = require("fs");

exports.handler = async (event) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // TODO send to admin ...

  // Compile template.pug, and render a set of data
  const actions = new Set(["checkout-success"]); // TOOD if !actions.has(action) ...
  const action = "checkout-success"; // TODO from `event`
  const filename = require.resolve(`./mailers/${action}.pug`);
  const html = pug.render(fs.readFileSync(filename), {
    filename,
    name: "Timothy",
    email: "tim@foo.com",
    product: {
      name: "Test Product",
    },
  });

  const text = html
    .replace(/(?:.*<body>|<\/body>*)/g, "")
    .replace(/<\/\w+?>/g, "\n")
    .replace(/<\/?[^>]+?>/g, "");

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "loma.trantow78@ethereal.email",
      pass: "pSff3584K3u39TtGvD",
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text, //: "Hello world?", // plain text body
    html, //: "<b>Hello world?</b>", // html body
  });

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
