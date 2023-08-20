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

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!propertyTypesRef.current) return;

  //     const rect = propertyTypesRef.current.getBoundingClientRect();
  //     if (rect.top <= window.innerHeight) {
  //       document.body.classList.remove("hide-intercom");
  //     } else {
  //       document.body.classList.add("hide-intercom");
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

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
        <div>UNIT 2B</div>
        <div>UNIT 4B</div>
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
          <div className="">
            <div>
              <p>
                {selectedProperty.title}
                <br />
                {selectedProperty.price}
              </p>
            </div>
            <div className="mt-4">
              <MapModule
                text="Map"
                lat={selectedProperty.map.lat}
                long={selectedProperty.map.long}
              />
            </div>
          </div>

          {selectedProperty?._rawDescription ? (
            <div className="pr-mobile-menu md:pr-0 mt-8">
              <StandardText data={selectedProperty?._rawDescription} />
            </div>
          ) : null}
        </div>
      )}
      {<div className="mt-9 mb-10">Choose an available home at 49 Orchard here:</div>}
      {propertyTypes && (
        <ul
          ref={propertyTypesRef}
          id="selected-property-types"
          className="animate-in flex flex-col gap-3 my-10 p-0 pr-mobile-menu md:pr-0"
        >
          {propertyTypes.map(item => {
            const { amenities, propertyType, price, area, id, available } = item;
            return (
              <li key={id} className={`p-0 before:content-['']`}>
                <button
                  disabled={!available}
                  onClick={() => onChange(item)}
                  className={`disabled:opacity-30 disabled:bg-white disabled:shadow-none p-4  min-h-[16rem] border w-full flex flex-col gap-2 text-mobile-body md:text-desktop-body ${
                    selectedPropertyType?.id === item.id ? "bg-black text-white" : ""
                  }`}
                >
                  <div className="w-full">
                    <div className="grid property-type-button p-0 m-0">
                      <p className="col-start-1 text-left uppercase mb-0 tracking-caps">
                        {propertyType
                          ?.replace("studio-max", "studio max")
                          ?.replace("one-bedroom", "1 bedroom")
                          ?.replace("penthouse", "2 bedroom")}
                          &nbsp;—&nbsp;
                          {propertyType
                        ? propertyType === "studio"
                          ? "UNIT 3B"
                          : propertyType === "studio-max"
                          ? "UNIT 4A"
                          : propertyType === "one-bedroom"
                          ? "UNIT 6B"
                          : null
                        : null}
                      </p>
                      <p className="col-start-2 text-right mb-0 tracking-caps">
                      {price}
                      </p>
                    </div>
                    <div className="p-0 mt-4 text-left">
                      {area && (
                        <p className="mb-5 p-0 m-0">
                          {area}
                          <br />
                          Fully equipped 
                          <br />
                          Access to homes in other locations
                        </p>
                      )}
                      {amenities && (
                        <ul className="mb-0 p-0">
                          {amenities.map((amenity, index) => {
                            return (
                              <li key={index++} className="pl-3 text-left before:content-['–']">
                                <span>{amenity}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-11 w-full">
                    <div className="pl-0 m-0 col-span-2 text-left leading-5"></div>
                    <div className="p-0 m-0 text-left col-span-4">

                    </div>
                  </div> */}

                  {/*<div className="grid grid-cols-11 w-full">
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
