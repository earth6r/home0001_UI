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
    // window.addEventListener('scroll', function (event) {
    // Scrolling has happened...
    let limit = document.getElementById(text+"-popover");
    limit = limit ? limit.getBoundingClientRect().top - 100 : null;
     //transform: translate3d(372px, 1000px, 0px) !important;
     // let pop = document.getElementByClass('content-popover');
     
     // pop.style.tranform = "translate3d(372px, " + limit + ", 0px) !important"
     // if(window.pageXOffset > limit && window.pageXOffset < limit + 100){
     //  close()
     // }
      
    // }, false);
  }

  return (
    <Popover placement="" isOpen={isOpen} onClose={close} trigger="click" usePortal={true} gutter={10}>
      <PopoverTrigger>
        {text && (
          <a
            id={text+"-popover"}
            onClick={open}
            aria-label={`Open ${text}`}
            className="partner-ref-link"
          >
            {logo ? <SVG file={logo} /> : `${text}`}
          </a>
        )}
      </PopoverTrigger>
      <PopoverContent
        id={text+'-content-popover'}
        bg="transparent"
        className="content-popover border-none max-w-xs md:max-w-4xl no-shadow m-2 -mt-100 ml-4 text-mobileBody p-0 md:text-desktopBody"
        zIndex={50}
      >
        <span className="block">
          {content && (
            <span className="box block px-1em py-1em bg-white text-mobileBody md:text-desktopBody">
              <BasePortableText blocks={content} serializers={Serializer} />
            </span>
          )}
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverModule;
