import React from "react";

export const PropertiesList = ({ properties, onChange, selectedProperty }) => {
  return (
    <>
      {properties && properties.length !== 0 ? (
        <ul className="animate-in m-0 grid gap-10 md:gap-20 mt-10 md:mt-20 pr-mobile-menu md:pr-0 pb-0">
          {properties.map(property => {
            return (
              <li className="p-0 before:content-[''] m-0" key={property.id}>
                <button
                  className={`${
                    selectedProperty?.id === property.id ? "underline" : ""
                  } flex flex-col gap-0 text-mobile-body md:text-desktop-body`}
                  onClick={() => onChange(property)}
                >
                  {property.title && <h3 className="m-0">{property.title}</h3>}{" "}
                  {property.unitTypes && <p className="m-0 ">{property.unitTypes}</p>}{" "}
                  {property.price && <p className="m-0">{property.price}</p>}{" "}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};
