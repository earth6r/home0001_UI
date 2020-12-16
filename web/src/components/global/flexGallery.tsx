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
  let rowStyle = 5 + "vw";
  for (var i = rowNum - 2; i >= 0; i--) {
     rowStyle = rowStyle + " " + 5 + "vw"
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
                gridColumnEnd: image.endColumn,
                gridRowStart: image.startRow,
                gridRowEnd: image.endRow,
              }
            if (image && image._type == "flexImage") {
              //get ratio of image
              
              console.log(styleObj)
              if (image.asset !== undefined) {
                return (
                  <div className="flex-item" style={styleObj}><img src={image.asset.url}/> </div>
                );
              } else {
                return <></>;
              }
            } else if (image._type == "flexPdf" && typeof window != `undefined`) {
              
              return <div className="flex-item" style={styleObj}><PdfReader key={image._key} file={image.asset.url} /></div>;
            } else if (image._type == "string") {
              return <div></div>;
            } else {
              
              return (

                <div
                  style={styleObj}
                  key={index}
                  className="flex-item html-text"
                >
                  {ReactHtmlParser(image.embedCode)}
                </div>
              );
            }
          })}


        {/* randomly place circle image in an order between 1 and gallery image set length  */}
     {url.title !== undefined && (
          <div
            className="self-center mx-auto z-40 sticky bottom-0 md:relative"
            style={{
        
                gridColumnStart: url.startColumn,
                gridColumnEnd: url.endColumn,
                gridRowStart: url.startRow,
                gridRowEnd: url.endRow,
              
            }}
          >
            
              <CircleButton color={url.color} title={url.title} url={url.url} float={true} />
      
          </div>
             )}



    </div>
  );
};

export default FlexGallery;
