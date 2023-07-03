import React, { createRef, useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/core";
import MapContainer from "../map";
import { ImageSlider } from "./ImageSlider";
import { StandardText } from "../global/standardText";
import { InventorModule } from "./InventoryModule";

export const PropertyTypeUI = ({ selectedPropertyType, showReserveHomeForm, property }) => {
  return (
    <>
      {selectedPropertyType ? (
        <div className="animate-in flex flex-col text-[0.875rem] md:text-base relative">
          {selectedPropertyType?.images && selectedPropertyType.images.length !== 0 && (
            <ImageSlider images={selectedPropertyType.images} />
          )}
          <div className="text-[0.875rem] md:text-base mt-10 md:mt-20 pr-mobile-menu md:pr-0">
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
            <h3 className="uppercase my-4 md:my-20 pr-mobile-menu md:pr-0">
              {selectedPropertyType.propertyType
                .replace("one-bedroom", "1 bedroom")
                .replace("two-bedroom", "2 bedrooms")
                .replace("studio-max", "studio max")}
            </h3>
          )}
          {selectedPropertyType?._rawDescription?.text && (
            <div className="pr-mobile-menu md:pr-0 text-[0.875rem] md:text-base">
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
