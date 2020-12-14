import React from "react";
import { PopupText } from "react-calendly";

const CalendlyWidget = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return (
    <PopupText
      text="Click here to schedule a time to discuss your purchase"
      url={`https://calendly.com/earthcollective/first-call-with-earth?back=0&month=${year}-${month}&text_color=000000&primary_color=000000`}
    />
  );
};

export default CalendlyWidget;
