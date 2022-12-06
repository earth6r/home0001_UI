import React from "react";
import { ArticleModule, ArticleModuleProps } from "./article";
import { StandardText, StandardTextProps } from "./global/standardText";
import { NestedPages, NestedPagesProps } from "./global/nestedPages";
import { AccordionModule, AccordionModuleProps } from "./global/accordion";
import { Image } from "./image";
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
import { RowLinkTable, RowLinkTableProps } from "./global/rowLinkTable";
import { ColumnHeaderTable, ColumnHeaderTableProps } from "./global/columnHeaderTable";
import HeroRnd from "./heroRnd";
import ArticleSection from "./articleSection";
import LiveVideo from "./liveVideo";

type specs = {
  callibrationMarks: boolean;
  color: string;
  title: string;
  _type: string;
};
export const Modules = ({
  reactModule,
  type,
  specs
}: {
  type: string;
  reactModule: any;
  specs: specs | undefined;
}) => {
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
          <StandardText specs={specs} data={reactModule as StandardTextProps["data"]} />
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
    case "articleSection":
      return (
        <>
          <ArticleSection mainImage={reactModule.mainImage} content={reactModule.content} />
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
    case "heroRnd":
      return (
        <>
          <HeroRnd
            images={reactModule.images ?? []}
            thumbnails={reactModule.thumbnails ?? []}
            titles={reactModule.titles ?? []}
            showTitles={reactModule.showTitles}
            videos={reactModule.youtubeVideos ?? []}
          />
          {reactModule.callibrationMark ? <GridRow></GridRow> : <div className="w-full py-3"></div>}
        </>
      );
    case "liveVideo":
      return (
        <>
          <LiveVideo
            description={reactModule.description}
            image={reactModule.placeholderImage}
            links={reactModule.links ?? []}
            vimeoEventId={reactModule.vimeoEventId}
            vimeoEmbedId={reactModule.vimeoEmbedId}
            showOnlyPlaceholder={reactModule.showOnlyPlaceholder}
          />
          {reactModule.callibrationMark ? <GridRow></GridRow> : <div className="w-full py-3"></div>}
        </>
      );
    case "flexGallery":
      // alert(reactModule.images.length);

      // flex galleries were causing cumulative layout shift due to having no height at initial DOM render
      // flx galleries are now wrapped in a box whose height is driven by padding according to its number of rows
      // not sure what to do about the non-linear scaling other than breaking it up like this
      // https://css-tricks.com/aspect-ratio-boxes/
      return (
        <>
          <style scoped>
            {`.flex-layout-padding-${reactModule._key} {
                position: relative;
                height: 0;
                width: 100%;
                padding-top: ${reactModule.numRows * 1.028 + "%"};
            }
            @media (max-width: 2000px) {
                .flex-layout-padding-${reactModule._key} {
                  padding-top: ${reactModule.numRows * 1.038 + "%"};
                }
            }
            @media (max-width: 1536px) {
                .flex-layout-padding-${reactModule._key} {
                  padding-top: ${reactModule.numRows * 1.045 + "%"};
                }
            }
            @media (max-width: 1280px) {
                .flex-layout-padding-${reactModule._key} {
                  padding-top: ${reactModule.numRows * 1.058 + "%"};
                }
            }
            @media (max-width: 1024px) {
                .flex-layout-padding-${reactModule._key} {
                  padding-top: ${reactModule.numRowsTablet * 1.066 + "%"};
                }
            }
            @media (max-width: 900px) {
                .flex-layout-padding-${reactModule._key} {
                  padding-top: ${reactModule.numRowsTablet * 1.078 + "%"};
                }
            }
            @media (max-width: 767px) {
                .flex-layout-padding-${reactModule._key} {
                  padding-top: ${reactModule.numRowsMobile * 1.065 + "%"};
                }
            }
            @media (max-width: 646px) {
                .flex-layout-padding-${reactModule._key} {
                  padding-top: ${reactModule.numRowsMobile * 1.07 + "%"};
                }
            }
            @media (max-width: 600px) {
                .flex-layout-padding-${reactModule._key} {
                  padding-top: ${reactModule.numRowsMobile * 1.085 + "%"};
                }
            }
            @media (max-width: 500px) {
                .flex-layout-padding-${reactModule._key} {
                  padding-top: ${reactModule.numRowsMobile * 1.096 + "%"};
                }
            }
            @media (max-width: 450px) {
                .flex-layout-padding-${reactModule._key} {
                  padding-top: ${reactModule.numRowsMobile * 1.109 + "%"};
                }
            }
            @media (max-width: 400px) {
                .flex-layout-padding-${reactModule._key} {
                  padding-top: ${reactModule.numRowsMobile * 1.12 + "%"};
                }
            }
            @media (max-width: 350px) {
                .flex-layout-padding-${reactModule._key} {
                  padding-top: ${reactModule.numRowsMobile * 1.15 + "%"};
                }
            }`}
          </style>
          <div className={`flex-layout-padding-${reactModule._key}`}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
              <FlexGallery
                obroundButtons={reactModule.obroundButtons}
                squares={reactModule.squares}
                images={reactModule.images}
                rowNum={reactModule.numRows}
                rowNumMobile={reactModule.numRowsMobile}
                rowNumTablet={reactModule.numRowsTablet}
                pdfs={reactModule.pdfs}
                texts={reactModule.texts}
                verticalTexts={reactModule.verticalTexts}
                callibrationMarks={reactModule.callibrationMarks}
                embeds={reactModule.embeds}
                edges={reactModule.edges}
                circleButtons={reactModule.circleButtons}
              />
              {reactModule.callibrationMark ? <GridRow></GridRow> : ""}
            </div>
          </div>
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
        minHeight: "calc(100vh - " + offset + "px)"
      };
      let paneColorStyle = {
        background: paneColor,
        minHeight: "calc(100vh + " + offset + "px)",
        top: "-" + offset + "px"
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
          "99 100%)"
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
            openSignupModal={reactModule.openSignupModal}
            color={reactModule.color}
            textColor={reactModule.customCircleTextColor}
            modalTitle={reactModule.modalTitle}
            modalSubtitle={reactModule.modalSubtitle}
            customColor={reactModule.customCircleColor}
            title={reactModule.title}
            url={reactModule.url}
            linkHome={reactModule.homeLink}
            linkRnd={reactModule.rndLink}
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
    case "rowLinkTable":
      return <RowLinkTable data={reactModule as RowLinkTableProps["data"]} />;
    case "columnHeaderTable":
      return <ColumnHeaderTable data={reactModule as ColumnHeaderTableProps["data"]} />;
    case "viewSpacer":
      return <div className="viewSpacer w-full" style={{ height: `${reactModule.vh}vh` }}></div>;
    default:
      return "";
  }
};
