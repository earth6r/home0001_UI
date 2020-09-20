import React from "react";

import { StandardText, StandardTextProps } from "./global/standardText";
import { NestedPages, NestedPagesProps } from "./global/nestedPages";
import { AccordionModule } from "./global/accordion";
import { Image } from "./image";

export const Modules = ({ reactModule, type }: { type: string; reactModule: any }) => {
  switch (type) {
    case "accordion":
      return <AccordionModule data={reactModule as AccordionModuleProps["data"]} />;
    case "standardText":
      return <StandardText data={reactModule as StandardTextProps["data"]} />;
    case "nestedPages":
      return <NestedPages data={reactModule as NestedPagesProps["data"]} />;
    case "imageModule":
      //console.log(reactModule);
      return <Image imageId={reactModule.image.asset._id} caption={reactModule.caption} />;
    default:
      return <span>{type}</span>;
  }
};
