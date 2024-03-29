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
        subject: "Welcome to Earth",
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
        subject: "A transaction has been successfully completed",
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
        subject: "Payment Failed",
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
        subject: "A transaction has failed",
      },
    };
  };

  this["admin-schedule-success"] = function (opts) {
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
        subject: "An event has been scheduled",
      },
    };
  };

  this["schedule-success"] = function (opts) {
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
        subject: "Your meeting with EARTH",
      },
    };
  };

  this["checkout-confirmed"] = function (opts) {
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
        subject: "Welcome to Earth",
      },
    };
  };

  this["admin-checkout-confirmed"] = function (opts) {
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
        subject: "A transaction has been confirmed",
      },
    };
  };

  this["checkout-completed"] = function (opts) {
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
        subject: "Welcome to Earth",
      },
    };
  };

  this["checkout-receipt"] = function (opts) {
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
        subject: "Your deposit has been received",
      },
    };
  };

  this["admin-checkout-completed"] = function (opts) {
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
        subject: "A transaction has been completed",
      },
    };
  };

  return function (action) {
    return this[action];
  };
};
