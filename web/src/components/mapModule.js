
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
    <Popover placement="bottom" trigger="click" usePortal={true} gutter={10}>
      <PopoverTrigger>
        {text && (
          <span
            aria-label={`Open Map`}
            className=""
          >
            {text}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        bg="transparent"
        className="border-none ml-64 max-w-sm md:max-w-2xl hidden md:block no-shadow text-mobileBody p-0 md:text-desktopBody"
        zIndex={50}
      >
        <span className="block">
        <span className="box block px-1em py-1em pb-3/4em bg-white text-mobileBody md:text-desktopBody">
          <MapContainer lat={lat} long={long}></MapContainer>
         </span>
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default MapModule;
