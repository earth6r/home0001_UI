import React from "react";

export const CitiesList = ({ cities, properties, onChange, selectedCity }) => {
  return (
    <>
      {cities && cities.length !== 0 ? (
        <ul className="list-none grid grid-cols-3 gap-y-10 md:gap-y-20 pr-mobile-menu md:pr-desktop-menu">
          {cities.map(city => (
            <li key={city.id} className="p-0 before:content-['']">
              <button
                disabled={city.disabled}
                onClick={() => onChange(city)}
                className={`${
                  selectedCity?.id === city.id ? "underline" : ""
                } cursor-pointer p-0 before:content-[''] disabled:bg-transparent tracking-caps uppercase disabled:opacity-40 disabled:shadow-none text-mobile-body md:text-desktop-body`}
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
