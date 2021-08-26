import React from "react";
import { PageLink } from "../link";
import GridRow from "../grid/grid-row";
import { Grid } from "@chakra-ui/core";

export const RichTable = (props) => {
  const { rows } = props.data;
 
  return (
    <>
      <div className="relative z-0 pb-1em w-full flex flex-col">
        <div className="relative z-10 overflow-x-hidden">
          <div className="flex justify-left w-full pt-1/2em">
            <ul className={`mb-0 align-top flex-1 w-auto`}>
              {rows && rows.map((row) => (
                <li key={`row-${row._key}`} className="flex pl-0">
                  {row.cells && row.cells.map((cell, index) => {
                    if(cell.value == ""){
                      <div className="visible py-1/4em border-none pl-0"> 
                        <div className="truncate text-mobileCaption lg:text-desktopCaption">{cell.value}</div>
                      </div>
                    }else {
                      return(
                        <div className="w-1/2 md:w-1/4 px-1 py-1/4em border-none pl-0"> 
                          <div className="truncate text-mobileBody lg:text-desktopBody">{cell.value}</div>
                        </div>
                      )
                    }
                  })}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
