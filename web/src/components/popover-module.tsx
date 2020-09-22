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
  console.log(logo);
  return (
    <Popover gutter={20}>
      <PopoverTrigger>
        {/* {logo && } */}
        {/* console.log(logo.asset._ref) */}

        {title !== "" && (
          <button aria-label={`Open ${title}`} className="font-bold box box-link">
            {logo !== undefined ? <SVG file={logo} /> : { title }}
          </button>
        )}
      </PopoverTrigger>
      <PopoverContent maxW={1000} mr={10} bg="transparent" border="none" zIndex={40}>
        <span className="block box container my-1/2em py-1/2em text-base">
          {/* <PopoverArrow /> */}
          {/* <PopoverCloseButton /> */}
          {/* {trigger && <span>{trigger}</span>} */}
          {content && (
            <span className="max-w-sm text-base">
              <BasePortableText blocks={content} serializers={Serializer} />
            </span>
          )}
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverModule;
