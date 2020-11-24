import React from "react";
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

const PopoverModule = (props) => {
  const { text, logo, content } = props;
  console.log(logo);
  return (
    <Popover placement="bottom" trigger="click" usePortal={true} gutter={10}>
      <PopoverTrigger>
        {text && (
          <button
            aria-label={`Open ${text}`}
            className="text-mobileLarge md:text-desktopLarge box-link m-0 pr-5 pb-3"
          >
            {logo ? <SVG file={logo} /> : `${text}`}
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent
        bg="transparent"
        className="border-none max-w-sm md:max-w-4xl no-shadow text-mobileBody p-0 md:text-desktopBody"
        zIndex={50}
      >
        <span className="block">
          {content && (
            <span className="box block px-1em py-1em pb-3/4em bg-white text-mobileBody md:text-desktopBody">
              <BasePortableText blocks={content} serializers={Serializer} />
            </span>
          )}
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverModule;
