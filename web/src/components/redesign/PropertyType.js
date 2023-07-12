import React, { createRef, useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/core";
import MapContainer from "../map";
import { ImageSlider } from "./ImageSlider";
import { StandardText } from "../global/standardText";
import { InventorModule } from "./InventoryModule";
import { Link } from "gatsby";

export const PropertyTypeUI = ({ selectedPropertyType, showReserveHomeForm, property }) => {
  return (
    <>
      {selectedPropertyType ? (
        <div className="animate-in flex flex-col text-mobile-body md:text-desktop-body relative">
          {selectedPropertyType?.images && selectedPropertyType.images.length !== 0 && (
            <ImageSlider images={selectedPropertyType.images} />
          )}
          <div className="text-mobile-body md:text-desktop-body mt-10 md:mt-20 pr-mobile-menu md:pr-0">
            {property.unitTypes && <p className="m-0 ">{property.unitTypes}</p>}
            {property.price && <p className="m-0">{property.price}</p>}
            {selectedPropertyType.map?.lat && selectedPropertyType.map?.long && (
              <MapModule
                text="MAP"
                lat={selectedPropertyType.map?.lat}
                long={selectedPropertyType.map?.long}
              />
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
            <div className="pr-mobile-menu md:pr-0 text-mobile-body md:text-desktop-body">
              <StandardText data={selectedPropertyType?._rawDescription} />
            </div>
          )}
        </div>
      ) : null}
      {selectedPropertyType.imageWithFile?.file?.asset &&
      selectedPropertyType.imageWithFile?.image?.asset ? (
        <div className="flex flex-col items-end">
          <img
            className="mt-10 h-auto w-full"
            src={selectedPropertyType.imageWithFile.image.asset.url}
            height="487"
            alt=""
          />
          <a
            className="hover:text-[#000] w-fit flex items-center mt-4 text-mobile-body md:text-desktop-body"
            href={selectedPropertyType.imageWithFile.file.asset.url}
            target="_blank"
          >
            Download <span className="block ml-1 mb-1">↓</span>
          </a>
        </div>
      ) : null}
      {selectedPropertyType._rawInventory && (
        <InventorModule
          title={property.title}
          propertyType={selectedPropertyType.propertyType}
          data={selectedPropertyType}
        />
      )}
      <Link
        to="/this-is-not-an-exit/how-it-works"
        className="w-fit block border-b border-dashed mt-10 md:mt-20 hover:text-black text-mobile-body md:text-desktop-body"
      >
        How It Works
      </Link>
    </>
  );
};

const MapModule = props => {
  const { text, lat, long } = props;

  return (
    <>
      <Popover placement="bottom" trigger="click" usePortal={true} gutter={10}>
        <PopoverTrigger>
          <button aria-label={`Open Map`} className=" border-b border-dashed uppercase">
            {text}
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
