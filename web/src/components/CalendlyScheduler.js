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
      <>
      <div className="block w-full mb-1em">Where would you like to own a home?</div>

          <button className="md:inline-block md:mr-24" onClick={handleLocationClick(1)}>New York</button>
     
          <button className="md:inline-block md:mr-24" onClick={handleLocationClick(1)}>Los Angeles</button>
 
          <div className="relative w-auto mt-6 md:mt-0 md:inline-block md:mr-24">
          <input className="w-full md:w-auto py-0 -ml-1/4em px-1" placeholder={"other"} type="text"/>
          <button className="absolute arrow-input-checkout px-1" onClick={handleLocationClick(0)}>→</button>
          </div>

      </>
    );
  }

  if (timeFrame < 0) {
    return (
     <>
    <div className="block w-full mb-1em">When would you like to buy?</div>
  
       
          <button id="checkout-button-1" className="inline-block mr-24 pt-2" onClick={handleTimeFrameClick(1)}>This year</button>
         
          <button id="checkout-button-2" className="inline-block mr-24 pt-2" onClick={handleTimeFrameClick(0)}>Next year</button>
     
          <button className="inline-block mr-24 pt-2" onClick={handleTimeFrameClick(0)}>Don’t know</button>
        

      </>
    );
  }

  if (location === 0 || timeFrame === 0) {
    return <BuyLaterMessage />;
  }

  return <CalendlyWidget />;
};

export default CalendlyScheduler;
