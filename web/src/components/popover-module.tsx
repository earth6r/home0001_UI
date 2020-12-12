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

  const [isOpen, setIsOpen] = React.useState(false)
  const open = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)
  if(typeof window != `undefined`){
    window.addEventListener('scroll', function (event) {
    // Scrolling has happened...
    let limit = document.getElementById(text+"-popover");
    limit = limit ? limit.getBoundingClientRect().top - 100 : null;

     if(window.pageXOffset > limit && window.pageXOffset < limit + 100){
      close()
     }
      
    }, false);
  }

  return (
    <Popover placement="bottom" isOpen={isOpen} onClose={close} trigger="click" usePortal={true} gutter={10}>
      <PopoverTrigger>
        {text && (
          <button
            id={text+"-popover"}
            onClick={open}
            aria-label={`Open ${text}`}
            className="text-mobileLarge md:text-desktopLarge box-link transform md:translate-y-1 m-0 md:pr-5 md:pb-3"
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
