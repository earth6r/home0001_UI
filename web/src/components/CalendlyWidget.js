import React from "react";
import { CalendlyEventListener, PopupText } from "react-calendly";
import { navigate } from "@reach/router";

const CalendlyWidget = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  // https://calendly.stoplight.io/docs/embed-api-docs/docs/C-Notifying-the-parent-window.md
  const handleEventScheduled = (e) => {
    // console.log("EventScheduled", e);

    navigate("/checkout/scheduled");
  };

  return (
    <div className="standard-text">
      <p>
        <CalendlyEventListener onEventScheduled={handleEventScheduled}>
          Thank you.{" "}
          <PopupText
            text="Please choose a convenient time for a phone consultation with a member of the collective."
            url={`https://calendly.com/earthcollective/first-call-with-earth?back=0&month=${year}-${month}&text_color=000000&primary_color=000000`}
          />
        </CalendlyEventListener>
      </p>
    </div>
  );
};

export default CalendlyWidget;
