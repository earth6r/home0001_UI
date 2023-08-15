import React, { createRef, useEffect, useRef } from "react";
import { StandardText } from "../global/standardText";
import { imageUrlFor } from "../../lib/image-url";
import MapModule from "../mapModule";
export const SingleProperty = ({
  onChange,
  propertyTypes,
  selectedProperty,
  selectedPropertyType,
  disableScroll = false
}) => {
  const selectedPropertyRef = createRef();
  const propertyTypesRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (!propertyTypesRef.current) return;

      const rect = propertyTypesRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.top + rect.height >= 0) {
        document.body.classList.remove("hide-intercom");
      } else {
        document.body.classList.add("hide-intercom");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const returnStudioUnavailableData = () => {
    return (
      <div>
        UNIT 2B <br /> UNIT 4B
      </div>
    );
  };

  const returnStudioMaxUnavailableData = () => {
    return <div>UNIT 2A</div>;
  };
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
          {/**ToDO: add city, zip */}
          <span>{selectedProperty.title}</span>
          <span>10002, NYC</span>
          <MapModule text="Map" lat={selectedProperty.map.lat} long={selectedProperty.map.long} />
          {selectedProperty?._rawDescription ? (
            <div className="pr-mobile-menu md:pr-0 mt-9">
              <StandardText data={selectedProperty?._rawDescription} />
            </div>
          ) : null}
        </div>
      )}
      {<div className="mt-10 mb-10">Choose an available home at 49 Orchard here:</div>}
      {propertyTypes && (
        <ul
          ref={propertyTypesRef}
          id="selected-property-types"
          className="animate-in flex flex-col gap-4 my-10 p-0 pr-mobile-menu md:pr-0"
        >
          {propertyTypes.map(item => {
            const { amenities, propertyType, price, area, id, available } = item;
            return (
              <li key={id} className={`p-0 before:content-['']`}>
                <button
                  disabled={!available}
                  onClick={() => onChange(item)}
                  className={`disabled:opacity-40 disabled:bg-white disabled:shadow-none p-4 border w-full flex flex-col gap-2 text-mobile-body md:text-desktop-body ${
                    selectedPropertyType?.id === item.id ? "bg-black text-white" : ""
                  }`}
                >
                  <div className="grid grid-cols-6 w-full gap-x-4">
                    {propertyType == "studio-max" ? (
                      <div className="tracking-tight p-0 m-0 col-span-2 text-left">
                        <p className="uppercase mb-0 tracking-caps">
                          {propertyType.replace("studio-max", "studio max")}
                        </p>
                        {price && <p className="uppercase tracking-caps mb-0">{price}</p>}
                      </div>
                    ) : (
                      <div className="p-0 m-0 col-span-2 text-left">
                        {propertyType && (
                          <p className="uppercase mb-0 tracking-caps">
                            {propertyType
                              .replace("one-bedroom", "1 bedroom")
                              .replace("penthouse", "2 bedrooms")}
                          </p>
                        )}
                        {price && <p className="uppercase tracking-caps mb-0">{price}</p>}
                      </div>
                    )}

                    <div className="p-0 m-0 text-left col-span-4">
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
                  </div>
                  <div className="grid grid-cols-6 w-full">
                    <div className="p-0 m-0 col-span-2 text-left ">
                      {propertyType
                        ? propertyType === "studio"
                          ? "UNIT 3B"
                          : propertyType === "studio-max"
                          ? "UNIT 4A"
                          : propertyType === "one-bedroom"
                          ? "UNIT 6B"
                          : null
                        : null}
                      <div className="opacity-40 line-through">
                        {item.propertyType === "studio"
                          ? returnStudioUnavailableData()
                          : item.propertyType === "studio-max"
                          ? returnStudioMaxUnavailableData()
                          : item.propertyType === "one-bedroom"}
                      </div>
                    </div>
                    <div className="p-0 m-0 text-left col-span-4">
                      {amenities && (
                        <ul className="mb-0 p-0">
                          {amenities.map((amenity, index) => {
                            return (
                              <li
                                key={index++}
                                className="leading-5 p-0 text-left before:content-['']"
                              >
                                <span>&ndash;&nbsp;</span>
                                <span>{amenity}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/*<div className="grid grid-cols-6 w-full">
                    <div className="p-0 m-0 col-span-2 text-left"></div>
                    <div className="p-0 m-0 text-right">
                      <div className="flex flex-col">
                        <div className="p-0 m-0 text-right">
                          {item.propertyType === "studio"
                            ? "UNIT 3B"
                            : item.propertyType === "studio-max"
                            ? "UNIT 4A"
                            : item.propertyType === "one-bedroom"
                            ? "UNIT 6B"
                            : item.propertyType === "penthouse"
                            ? "COMING SOON"
                            : null}
                        </div>
                        <div className="p-0 m-0 text-right opacity-40 line-through">
                          
                        </div>
                      </div>
                    </div>
                      </div>*/}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
