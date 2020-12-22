import React, { useState } from "react";
import CalendlyWidget from "./CalendlyWidget";

const BuyLaterMessage = () => (
  <p>
    Thank you. We’ll keep you updated as new homes and new locations become available. When you’re
    ready to buy, write us to reserve a home and schedule consultations with our team to secure
    financing and complete your purchase.
  </p>
);

const ButtonWrapper = ({ children }) => (
  <p style={{ display: "flex", justifyContent: "space-between" }}>{children}</p>
);

const CalendlyScheduler = () => {
  const [state, setState] = useState({
    location: -1,
    timeFrame: -1,
  });

  const handleClick = (name) => (selected) => () => setState({ ...state, [name]: selected });

  const handleLocationClick = handleClick("location");
  const handleTimeFrameClick = handleClick("timeFrame");

  const { location, timeFrame } = state;

  if (location < 0) {
    return (
      <ButtonWrapper>
        <>
          <button onClick={handleLocationClick(1)}>New York</button>
          <br />
          <button onClick={handleLocationClick(1)}>Los Angeles</button>
          <br />
          <div className="relative">
          <input className="py-0 -ml-1/4em px-1" placeholder={"other"} type="text"/>
          <button className="absolute arrow-input-checkout px-1" onClick={handleLocationClick(0)}>→</button>
          </div>
        </>
      </ButtonWrapper>
    );
  }

  if (timeFrame < 0) {
    return (
      <ButtonWrapper>
        <>
          <button onClick={handleTimeFrameClick(1)}>This year</button>
          <br />
          <button onClick={handleTimeFrameClick(1)}>Next year</button>
          <br />
          <button onClick={handleTimeFrameClick(0)}>Don’t know</button>
        </>
      </ButtonWrapper>
    );
  }

  if (location === 0 || timeFrame === 0) {
    return <BuyLaterMessage />;
  }

  return <CalendlyWidget />;
};

export default CalendlyScheduler;
