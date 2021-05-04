import React from "react";
import { CalendlyEventListener, PopupText } from "react-calendly";
import { navigate } from "@reach/router";

const CalendlyContact = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  // https://help.calendly.com/hc/en-us/articles/223195488-Webhooks
  // https://calendly.stoplight.io/docs/embed-api-docs/docs/C-Notifying-the-parent-window.md
  const handleEventScheduled = (e) => {
    // console.log("EventScheduled", e);

    navigate("/checkout/scheduled");
  };

  return (
    <div className="standard-text calendly-contact">
      <p>
        <CalendlyEventListener onEventScheduled={handleEventScheduled}>
         Or, {" "}
          <PopupText
            text="schedule a call"
            url={`https://calendly.com/earthcollective/first-call-with-earth?back=0&month=${year}-${month}&text_color=000000&primary_color=000000`}
          /> with a member of the collective.
        </CalendlyEventListener>
      </p>
      <br/>
    </div>
  );
};

export default CalendlyContact;
