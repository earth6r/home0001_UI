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
  const { images, circleButtons, embeds, pdfs, rowNum, rowNumMobile, texts } = props;
  const myImages = images ? shuffle(images).filter(Boolean) : [];
  const myrandImages = embeds ? shuffle(myImages.concat(embeds)) : myImages;
  const randImages2 = pdfs ? shuffle(myrandImages.concat(pdfs)) : myrandImages;
  const randImages3 = texts ? shuffle(randImages2.concat(texts)) : randImages2;
  const randImages = circleButtons ? shuffle(randImages3.concat(circleButtons)) : randImages3;
  const justify = ["justify-start", "justify-center", "justify-between", "justify-end"];
  const [direction, setDirection] = useState();
  const [mobile, setMobile] = useState(false);
  const myRowNum = (mobile && rowNumMobile) ? rowNumMobile : rowNum
const [isClient, setClient] = useState(false);
  function showPdf(key) {
    let mykey = document.getElementById(key);
    mykey.style.display = "block";
  }
 

  let numbOfRows = 100/myRowNum;
  let rowStyle = 1 + "vw";
  for (var i = myRowNum - 2; i >= 0; i--) {
     rowStyle = rowStyle + " " + 1 + "vw"
   } 

  let gridStyle = {
    gridTemplateRows: rowStyle
  }
  useEffect(() => {
    setClient(true)
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
  if ( !isClient ) return null;
  return (
    

    <div style={gridStyle} className="w-full z-40 relative mb-4 flexible-gallery">

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
                    <img src={urlFor(image)}/> {image.caption && <span className="mt-1 block text-sm">{image.caption}</span>}
                    </PageLink>
                  </div>
                
                );
                }else{
                  return (
                    
                  <div key={image.id} className="flex-item" style={mobile ? styleObjMobile : styleObj}>

                      <img src={urlFor(image)}/> {image.caption && <span className="mt-1 block text-sm">{image.caption}</span>}
        
                  </div>
                
                );
                }
                
              } else {
                return <></>;
              }
            } else if (image._type == "flexPdf" && typeof window != `undefined`) {
              
              return <div key={image.id} className="flex-item" style={mobile ? styleObjMobile : styleObj}><PdfReader key={image._key} file={image.asset.url} /></div>;
            } else if (image._type == "flexText"){
              return(
                <div key={image.id} className="flex-item" style={mobile ? styleObjMobile : styleObj}>
                  <PortableText blocks={image.text} />
                </div>
                )
            } else if (image._type == "flexCircle"){
              return(
                <>
                {image !== undefined && image.title && (
          <div
          key={30}
            className="self-center mx-auto z-40 bottom-0 md:relative"
            style={{
        
                gridColumnStart: mobile ? image.startColumnMobile : image.startColumn,
                gridColumnEnd: mobile ? image.endColumnMobile : image.endColumn,
                gridRowStart: mobile ? image.startRowMobile : image.startRow,
                gridRowEnd: mobile ? image.endRowMobile : image.endRow,
              
            }}
          >
            
              <CircleButton color={image.color} title={image.title} url={image.url} float={true} />
      
          </div>
             )}
                </>
              )
            } else {
              
              return (

                <div
                  style={mobile ? styleObjMobile : styleObj}
                  key={index}
                  className="flex-item html-text"
                >
                  {ReactHtmlParser(image.embedCode)}
                </div>
              );
            }
          })}


        {/* randomly place circle image in an order between 1 and gallery image set length  */}
     



    </div>
  );
};

export default FlexGallery;
