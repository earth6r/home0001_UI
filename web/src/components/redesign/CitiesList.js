import React from "react";

export const CitiesList = ({ cities, properties, onChange, selectedCity }) => {
  return (
    <>
      {cities && cities.length !== 0 ? (
        <ul className="list-none grid grid-cols-3 place-items-start gap-10 p-0">
          {cities.map(city => (
            <li key={city.id} className="p-0 before:content-['']">
              <button
                disabled={city.disabled}
                onClick={() => onChange(city)}
                className={`${
                  selectedCity?.id === city.id ? "underline" : ""
                } cursor-pointer p-0 before:content-[''] disabled:bg-transparent  uppercase disabled:opacity-40 disabled:shadow-none text-[0.875rem] md:text-base `}
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
