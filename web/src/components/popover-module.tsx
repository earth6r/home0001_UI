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

const PopoverModule = (props) => {
  const { trigger, content } = props;
  console.log(content);
  return (
    <Popover gutter={10}>
      <PopoverTrigger>
        {trigger !== "" && <button className="font-bold box box-link">{trigger}</button>}
      </PopoverTrigger>
      <PopoverContent maxW={1000} mr={10} bg="transparent" border="none" zIndex={20}>
        <span className="block box container py-1/2em">
          {/* <PopoverArrow /> */}
          {/* <PopoverCloseButton /> */}
          {/* {trigger && <span>{trigger}</span>} */}
          {content && (
            <span className="max-w-lg">
              <BasePortableText blocks={content} serializers={Serializer} />
            </span>
          )}
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverModule;
