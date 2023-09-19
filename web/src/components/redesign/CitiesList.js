import React from "react";
import { sendHubspotClickEvent } from "../../utils/hubspotEvents";
import { cityClickEvent } from "../../utils/googleAnalyticsEvents";
export const CitiesList = ({ cities, properties, onChange, selectedCity }) => {
  return (
    <>
      {cities && cities.length !== 0 ? (
        <ul className="pt-[2px] select-none list-none grid grid-cols-3 gap-y-[52px] md:gap-y-16 pr-10 md:pr-desktop-menu pb-0">
          {cities.map(city => (
            <li key={city.id} className="p-0 before:content-[''] leading-none">
              <button
                disabled={city.disabled}
                onClick={() => {
                  onChange(city);
                  sendHubspotClickEvent(`clicked ${city.title}`, "clicked");
                  cityClickEvent(city.title);
                }}
                className={`${selectedCity?.id === city.id ? "font-black" : ""} ${
                  city.disabled ? "" : "decoration-black"
                } cursor-pointer p-5 -m-5 before:content-[''] disabled:bg-transparent tracking-caps leading-none uppercase disabled:opacity-40 disabled:shadow-none leading-none`}
              >
                <p className={`${city.disabled ? "" : "border-b-[1.5px]"}`}>{city.title}</p>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
