module.exports = function (emailUsername) {
  const defaults = {
    from: `"EARTH6r" <${emailUsername}>`,
  };

  const from = defaults.from;

  this["checkout-success"] = function (opts) {
    return {
      templateOptions: {
        name: opts.name,
        email: opts.email,
        product: opts.product,
      },
      transporterOptions: {
        from,
        to: opts.email,
        subject: "Thank you for your purchase",
      },
    };
  };

  this["admin-checkout-success"] = function (opts) {
    return {
      templateOptions: {
        name: opts.name,
        email: opts.email,
        product: opts.product,
      },
      transporterOptions: {
        from,
        to: defaults.from,
        subject: "A unit has been purchased",
      },
    };
  };

  return function (action) {
    return this[action];
  };
};
