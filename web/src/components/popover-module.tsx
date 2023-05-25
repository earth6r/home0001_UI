import React from "react";
import { Popover, PopoverTrigger, PopoverContent, PopoverCloseButton } from "@chakra-ui/core";
import BasePortableText from "@sanity/block-content-to-react";
import { Serializer } from "../utils/serializer";
import SVG from "../components/svg";

const PopoverModule = props => {
  const { text, logo, content } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <Popover
      isOpen={isOpen}
      onClose={close}
      trigger="click"
      usePortal={true}
      gutter={10}
      placement="top"
    >
      <PopoverTrigger>
        {text && (
          <a
            id={text + "-popover"}
            onClick={open}
            aria-label={`Open ${text}`}
            className="partner-ref-link"
          >
            {logo ? <SVG file={logo} /> : `${text}`}
          </a>
        )}
      </PopoverTrigger>
      <PopoverContent
        id={text + "-content-popover"}
        bg="transparent"
        className="border-none max-w-2xl no-shadow px-4 -ml-[5px]"
        zIndex={50}
      >
        <PopoverCloseButton
          _hover={{
            bg: "none"
          }}
          _active={{
            bg: "none"
          }}
          className="right-0 top-0 my-4 mx-8"
        />
        <div className="block">
          {content && (
            <div className="p-10 border bg-white text-base">
              <BasePortableText blocks={content} serializers={Serializer} />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverModule;
