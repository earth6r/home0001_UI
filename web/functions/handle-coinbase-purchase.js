const send = require("./mailers/send");

exports.handler = async (event) => {
  console.log("event", event);

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
};
