
import React from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapContainer from "./map"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/core";
import BasePortableText from "@sanity/block-content-to-react";
import { Serializer } from "../utils/serializer";
import SVG from "../components/svg";

const MapModule = (props) => {
  const { text, lat, long } = props;
  return (
    <>
    {text}
    <Popover placement="bottom" trigger="click" usePortal={true} gutter={10}>
      <PopoverTrigger>
        {text && (
          <sup
            aria-label={`Open Map`}
            className="inline-block map-button text-desktopCaption box-menu py-1 relative px-2"
          >
           {"MAP"}
          </sup>
        )}
      </PopoverTrigger>
      <PopoverContent
        bg="transparent"
        className="border-none md:ml-64 max-w-1xl md:max-w-2xl md:block no-shadow text-mobileBody p-0 md:text-desktopBody"
        zIndex={50}
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

export default MapModule;
