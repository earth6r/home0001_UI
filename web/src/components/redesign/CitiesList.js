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
        <ul className="text-mobile-landing lg:text-desktop-landing pt-[2px] select-none list-none grid grid-cols-1 gap-y-3 lg:gap-y-3 pr-10  pb-0">
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
                } cursor-pointer p-2 -m-2 before:content-[''] disabled:bg-transparent tracking-caps leading-none uppercase disabled:opacity-40 disabled:shadow-none leading-none`}
              >
                <span className="flex gap-2">
                  <img>
                    <svg
                      width="43"
                      height="26"
                      viewBox="0 0 43 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M-6.39279e-07 14.625L19.5002 14.625L36.5008 14.625L27.7455 23.7088L29.9695 26L42.4995 13L29.9695 -5.47703e-07L27.7611 2.29125L36.5008 11.375L-4.97217e-07 11.375L-6.39279e-07 14.625Z"
                        fill="black"
                      />
                    </svg>
                  </img>
                  <p className={`${city.disabled ? "" : "border-b-[3px]"}`}>{city.title}</p>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
