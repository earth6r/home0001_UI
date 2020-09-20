import React from "react";

import { StandardText, StandardTextProps } from "./global/standardText";
import { NestedPages, NestedPagesProps } from "./global/nestedPages";
import { AccordionModule } from "./global/accordion";
import { Image } from "./image";
import GridRow from "./grid/grid-row";

export const Modules = ({ reactModule, type }: { type: string; reactModule: any }) => {
  switch (type) {
    case "accordion":
      return (
        <>
          <AccordionModule data={reactModule as AccordionModuleProps["data"]} />
          <GridRow></GridRow>
        </>
      );
    case "standardText":
      return (
        <>
          <StandardText data={reactModule as StandardTextProps["data"]} />
          <GridRow></GridRow>
        </>
      );
    case "nestedPages":
      return (
        <>
          <NestedPages data={reactModule as NestedPagesProps["data"]} />
          <GridRow></GridRow>
        </>
      );
    case "imageModule":
      //console.log(reactModule);
      return (
        <GridRow>
          <Image imageId={reactModule.image.asset._id} caption={reactModule.caption} />
        </GridRow>
      );
    default:
      return <span>{type}</span>;
  }
};
