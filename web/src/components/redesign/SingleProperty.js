import React, { createRef, useEffect } from "react";
import { StandardText } from "../global/standardText";
import { imageUrlFor } from "../../lib/image-url";

export const SingleProperty = ({
  onChange,
  propertyTypes,
  selectedProperty,
  selectedPropertyType,
  disableScroll = false
}) => {
  const selectedPropertyRef = createRef();
  useEffect(() => {
    if (!disableScroll) {
      setTimeout(() => {
        if (selectedProperty?.id && selectedPropertyRef.current && !selectedPropertyType) {
          const offset = window.innerWidth < 768 ? 16 : 40;
          const top =
            selectedPropertyRef.current.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 500);
    }
  }, [selectedProperty, selectedPropertyRef, selectedPropertyType, disableScroll]);

  return (
    <>
      {selectedProperty && (
        <div
          ref={selectedPropertyRef}
          className="animate-in flex flex-col text-mobile-body md:text-desktop-body mt-10 md:mt-20"
        >
          <img
            className="max-w-[560px] md:max-w-[unset] h-auto w-auto mb-10"
            src={imageUrlFor(selectedProperty.image)
              .width(1000)
              .auto("format")
              .url()}
            height="487"
            width="560"
            alt=""
          />
          <span className="mb-10">{selectedProperty.title}</span>
          {selectedProperty?._rawDescription ? (
            <div className="pr-mobile-menu md:pr-0">
              <StandardText data={selectedProperty?._rawDescription} />
            </div>
          ) : null}
        </div>
      )}
      {propertyTypes && (
        <ul className="animate-in flex flex-col gap-4 my-10 p-0 pr-mobile-menu md:pr-0">
          {propertyTypes.map(item => {
            const { amenities, propertyType, price, area, id, available } = item;
            return (
              <li key={id} className={`p-0 before:content-['']`}>
                <button
                  disabled={!available}
                  onClick={() => onChange(item)}
                  className={`disabled:opacity-40 disabled:bg-white disabled:shadow-none p-4 border w-full flex flex-col gap-7 text-mobile-body md:text-desktop-body ${
                    selectedPropertyType?.id === item.id ? "bg-black text-white" : ""
                  }`}
                >
                  <div className="grid grid-cols-7">
                    <div className="p-0 m-0 col-span-6 text-left">
                      {propertyType && (
                        <p className="uppercase mb-0 tracking-caps">
                          {propertyType
                            .replace("one-bedroom", "1 bedroom")
                            .replace("two-bedroom", "2 bedrooms")
                            .replace("studio-max", "studio max")}
                        </p>
                      )}
                      {price && <p className="uppercase tracking-caps mb-0">{price}</p>}
                      {area && (
                        <p className="uppercase tracking-caps">
                          {area}
                          <br />
                          <span className="normal-case">
                            Fully Equipped
                            <br />
                            Access to homes in other locations
                          </span>
                        </p>
                      )}
                    </div>
                    <div className="p-0 m-0 text-right">
                      {item.propertyType === "studio"
                        ? "Unit 3B"
                        : item.propertyType === "studio-max"
                        ? "Unit 4A"
                        : item.propertyType === "one-bedroom"
                        ? "Unit 6B"
                        : null}
                    </div>
                  </div>

                  {amenities && (
                    <ul className="mb-0 p-0">
                      {amenities.map((amenity, index) => {
                        return (
                          <li key={index++} className="p-0 text-left before:content-['']">
                            <span>&ndash;&nbsp;</span>
                            <span>{amenity}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
