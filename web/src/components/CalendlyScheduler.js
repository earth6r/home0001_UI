import React, { useState } from "react";
import CalendlyWidget from "./CalendlyWidget";

const CalendlyScheduler = () => {
  const [state, setState] = useState({
    selected: false,
    selection: -1,
  });

  const handleClick = (selection) => () =>
    setState({
      selected: true,
      selection,
    });

  const { selected, selection } = state;

  return (
    <>
      <p>Will you be purchasing a home right away?</p>

      {selected === false ? (
        <>
          <button onClick={handleClick(1)}>Yes</button>
          <br />
          <button onClick={handleClick(0)}>No</button>
        </>
      ) : (
        <p>
          {selection === 1 && <CalendlyWidget />}
          {selection === 0 && <span>We'll be in touch!</span>}
        </p>
      )}
    </>
  );
};

export default CalendlyScheduler;
