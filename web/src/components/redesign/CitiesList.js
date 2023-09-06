import React from "react";
export const CitiesList = ({ cities, properties, onChange, selectedCity }) => {
  const clickEventsObject = { NYC: "pe43771996_click_nyc" };
  const _hsq = (window._hsq = window._hsq || []);
  const sendHubspotClickEvent = city => {
    _hsq.push([
      "trackCustomBehaviorEvent",
      {
        name: "pe43771996_click_nyc",
        properties: { hs_city: "Houston" }
      }
    ]);
  };

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
                  sendHubspotClickEvent(city.title);
                  console.log(city);
                }}
                className={`${selectedCity?.id === city.id ? "font-black" : ""} ${
                  city.disabled ? "" : "underline"
                } cursor-pointer p-5 -m-5 before:content-[''] disabled:bg-transparent tracking-caps leading-none uppercase disabled:opacity-30 disabled:shadow-none leading-none`}
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
