import React from "react";
import MapContainer from "./map";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton
} from "@chakra-ui/core";
import BasePortableText from "@sanity/block-content-to-react";
import { Serializer } from "../utils/serializer";
import SVG from "../components/svg";

const MapModule = props => {
  const { text, lat, long } = props;
  return (
    <>
      {text}
      <Popover placement="bottom" trigger="click" usePortal={true} gutter={10}>
        <PopoverTrigger>
          {text && (
            <sup
              aria-label={`Open Map`}
              className="inline-block map-button text-desktopCaption py-1 relative"
            ></sup>
          )}
        </PopoverTrigger>
        <PopoverContent
          bg="transparent"
          className="border-none md:ml-64 max-w-1xl md:max-w-2xl md:block no-shadow text-mobileBody p-0 md:text-desktopBody"
          zIndex={65}
        >
          <span className="block">
            <span className="block px-1em py-1em bg-white text-mobileBody md:text-desktopBody">
              <MapContainer lat={lat} long={long}></MapContainer>
            </span>
          </span>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default MapModule;
