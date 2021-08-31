import React from "react";
import { PageLink } from "../link";
import GridRow from "../grid/grid-row";
import { Grid } from "@chakra-ui/core";

export const RichTable = (props) => {
  const { rows } = props.data;
 
  console.log(rows[0].cells[0].url);
  
  return (
    <>
      <div className="relative z-0 w-full flex flex-col">
        <div className="relative z-10 overflow-x-hidden">
          <div className="flex justify-left w-full">
            <ul className={`mb-0 align-top flex-1 w-auto pb-0 table`}>
              {rows && rows.map((row) => (
                <PageLink className="table-link" to={row.cells[0] && row.cells[0].url ? row.cells[0].url : "/"}>
                  <li key={`row-${row._key}`} className="flex pl-0 hover:underline">
                    {row.cells && row.cells.map((cell, index) => {
                      if(cell.value == ""){
                        <div className="visible py-1/4em border-none pl-0"> 
                          <div className="truncate text-mobileCaption lg:text-desktopCaption">{cell.value}</div>
                        </div>
                      }else {
                        return(
                          <div className={`${index == 2? "w-1/6": "w-1/2 pr-1"} sm:w-1/4 py-1/4em border-none`}> 
                            <div className="truncate text-smallBody tiny:text-mobileBody lg:text-desktopBody">{cell.value}</div>
                          </div>
                        )
                      }
                    })}
                  </li>
                </PageLink>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
