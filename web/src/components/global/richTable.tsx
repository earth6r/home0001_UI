import React from "react";
import { PageLink } from "../link";
import GridRow from "../grid/grid-row";
import { Grid } from "@chakra-ui/core";

export const RichTable = (props) => {
  const { title, headerRow, rows } = props.data;
  // const headerRow = props.data.headerRow ? props.data.headerRow : undefined;

  if (headerRow !== undefined) {
    return (
      <>
        {title &&
          <>
            <h3 className="text-mobileBody md:text-desktopBody pb-1em pt-1/4em">
              {title}
            </h3>
            <div className="w-full ">
              <GridRow />
            </div>
          </>
        }
        <div className="relative z-0 pb-1em w-full flex flex-col">
              <div className="relative z-10 px-mobile md:px-desktop md:overflow-x-hidden">
                <div className="md:flex justify-between w-full pt-1/2em">
                  {headerRow && headerRow.map((head, index) => {
                    let currentHeader = index;
                    console.log("head-->", head)
                    if (head.length > 0) {
                      return (
                        <ul className={`mb-4 md:mb-0 inline-block align-top w-1/2 md:flex-1 md:w-auto `}>
                          <li
                            key={`header-${head}-${index}`}
                            style={{ minWidth: "16em" }}
                            className="font-normal inline-block text-mobileCaption md:text-desktopCaption uppercase pb-1em relative"
                           >
                            <span>
                              {head}
                            </span>
                          </li>
                          <div className="md:mt-2em"></div>
                            {rows &&
                              rows.map((row) => (
                                <li key={`row-${row._key}`} className="flex w-full">
                                  {row.cells &&
                                    row.cells.map((cell, index) => {
                                      if (index == currentHeader && cell.value == "") {
                                        <div className="hidden md:visible md:text-base  text-mobileCaption  md:text-desktopCaption border-b py-1/4em md:border-none">
                                          <div className="md:truncate text-mobileCaption md:text-desktopCaption">{cell.value}</div>
                                        </div>
                                      } else if (index == currentHeader) {
                                        return (
                                          <div className="md:text-base  text-mobileCaption  md:text-desktopCaption border-b py-1/4em md:border-none">
                                            <div className="md:truncate text-mobileCaption md:text-desktopCaption">{cell.value}</div>
                                          </div>
                                        )
                                      }
                                    })}
                                </li>
                              ))}
                        </ul>
                      )
                    }
                  })}
              </div>
              <div className="absolute -mt-5 w-full h-20 md:h-32 md:h-18 z-0 pointer-events-none top-0 left-0"></div>
            </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="relative z-0 w-full flex flex-col">
        <div className="relative z-10 overflow-x-hidden">
          <div className="flex justify-left w-full">
            <ul className={`mb-0 align-top flex-1 pb-0 table w-full`}>
              {rows && rows.map((row) => (
                <PageLink className="table-link" to={row.cells[0] && row.cells[0].url ? row.cells[0].url : "/"}>
                  <li key={`row-${row._key}`} className="flex pl-0 hover:underline">
                    {row.cells && row.cells.map((cell, index) => {
                      if (cell.value == "") {
                        <div className="visible py-1/4em border-none pl-0">
                          <div className="truncate text-mobileCaption lg:text-desktopCaption">{cell.value}</div>
                        </div>
                      } else {
                        return (
                          <div className={`${index == 2 ? "w-1/6" : "w-1/2 pr-1"} sm:w-1/4 py-1/4em border-none`}>
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
