import React from "react";

import { StandardText, StandardTextProps } from "./global/standardText";
import { NestedPages, NestedPagesProps } from "./global/nestedPages";
import { AccordionModule } from "./global/accordion";
import { Image } from "./image";
import GridRow from "./grid/grid-row";
import { Header } from "./global/header";
import CircleButton from "./global/circleButton";

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
        <>
          <Image imageId={reactModule.image.asset._id} caption={reactModule.caption} />
          <GridRow></GridRow>
        </>
      );
    case "header":
      return <Header title={reactModule.title} number={reactModule.number} />;
    case "circleButton":
      return <CircleButton title={reactModule.title} url={reactModule.url} />;
    default:
      return <span>{type}</span>;
  }
};
