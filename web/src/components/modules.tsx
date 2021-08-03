import React, { useState, useEffect, useRef } from "react";
import { ArticleModule, ArticleModuleProps } from "./article";
import { StandardText, StandardTextProps } from "./global/standardText";
import { NestedPages, NestedPagesProps } from "./global/nestedPages";
import { AccordionModule } from "./global/accordion";
import { Image } from "./image";
import { PaneModules } from "./paneModules";
import GridRow from "./grid/grid-row";
import { RenderPaneModules } from "../utils/renderPaneModules";
import { Header } from "./global/header";
import CircleButton from "./global/circleButton";
import RdObroundButton from "./global/rdObroundButton";
import SpecButton from "./global/specButton";
import Gallery from "./global/gallery";
import FlexGallery from "./global/flexGallery";
import { InternalLink } from "./global/internalLink";
import { RichTable } from "./global/richTable";

export const Modules = ({
  reactModule,
  type,
  specs = false,
}: {
  type: string;
  reactModule: any;
  specs: boolean;
}) => {
  const [isClient, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  });
  if (!isClient) return null;
  switch (type) {
    case "accordion":
      return (
        <>
          <AccordionModule data={reactModule as AccordionModuleProps["data"]} />
          {reactModule.callibrationMark ? <GridRow></GridRow> : <div className="w-full py-3"></div>}
        </>
      );
    case "standardText":
      return (
        <>
          <StandardText
            className="standard-text"
            specs={specs}
            data={reactModule as StandardTextProps["data"]}
          />
          {reactModule.callibrationMark ? <GridRow></GridRow> : ""}
        </>
      );
    case "article":
      return (
        <>
          <ArticleModule data={reactModule as ArticleModuleProps["data"]} />
          {reactModule.callibrationMark ? <GridRow></GridRow> : <div className="w-full py-3"></div>}
        </>
      );
    case "nestedPages":
      return (
        <>
          <NestedPages data={reactModule as NestedPagesProps["data"]} />
          {reactModule.callibrationMark ? <GridRow></GridRow> : <div className="w-full py-3"></div>}
        </>
      );
    case "gallery":
      // alert(reactModule.images.length);
      return (
        <>
          <Gallery
            images={reactModule.images}
            pdfs={reactModule.pdfs}
            textblocks={reactModule.textblocks}
            embeds={reactModule.embeds}
            blankspaces={reactModule.blankspaces}
            url={reactModule.url}
          />
          {reactModule.callibrationMark ? <GridRow></GridRow> : <div className="w-full py-3"></div>}
        </>
      );
    case "flexGallery":
      // alert(reactModule.images.length);
      return (
        <>
          <FlexGallery
            obroundButtons={reactModule.obroundButtons}
            squares={reactModule.squares}
            images={reactModule.images}
            rowNum={reactModule.numRows}
            rowNumMobile={reactModule.numRowsMobile}
            rowNumTablet={reactModule.numRowsTablet}
            pdfs={reactModule.pdfs}
            texts={reactModule.texts}
            callibrationMarks={reactModule.callibrationMarks}
            embeds={reactModule.embeds}
            edges={reactModule.edges}
            circleButtons={reactModule.circleButtons}
          />
          {reactModule.callibrationMark ? <GridRow></GridRow> : <div className="w-full py-3"></div>}
        </>
      );
    case "pane":
      // alert(reactModule.images.length);
      let offset = reactModule.offset;
      if (typeof window != `undefined`) {
        if (window.innerWidth <= 768) {
          offset = reactModule.mobileOffset;
        }
      }
      let paneColor = reactModule.color ? reactModule.color : "#ffffff";
      let paneStyle = {
        minHeight: "calc(100vh - " + offset + "px)",
      };
      let paneColorStyle = {
        background: paneColor,
        minHeight: "calc(100vh + " + offset + "px)",
        top: "-" + offset + "px",
      };
      let paneGradient = {
        background:
          "linear-gradient(0deg," +
          paneColor +
          "00 0%," +
          paneColor +
          "55 20%," +
          paneColor +
          "75 40%," +
          paneColor +
          "96 75%," +
          paneColor +
          "99 100%)",
      };
      return (
        <div style={paneStyle} className="pane display-flex mb-4">
          <div style={paneColorStyle} className="pane-color">
            {" "}
          </div>
          {RenderPaneModules(reactModule.modules)}
        </div>
      );
    case "imageModule":
      return (
        <>
          <Image imageId={reactModule.image.asset._id} caption={reactModule.caption} />
          {reactModule.callibrationMark ? <GridRow></GridRow> : <div className="w-full py-3"></div>}
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
          {reactModule.callibrationMark ? <GridRow></GridRow> : <div className="w-full py-3"></div>}
        </>
      );
    case "header":
      return <Header title={reactModule.title} number={reactModule.number} />;
    case "circleButton":
      return (
        <>
          <CircleButton
            color={reactModule.color}
            textColor={reactModule.customCircleTextColor}
            customColor={reactModule.customCircleColor}
            title={reactModule.title}
            url={reactModule.url}
            linkHome={reactModule.homeLink}
            linkRnd={reactModule.rndLink}
            float={false}
          />
          {reactModule.callibrationMark ? <GridRow></GridRow> : <div className="w-full py-3"></div>}
        </>
      );
    case "rdObroundButton":
      return (
        <>
          <RdObroundButton
            color={reactModule.color}
            textColor={reactModule.customCircleTextColor}
            customColor={reactModule.customCircleColor}
            title={reactModule.title}
            url={reactModule.url}
            linkHome={reactModule.homeLink}
            linkRnd={reactModule.rndLink}
            float={false}
          />
          {reactModule.callibrationMark ? <GridRow></GridRow> : <div className="w-full py-3"></div>}
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
          {reactModule.callibrationMark ? <GridRow></GridRow> : <div className="w-full py-3"></div>}
        </>
      );
    case "richTable":
      return <RichTable data={reactModule} />;
    case "viewSpacer":
      return <div className="viewSpacer w-full" style={{height: `${reactModule.vh}vh`}}></div>;
    default:
      return "";
  }
};
