import React, { createRef, useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/core";
import MapContainer from "../map";
import { ImageSlider } from "./ImageSlider";
import { StandardText } from "../global/standardText";
import { InventoryModule } from "./InventoryModule";
import { Link } from "gatsby";
import { HowItWorksModal } from "./HowItWorksModal";
import { imageUrlFor } from "../../lib/image-url";

export const PropertyTypeUI = ({
  selectedPropertyType,
  showReserveHomeForm,
  property,
  howItWorks,
  viewInventoryText
}) => {
  return (
    <>
      {selectedPropertyType ? (
        <div className="animate-in flex flex-col text-mobile-body md:text-desktop-body relative">
          {selectedPropertyType?.images && selectedPropertyType.images.length !== 0 && (
            <ImageSlider
              images={selectedPropertyType.images.map(image => ({
                image
              }))}
            />
          )}
          <div className="text-mobile-body md:text-desktop-body mt-10 pr-mobile-menu md:pr-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                {selectedPropertyType.propertyType && (
                  <p className="m-0 uppercase tracking-caps">{selectedPropertyType.propertyType}</p>
                )}
                {selectedPropertyType.price && (
                  <p className="m-0 uppercase tracking-caps">{selectedPropertyType.price}</p>
                )}
              </div>
              <div className="text-left md:text-right mt-10 md:mt-0 mb-10">
                {selectedPropertyType._rawInventory && (
                  <InventoryModule
                    title={property.title}
                    propertyType={selectedPropertyType.propertyType}
                    data={selectedPropertyType}
                    viewInventoryText={viewInventoryText}
                  />
                )}
              </div>
            </div>

            {
              //Todo: FIX Map and Unit Address Section
              /* {property.map?.lat && property.map?.long && (
              <MapModule text="MAP" lat={property.map?.lat} long={property.map?.long} />
            )} */
            }
          </div>
          {/* {selectedPropertyType.propertyType && (
            <h3 className="uppercase tracking-caps my-10 pr-mobile-menu md:pr-0">
              {selectedPropertyType.propertyType
                .replace("one-bedroom", "1 bedroom")
                .replace("two-bedroom", "2 bedrooms")
                .replace("studio-max", "studio max")}
            </h3>
          )} */}
          {selectedPropertyType?._rawDescription?.text && (
            <div className="pr-mobile-menu md:pr-0 text-mobile-body md:text-desktop-body">
              <StandardText data={selectedPropertyType?._rawDescription} />
            </div>
          )}
        </div>
      ) : null}
      {selectedPropertyType.moreImages?.length ? (
        <div className="mt-10">
          <ImageSlider images={selectedPropertyType.moreImages} />
        </div>
      ) : null}
      {selectedPropertyType?._rawDescriptionTwo?.text && (
        <div className="mt-10 text-mobile-body md:text-desktop-body">
          <StandardText data={selectedPropertyType?._rawDescriptionTwo} />
        </div>
      )}
      <HowItWorksModal data={howItWorks} />
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
