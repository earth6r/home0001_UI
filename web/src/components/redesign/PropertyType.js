import React, { createRef, useContext, useEffect, useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/core";
import MapContainer from "../map";
import { ImageSlider } from "./ImageSlider";
import { StandardText } from "../global/standardText";
import { InventoryModule } from "./InventoryModule";
import { Link } from "gatsby";
import { HowItWorksModal } from "./HowItWorksModal";
import { imageUrlFor } from "../../lib/image-url";
import { HomesContext } from "../context/HomesContext";

export const PropertyTypeUI = ({
  selectedPropertyType,
  showReserveHomeForm,
  property,
  howItWorks,
  viewInventoryText
}) => {
  const {
    setPropertyType: setSelectedPropertyType,
    setReserveHomeForm: setShowReserveHomeForm
  } = useContext(HomesContext);
  const returnStudioData = () => {
    return (
      <div>
        <p className="m-0">Elevator building</p>
        <p className="m-0">Third floor</p>
        <p className="m-0">Northwest exposure</p>
        <p className="m-0">Windows onto Allen Street</p>
        <p className="m-0">Fully furnished and equipped with all the essentials</p>
        <p>Artworks by internationally significant artists</p>
      </div>
    );
  };
  const returnStudioMaxData = () => {
    return (
      <div>
        <p className="m-0">Elevator building</p>
        <p className="m-0">Fourth floor</p>
        <p className="m-0">Northwest exposure</p>
        <p className="m-0">Windows onto Allen Street</p>
        <p className="m-0">Fully furnished and equipped with all the essentials</p>
        <p>Artworks by internationally significant artists</p>
      </div>
    );
  };

  const returnOneBedroomData = () => {
    return (
      <div>
        <p className="m-0">Elevator building</p>
        <p className="m-0">Sixth floor</p>
        <p className="m-0">Southeast exposure</p>
        <p className="m-0">Windows onto Orchard Street</p>
        <p className="m-0">Fully furnished and equipped with all the essentials</p>
        <p>Artworks by internationally significant artists</p>
      </div>
    );
  };
  const returnLAData = () => {
    return (
      <div>
        <p className="m-0">Oversized 3-bedroom home over three floors</p>
        <p className="m-0">Northwestern / Southwestern exposures</p>
        <p className="m-0">Fully furnished and equipped with all the essentials</p>
        <p className="m-0">Artworks by internationally significant artists</p>
        <p className="m-0">Close to Elysian Park and everything on Sunset</p>
      </div>
    );
  };

  return (
    <>
      {selectedPropertyType?.id ? (
        <>
          <div className="animate-in flex flex-col text-mobile-body md:text-desktop-body relative">
            <div>
              {selectedPropertyType?.images && selectedPropertyType.images.length !== 0 && (
                <ImageSlider
                  images={selectedPropertyType.images.map(image => ({
                    image
                  }))}
                />
              )}
            </div>
            <div className="mt-10">
              <div>
                {selectedPropertyType.propertyType && (
                  <p className="m-0 uppercase tracking-caps">
                    {
                      (selectedPropertyType.property.title =
                        "1308 DOUGLAS ST." &&
                        selectedPropertyType.propertyType == "two-bedrooms" ? (
                          <span>TOWNHOUSE&nbsp;&mdash;&nbsp;#6</span>
                        ) : (
                          (selectedPropertyType.property.title =
                            "1308 DOUGLAS ST." &&
                            selectedPropertyType.propertyType == "penthouse" ? (
                              <span>TOWNHOUSE&nbsp;&mdash;&nbsp;#7</span>
                            ) : (
                              selectedPropertyType.propertyType
                                .replace("one-bedroom", "1 bedroom")
                                .replace("studio-max", "studio max")
                            ))
                        ))
                    }

                    {selectedPropertyType.propertyType != "two-bedrooms" &&
                    selectedPropertyType.propertyType != "penthouse" ? (
                      <span>&nbsp;—&nbsp;</span>
                    ) : null}
                    {selectedPropertyType._rawInventory
                      ? selectedPropertyType.propertyType === "studio"
                        ? "UNIT 3B"
                        : selectedPropertyType.propertyType === "studio-max"
                        ? "UNIT 4A"
                        : selectedPropertyType.propertyType === "one-bedroom"
                        ? "UNIT 6B"
                        : null
                      : null}
                  </p>
                )}
              </div>
            </div>
            <div className="text-mobile-body md:text-desktop-body pr-mobile-menu md:pr-0">
              <div className="">
                {selectedPropertyType.price == "Inquire"
                  ? "Price upon request"
                  : selectedPropertyType.price && (
                      <p className="m-0">{selectedPropertyType.price}</p>
                    )}
                {selectedPropertyType.area && (
                  <p className="mb-4 m-0">{selectedPropertyType.area}</p>
                )}
                {selectedPropertyType.propertyType === "studio"
                  ? returnStudioData()
                  : selectedPropertyType.propertyType === "studio-max"
                  ? returnStudioMaxData()
                  : selectedPropertyType.propertyType === "one-bedroom"
                  ? returnOneBedroomData()
                  : selectedPropertyType.propertyType == "two-bedrooms" ||
                    selectedPropertyType.propertyType == "penthouse"
                  ? returnLAData()
                  : null}
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
              .replace("two-bedroom", "3 story townhouse")
              .replace("studio-max", "studio max")}
              </h3>
            )} */}
            {selectedPropertyType?._rawDescription?.text && (
              <div className="mt-5 pr-mobile-menu md:pr-0 text-mobile-body md:text-desktop-body property-type-description">
                <StandardText data={selectedPropertyType?._rawDescription} />
              </div>
            )}
          </div>
          {selectedPropertyType.propertyType != "two-bedrooms" &&
          selectedPropertyType.propertyType != "penthouse" ? (
            <div>
              <InventoryModule
                title={property.title}
                propertyType={selectedPropertyType.propertyType}
                data={selectedPropertyType}
                viewInventoryText={"View sample inventory"}
              />
            </div>
          ) : null}
          {selectedPropertyType.moreImages?.length ? (
            <div className="w-full mt-10">
              {selectedPropertyType.propertyType === "two-bedrooms" ||
              selectedPropertyType.propertyType === "penthouse" ? (
                <div className="w-full relative">
                  {selectedPropertyType?.images && selectedPropertyType.images.length !== 0 && (
                    <ImageSlider images={selectedPropertyType.moreImages} />
                  )}
                </div>
              ) : (
                selectedPropertyType?.images &&
                selectedPropertyType.images.length !== 0 && (
                  <ImageSlider images={selectedPropertyType.moreImages} />
                )
              )}
            </div>
          ) : null}
          {selectedPropertyType?._rawDescriptionTwo?.text && (
            <div className="mt-10 pr-mobile-menu md:pr-0 text-mobile-body md:text-desktop-body property-type-description">
              <StandardText data={selectedPropertyType?._rawDescriptionTwo} />
            </div>
          )}
          <HowItWorksModal data={howItWorks} />
        </>
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
          <button aria-label={`Open Map`} className="border-b-[2px] border-solid active:font-bold">
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
