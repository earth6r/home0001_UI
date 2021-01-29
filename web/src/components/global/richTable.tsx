import React from "react";
import { PageLink } from "../link";
import GridRow from "../grid/grid-row";
import { Grid } from "@chakra-ui/core";

export const RichTable = (props) => {
  const { headerRow, rows } = props.data;
  console.log(headerRow)

  // const layout = ["4em", "4em", "4em"]

  return (


    <div className="relative z-0 w-screen pb-1em -mx-mobile md:-mx-desktop flex flex-col">
      {props.data.title && (
        <div className="top-0">
          <div className="relative z-10 px-mobile md:px-desktop md:overflow-x-hidden">
            <h6 className="text-mobileBody md:text-desktopBody">{props.data.title}</h6>
            <div className="md:flex justify-between w-full pt-1/2em">
              {headerRow &&
                headerRow.map((head, index) => {
                  let currentHeader = index;
                  return(
                  <ul className={`mb-4 md:mb-0 inline-block align-top w-1/2 ${
                      index == headerRow.length - 1 ? "min-w-0 md:text-right md:w-2em" : " md:flex-1"
                    } md:w-auto `}>
                  <li
                    key={`header-${head}-${index}`}
                    style={{ minWidth: "16em" }}
                    className="font-normal inline-block text-mobileCaption md:text-desktopCaption uppercase pb-1em relative"
                  >
                    <span className={`${index == headerRow.length - 1 ? "absolute right-0" : ""}`}>
                      {head}
                    </span>
                  </li>
                   <div className="md:mt-2em"></div>
                  {rows &&
                  rows.map((row) => (
                    <li key={`row-${row._key}`} className="flex w-full">
                      {row.cells &&
                        row.cells.map((cell, index) => {
                          if(index == currentHeader && cell.value == ""){
                            <div className="hidden md:visible text-mobileCaption md:text-base  text-mobileCaption  md:text-desktopCaption border-b py-1/4em md:border-none"> 
                               <div className="md:truncate text-mobileCaption md:text-desktopCaption">{cell.value}</div>
                               </div>
                          }else if(index == currentHeader){
                            return(

                               <div className="text-mobileCaption md:text-base  text-mobileCaption  md:text-desktopCaption border-b py-1/4em md:border-none"> 
                               <div className="md:truncate text-mobileCaption md:text-desktopCaption">{cell.value}</div>
                               </div>

                              )

                          }
                         })}
                    </li>
                  ))}
                  </ul>
                  
                )})}
                </div>
     
          </div>
          <div className="absolute -mt-5 w-full h-20 md:h-32 md:h-18 z-0 pointer-events-none top-0 left-0"></div>
        </div>
      )}
      <div className="mx-mobile md:mx-desktop md:mb-2em">
        <GridRow />
      </div>
    </div>

  );
};
