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
  const { title, logo, content } = props;
  // console.log(logo.asset._ref);
  // console.log(logo);
  return (
    <Popover trigger="hover" usePortal={true} gutter={10}>
      <PopoverTrigger>
        {/* {logo && } */}
        {/* console.log(logo.asset._ref) */}

        {title !== "" && (
          <button aria-label={`Open ${title}`} className="font-bold box-link">
            {logo !== undefined ? <SVG file={logo} /> : { title }}
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent
        bg="transparent"
        className="border-none fixed max-w-sm md:max-w-4xl no-shadow text-mobileBody md:text-desktopBody"
        zIndex={50}
      >
        <span className="block  ">
          {/* <PopoverArrow /> */}
          {/* <PopoverCloseButton /> */}
          {/* {trigger && <span>{trigger}</span>} */}
          {content && (
            <span className="box block px-1em py-1em bg-white  text-mobileBody md:text-desktopBody">
              <BasePortableText blocks={content} serializers={Serializer} />
            </span>
          )}
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverModule;
