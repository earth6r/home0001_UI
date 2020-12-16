module.exports = function (emailUsername) {
  const defaults = {
    from: `"EARTH6r" <${emailUsername}>`,
  };

  const from = defaults.from;

  this["checkout-success"] = function (opts) {
    return {
      templateOptions: {
        session: opts.session,
        customer: opts.customer,
        product: opts.product,
        metadata: opts.metadata,
      },
      transporterOptions: {
        from,
        to: opts.customer.email,
        subject: "Thank you for your purchase",
      },
    };
  };

  this["admin-checkout-success"] = function (opts) {
    return {
      templateOptions: {
        session: opts.session,
        customer: opts.customer,
        product: opts.product,
        metadata: opts.metadata,
      },
      transporterOptions: {
        from,
        to: defaults.from,
        subject: "A unit has been purchased",
      },
    };
  };

  this["checkout-failure"] = function (opts) {
    return {
      templateOptions: {
        session: opts.session,
        customer: opts.customer,
        product: opts.product,
        metadata: opts.metadata,
      },
      transporterOptions: {
        from,
        to: opts.customer.email,
        subject: "There was a problem with your order",
      },
    };
  };

  this["admin-checkout-failure"] = function (opts) {
    return {
      templateOptions: {
        session: opts.session,
        customer: opts.customer,
        product: opts.product,
        metadata: opts.metadata,
      },
      transporterOptions: {
        from,
        to: defaults.from,
        subject: "There was a problem with an order",
      },
    };
  };

  return function (action) {
    return this[action];
  };
};
