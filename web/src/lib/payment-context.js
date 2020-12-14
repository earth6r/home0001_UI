import React from "react";

const defaultValue = { discount: false, discountCode: "" };
const PaymentContext = React.createContext(defaultValue);

export default PaymentContext;
