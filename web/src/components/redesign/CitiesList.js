import React from "react";
import { sendHubspotClickEvent } from "../../utils/hubspotEvents";
export const CitiesList = ({ cities, properties, onChange, selectedCity }) => {
  return (
    <>
      {cities && cities.length !== 0 ? (
        <ul className="select-none list-none grid grid-cols-3 gap-y-10 md:gap-y-20 pr-10  md:pr-desktop-menu pb-0">
          {cities.map(city => (
            <li key={city.id} className="p-0 before:content-[''] leading-none">
              <button
                disabled={city.disabled}
                onClick={() => {
                  onChange(city);
                  console.log(city);
                  sendHubspotClickEvent(`clicked ${city.title}`, "clicked");
                }}
                className={`${selectedCity?.id === city.id ? "font-black" : ""} ${
                  city.disabled ? "" : "underline underline-offset-4 decoration-2"
                } cursor-pointer p-5 -m-5 before:content-[''] disabled:bg-transparent tracking-caps leading-none uppercase disabled:opacity-40 disabled:shadow-none leading-none`}
              >
                {city.title}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
