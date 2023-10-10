import React, { useState } from "react";
import { sendHubspotClickEvent } from "../../utils/hubspotEvents";
import { fireCityClickEvent } from "../../utils/googleAnalyticsEvents";

export const CitiesList = ({ cities, properties, onChange, selectedCity }) => {
  const cityOrder = ["LA", "NYC", "PARIS", "LONDON", "BERLIN", "MEXICO CITY"];

  function customSort(a, b) {
    const indexA = cityOrder.indexOf(a.title);
    const indexB = cityOrder.indexOf(b.title);

    return indexA - indexB;
  }

  const sortedCities = cities.sort(customSort);

  return (
    <>
      {cities && cities.length !== 0 ? (
        <ul className="text-landing pt-[2px] select-none list-none grid grid-cols-1 gap-y-3 lg:gap-y-3 pr-10  pb-0">
          {cities.map(city => (
            <li key={city.id} className="p-0 before:content-[''] leading-none">
              <button
                disabled={city.disabled}
                onClick={() => {
                  onChange(city);
                  sendHubspotClickEvent(`clicked ${city.title}`, "clicked");
                  fireCityClickEvent(city.title);
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
