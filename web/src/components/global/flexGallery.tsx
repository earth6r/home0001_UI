import React, { useState, useEffect, useRef } from "react";
import { GalleryImage } from "../gallery-image";
import GridRow from "../grid/grid-row";
import ReactHtmlParser from "react-html-parser";
import CircleButton from "./circleButton";
import PdfReader from "./pdfReader";

var shuffle = require("shuffle-array");

const FlexGallery = (props) => {
  const { images, url, embeds, pdfs, rowNum } = props;
  const myImages = images ? shuffle(images).filter(Boolean) : [];
  const myrandImages = embeds ? shuffle(images.concat(embeds)) : myImages;
  const randImages = pdfs ? shuffle(myrandImages.concat(pdfs)) : myrandImages;
  const justify = ["justify-start", "justify-center", "justify-between", "justify-end"];
  const [direction, setDirection] = useState();
  
 

  function showPdf(key) {
    let mykey = document.getElementById(key);
    mykey.style.display = "block";
  }
 

  let numbOfRows = 100/rowNum;
  let rowStyle = numbOfRows.toString() + "%";
  for (var i = rowNum - 2; i >= 0; i--) {
     rowStyle = rowStyle + " " + numbOfRows + "%"
   } 
  let gridStyle = {
    gridTemplateRows: rowStyle
  }

  return (
    
    <div style={gridStyle} className="w-full z-40 relative flexible-gallery">

        {randImages &&
          randImages.map((image, index) => {
            // console.log(image);
            let styleObj = {
                gridColumnStart: image.startColumn,
                gridColumnEnd:image.endColumn,
                gridRowStart: image.startRow,
                gridRowEnd:image.endRow,
              }
            if (image && image._type == "flexImage") {
              //get ratio of image
              
              console.log(styleObj)
              if (image.asset !== undefined) {
                return (
                  <img style={styleObj} className="flex-item" src={image.asset.url}/>
                );
              } else {
                return <></>;
              }
            } else if (image._type == "flexPdf") {
              
              return <div style={styleObj}><PdfReader key={image._key} file={image.asset.url} /></div>;
            } else if (image._type == "string") {
              return <div></div>;
            } else {
              
              return (

                <div
                  style={styleObj}
                  key={index}
                  className="align-middle gallery-image w-9/20 md:w-8/20 py-2 self-undefined mx-auto html-text"
                >
                  {ReactHtmlParser(image.embedCode)}
                </div>
              );
            }
          })}


        {/* randomly place circle image in an order between 1 and gallery image set length  */}
        {url !== undefined && randImages.length > 2 ? (
          <div
            className="self-center mx-auto z-40 sticky bottom-0 md:relative"
            style={{
              order: `${Math.floor(Math.random() * randImages.length - 2)}`,
            }}
          >
            {url.title !== undefined && (
              <CircleButton title={url.title} url={url.url} float={true} />
            )}
          </div>
        ) : (
          <div
            className="self-center py-1 md:py-1em mx-auto z-50 sticky md:relative"
            style={{
              order: `${Math.floor(Math.random() * randImages.length)}`,
              bottom: "1em",
              top: "1em",
            }}
          >
            {url !== undefined && url.title !== undefined && (
              <CircleButton title={url.title} url={url.url} float={false} />
            )}
          </div>
        )}



    </div>
  );
};

export default FlexGallery;
