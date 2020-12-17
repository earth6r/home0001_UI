import React, { useState, useEffect, useRef } from "react";
import { GalleryImage } from "../gallery-image";
import GridRow from "../grid/grid-row";
import ReactHtmlParser from "react-html-parser";
import CircleButton from "./circleButton";
// import PdfReader from "./pdfReader";

var shuffle = require("shuffle-array");

const FlexGallery = (props) => {
  const { images, url, embeds, pdfs, rowNum, rowNumMobile } = props;
  const myImages = images ? shuffle(images).filter(Boolean) : [];
  const myrandImages = embeds ? shuffle(images.concat(embeds)) : myImages;
  const randImages = pdfs ? shuffle(myrandImages.concat(pdfs)) : myrandImages;
  const justify = ["justify-start", "justify-center", "justify-between", "justify-end"];
  const [direction, setDirection] = useState();
  const [mobile, setMobile] = useState(false);
  const myRowNum = (mobile && rowNumMobile) ? rowNumMobile : rowNum

  function showPdf(key) {
    let mykey = document.getElementById(key);
    mykey.style.display = "block";
  }
 

  let numbOfRows = 100/myRowNum;
  let rowStyle = 5 + "vw";
  for (var i = myRowNum - 2; i >= 0; i--) {
     rowStyle = rowStyle + " " + 5 + "vw"
   } 

  let gridStyle = {
    gridTemplateRows: rowStyle
  }
  useEffect(() => {
    if(typeof window != `undefined`){
      if(window.innerWidth <= 768){
        setMobile(true)
      }else{
        setMobile(false)
      }
      window.onresize = function(event) {
         if(window.innerWidth <= 768){
            setMobile(true)
          }else{
            setMobile(false)
          }
      };
    }

  })

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
            let styleObjMobile = {
                gridColumnStart: image.startColumnMobile,
                gridColumnEnd: image.endColumnMobile,
                gridRowStart: image.startRowMobile,
                gridRowEnd: image.endRowMobile,
              }
            if (image && image._type == "flexImage") {
              //get ratio of image
              

              if (image.asset !== undefined) {
                return (
                  <div className="flex-item" style={mobile ? styleObjMobile : styleObj}><img src={image.asset.url}/> </div>
                );
              } else {
                return <></>;
              }
            } else if (image._type == "flexPdf" && typeof window != `undefined`) {
              
              return <div className="flex-item" style={styleObj}>PDF READER TEMPORARY DISABLED</div>;
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
            className="self-center mx-auto z-40 bottom-0 md:relative"
            style={{
        
                gridColumnStart: mobile ? url.startColumnMobile : url.startColumn,
                gridColumnEnd: mobile ? url.endColumnMobile : url.endColumn,
                gridRowStart: mobile ? url.startRowMobile : url.startRow,
                gridRowEnd: mobile ? url.endRowMobile : url.endRow,
              
            }}
          >
            
              <CircleButton color={url.color} title={url.title} url={url.url} float={true} />
      
          </div>
             )}



    </div>
  );
};

export default FlexGallery;
