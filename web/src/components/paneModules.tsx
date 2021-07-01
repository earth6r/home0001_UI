import React from "react";
import { ArticleModule, ArticleModuleProps } from "./article";
import { StandardText, StandardTextProps } from "./global/standardText";
import { NestedPages, NestedPagesProps } from "./global/nestedPages";
import { AccordionModule } from "./global/accordion";
import { Image } from "./image";
import GridRow from "./grid/grid-row";
import { Header } from "./global/header";
import CircleButton from "./global/circleButton";
import SpecButton from "./global/specButton";
import Gallery from "./global/gallery";
import FlexGallery from "./global/flexGallery";
import { InternalLink } from "./global/internalLink";
import { RichTable } from "./global/richTable";

export const PaneModules = ({ reactModule, type, specs = false }: { type: string; reactModule: any }) => {
  switch (type) {
    case "accordion":
      return (
        <>
          <AccordionModule data={reactModule as AccordionModuleProps["data"]} />
         {reactModule.callibrationMark ? 
         <GridRow></GridRow>
          : <div className="w-full py-3"></div>}
        </>
      );
    case "standardText":
      return (
        <>
          <StandardText className="standard-text" specs={specs} data={reactModule as StandardTextProps["data"]} />
          {reactModule.callibrationMark ? 
         <GridRow></GridRow>
          : ""}
        </>
      );
    case "article":
      return (
        <>
          <ArticleModule data={reactModule as ArticleModuleProps["data"]} />
          {reactModule.callibrationMark ? 
         <GridRow></GridRow>
          : <div className="w-full py-3"></div>}
        </>
      );
    case "nestedPages":
      return (
        <>
          <NestedPages data={reactModule as NestedPagesProps["data"]} />
          {reactModule.callibrationMark ? 
         <GridRow></GridRow>
          : <div className="w-full py-3"></div>}
        </>
      );
    case "gallery":
      // alert(reactModule.images.length);
      return (
        <>
          <Gallery images={reactModule.images} pdfs={reactModule.pdfs} textblocks={reactModule.textblocks} embeds={reactModule.embeds} blankspaces={reactModule.blankspaces} url={reactModule.url} />
          {reactModule.callibrationMark ? 
         <GridRow></GridRow>
          : <div className="w-full py-3"></div>}
        </>
      );
    case "flexGallery":
      // alert(reactModule.images.length);
      return (
        <>
          <FlexGallery obroundButtons={reactModule.obroundButtons} squares={reactModule.squares} images={reactModule.images} callibrationMarks={reactModule.callibrationMarks} rowNum={reactModule.numRows} rowNumTablet={reactModule.numRowsTablet} rowNumMobile={reactModule.numRowsMobile} pdfs={reactModule.pdfs} embeds={reactModule.embeds} edges={reactModule.edges} circleButtons={reactModule.circleButtons} />
          {reactModule.callibrationMark ? 
         <GridRow></GridRow>
          : <div className="w-full py-3"></div>}
        </>
      );
    case "imageModule":
      return (
        <>
          <Image imageId={reactModule.image.asset._id} caption={reactModule.caption} />
          {reactModule.callibrationMark ? 
         <GridRow></GridRow>
          : <div className="w-full py-3"></div>}
        </>
      );
    case "internalLink":
      return (
        <>
          <InternalLink
            color={reactModule.color}
            title={reactModule.title}
            link={reactModule.link}
          />
          {reactModule.callibrationMark ? 
         <GridRow></GridRow>
          : <div className="w-full py-3"></div>}
        </>
      );
    case "header":
      return <Header title={reactModule.title} number={reactModule.number} />;
    case "circleButton":
      return (
        <>
          <CircleButton
            color={reactModule.color}
            title={reactModule.title}
            textColor={reactModule.customCircleTextColor}
            customColor={reactModule.customCircleColor}
            url={reactModule.url}
            linkHome = {reactModule.homeLink}
            linkRnd = {reactModule.rndLink}
            float={false}
          />
          {reactModule.callibrationMark ? 
         <GridRow></GridRow>
          : <div className="w-full py-3"></div>}
        </>
      );
    case "specButton":
      return (
        <>
          <SpecButton
            color={reactModule.color}
            title={reactModule.title}
            url={reactModule.url}
            float={false}
            specs={specs}
          />
          {reactModule.callibrationMark ? 
         <GridRow></GridRow>
          : <div className="w-full py-3"></div>}
        </>
      );
    case "richTable":
      return <RichTable data={reactModule} />;
    default:
      return "";
  }
};
