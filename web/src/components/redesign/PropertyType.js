import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/core";
import MapContainer from "../map";
import { ImageSlider } from "./ImageSlider";
import { StandardText } from "../global/standardText";
import { ReserveHomeForm } from "./ReserveHomeForm";
import { InventorModule } from "./InventoryModule";

export const PropertyTypeUI = ({ selectedPropertyType, property }) => {
  const [showReserveHomeForm, setShowReserveHomeForm] = useState(false);
  return (
    <>
      {selectedPropertyType ? (
        <div className="flex flex-col text-[0.875rem] md:text-base relative">
          {selectedPropertyType?.images && selectedPropertyType.images.length !== 0 && (
            <ImageSlider images={selectedPropertyType.images} />
          )}
          <div className=" text-[0.875rem] md:text-base mt-10 md:mt-20">
            {property.title && <h3 className="m-0 uppercase">{property.title}</h3>}{" "}
            {property.unitTypes && <p className="m-0 ">{property.unitTypes}</p>}{" "}
            {property.price && <p className="m-0">{property.price}</p>}{" "}
            {property.map && property.map?.lat && property.map?.long && (
              <MapModule text="MAP" lat="34.088705" long="-118.254759" />
            )}
          </div>
          {selectedPropertyType.propertyType && (
            <h3 className=" uppercase my-4 md:my-20">{selectedPropertyType.propertyType}</h3>
          )}
          {selectedPropertyType?._rawDescription?.text && (
            <div className="max-w-xs md:max-w-4xl text-[0.875rem] md:text-base">
              <StandardText data={selectedPropertyType?._rawDescription} />
            </div>
          )}
        </div>
      ) : null}
      <InventorModule data={selectedPropertyType} />
      {selectedPropertyType && (
        <button
          onClick={() => setShowReserveHomeForm(prev => !prev)}
          className="mb-10 max-w-[19.375rem] md:max-w-[29.25rem] block mt-20 w-full h-12 max-h-12 py-2 px-3 text-left uppercase  border border-[#000] text-[0.875rem] md:text-base"
        >
          JOIN THE WAITLIST FOR THIS HOME{" "}
        </button>
      )}
      {showReserveHomeForm && <ReserveHomeForm />}{" "}
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
            <span className="box block px-1em py-1em bg-white text-mobileBody md:text-desktopBody">
              <MapContainer lat={lat} long={long}></MapContainer>
            </span>
          </span>
        </PopoverContent>
      </Popover>
    </>
  );
};
