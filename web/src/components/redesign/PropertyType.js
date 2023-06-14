import React, { createRef, useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/core";
import MapContainer from "../map";
import { ImageSlider } from "./ImageSlider";
import { StandardText } from "../global/standardText";
import { ReserveHomeForm } from "./ReserveHomeForm";
import { InventorModule } from "./InventoryModule";

export const PropertyTypeUI = ({ selectedPropertyType, property }) => {
  const [showReserveHomeForm, setShowReserveHomeForm] = useState(false);
  const reserveHomeRef = createRef();

  useEffect(() => {
    setTimeout(() => {
      if (showReserveHomeForm && reserveHomeRef.current) {
        const offset = window.innerWidth < 768 ? 16 : 40;
        const top = reserveHomeRef.current.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 500);
  }, [showReserveHomeForm]);

  return (
    <>
      {selectedPropertyType ? (
        <div className="animate-in flex flex-col text-[0.875rem] md:text-base relative">
          {selectedPropertyType?.images && selectedPropertyType.images.length !== 0 && (
            <ImageSlider images={selectedPropertyType.images} />
          )}
          <div className=" text-[0.875rem] md:text-base mt-10 md:mt-20">
            {property.title && <h3 className="m-0 uppercase">{property.title}</h3>}
            {property.unitTypes && <p className="m-0 ">{property.unitTypes}</p>}
            {property.price && <p className="m-0">{property.price}</p>}
            {selectedPropertyType.map &&
              selectedPropertyType.map?.lat &&
              selectedPropertyType.map?.long && (
                <MapModule text="MAP" lat="34.088705" long="-118.254759" />
              )}
          </div>
          {selectedPropertyType.propertyType && (
            <h3 className=" uppercase my-4 md:my-20">
              {selectedPropertyType.propertyType
                .replace("one-bedroom", "1 bedroom")
                .replace("two-bedroom", "2 bedrooms")
                .replace("studio-max", "studio max")}
            </h3>
          )}
          {selectedPropertyType?._rawDescription?.text && (
            <div className="max-w-menu sm:max-w-xs lg:max-w-4xl text-[0.875rem] md:text-base">
              <StandardText data={selectedPropertyType?._rawDescription} />
            </div>
          )}
        </div>
      ) : null}
      {selectedPropertyType._rawInventory && (
        <InventorModule
          title={property.title}
          propertyType={selectedPropertyType.propertyType}
          data={selectedPropertyType}
        />
      )}
      {selectedPropertyType && (
        <button
          onClick={() => setShowReserveHomeForm(prev => !prev)}
          className={`outline-none mb-10 max-w-[19.375rem] tracking-caps uppercase md:max-w-[29.25rem] block mt-20 w-full h-12 max-h-12 py-2 px-3 text-left uppercase border border-[#000] text-[0.875rem] md:text-base ${
            showReserveHomeForm ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          Join the waitlist for this home
        </button>
      )}
      {showReserveHomeForm ? (
        <div ref={reserveHomeRef}>
          <ReserveHomeForm />
        </div>
      ) : null}
    </>
  );
};

const MapModule = props => {
  const { text, lat, long } = props;
  return (
    <>
      <Popover placement="bottom" trigger="click" usePortal={true} gutter={10}>
        <PopoverTrigger>
          <button aria-label={`Open Map`} className=" border-b border-dashed  uppercase">
            MAP
          </button>
        </PopoverTrigger>
        <PopoverContent
          bg="transparent"
          className="border-none  max-w-1xl md:max-w-2xl md:block no-shadow p-0 ml-6"
          zIndex={65}
        >
          <span className="block">
            <span className="border block bg-white text-mobileBody md:text-desktopBody">
              <MapContainer lat={lat} long={long}></MapContainer>
            </span>
          </span>
        </PopoverContent>
      </Popover>
    </>
  );
};
