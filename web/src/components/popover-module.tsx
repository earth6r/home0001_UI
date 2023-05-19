import React from "react";
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

const PopoverModule = props => {
  const { text, logo, content } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  if (typeof window != `undefined`) {
    // window.addEventListener('scroll', function (event) {
    // Scrolling has happened...
    let limit = document.getElementById(text + "-popover");
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
    <Popover
      placement=""
      isOpen={isOpen}
      onClose={close}
      trigger="click"
      usePortal={true}
      gutter={10}
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
        className="content-popover border-none  max-w-2xl no-shadow m-2 -mt-100 ml-4  p-0"
        zIndex={50}
      >
        <div className="block">
          {content && (
            <div className="  p-10 border bg-white text-base">
              <BasePortableText blocks={content} serializers={Serializer} />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverModule;
