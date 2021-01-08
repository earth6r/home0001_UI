import React, { useState, useEffect, useRef } from "react";
import { GalleryImage } from "../gallery-image";
import GridRow from "../grid/grid-row";
import ReactHtmlParser from "react-html-parser";
import CircleButton from "./circleButton";
import PortableText from "../portableText";
import PdfReader from "./pdfReader";
import clientConfig from '../../../client-config'
import imageUrlBuilder from '@sanity/image-url'
import { PageLink } from "../link";
// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(clientConfig.sanity)

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
function urlFor(source) {
  return builder.image(source)
}
var shuffle = require("shuffle-array");

const FlexGallery = (props) => {
  const { images, url, embeds, pdfs, rowNum, rowNumMobile, texts } = props;
  const myImages = images ? shuffle(images).filter(Boolean) : [];
  const myrandImages = embeds ? shuffle(myImages.concat(embeds)) : myImages;
  const randImages2 = pdfs ? shuffle(myrandImages.concat(pdfs)) : myrandImages;
  const randImages = texts ? shuffle(randImages2.concat(texts)) : randImages2;
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
    
    <div key={2} style={gridStyle} className="w-full z-40 relative flexible-gallery mb-4">

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
      
                if(image.link){
                  let link = image.link.content.main.slug.current;
                  let uri = ""

                  switch (image.link._type) {
                     case "home":
                      uri = "/home";
                      //   alert("set home");
                      break;
                    case "checkout":
                      uri = "/checkout";
                      break;
                    default:
                      uri = "";
                      break;
                  }
                  console.log(image.link)
                return (
                  <div key={image.id} className="flex-item" style={mobile ? styleObjMobile : styleObj}>
                   <PageLink
                      className="internal-link"
                      to={uri +"/" + link}
                    >
                    <img src={urlFor(image)}/> {image.caption && <span className="mt-1 text-sm">{image.caption}</span>}
                    </PageLink>
                  </div>
                
                );
                }else{
                  return (
                    
                  <div key={image.id} className="flex-item" style={mobile ? styleObjMobile : styleObj}>

                      <img src={urlFor(image)}/> {image.caption && <span className="mt-1 text-sm">{image.caption}</span>}
        
                  </div>
                
                );
                }
                
              } else {
                return <></>;
              }
            } else if (image._type == "flexPdf" && typeof window != `undefined`) {
              
              return <div key={image.id} className="flex-item" style={styleObj}><PdfReader key={image._key} file={image.asset.url} /></div>;
            } else if (image._type == "flexText"){
              return(
                <div key={image.id} className="flex-item" style={styleObj}>
                  <PortableText blocks={image.text} />
                </div>
                )
            }else {
              
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
     {url !== undefined && url.title && (
          <div
          key={30}
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
