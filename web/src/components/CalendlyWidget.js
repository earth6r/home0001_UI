import React from "react";
import { PopupText } from "react-calendly";

const CalendlyWidget = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return (
    <div className="standard-text">
      <p>
        Thank you.{" "}
        <PopupText
          text="Please choose a convenient time for a phone consultation with a member of the collective."
          url={`https://calendly.com/earthcollective/first-call-with-earth?back=0&month=${year}-${month}&text_color=000000&primary_color=000000`}
        />
      </p>
    </div>
  );
};

export default CalendlyWidget;
