const send = require("./mailers/send");

/**
 *
 * type Event = {
 *  action: 'checkout-success' | 'admin-checkout-success'
 *  data: {}
 * }
 */

exports.handler = async (event /*: Event */) => {
  const response = await send(event);

  if (!response.ok) {
    return {
      statusCode: 422,
      error: response.error,
    };
  }

  return {
    statusCode: 200,
    body: response.body,
  };
};
