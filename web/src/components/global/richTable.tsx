import React from "react";
import { PageLink } from "../link";
import GridRow from "../grid/grid-row";
import { Grid } from "@chakra-ui/core";

export const RichTable = (props) => {
  const { headerRow, rows } = props.data;
  console.log(props);

  // const layout = ["4em", "4em", "4em"]

  return (
    <div className="relative z-0 w-screen pb-1em -mx-mobile md:-mx-desktop flex flex-col">
      {props.data.title && (
        <div className="sticky top-0">
          <div className="relative z-10 px-mobile md:px-desktop md:overflow-x-hidden pb-2em">
            <h6 className="text-mobileBody md:text-desktopBody">{props.data.title}</h6>
            <ul className="flex justify-between w-full pt-1/2em">
              {headerRow &&
                headerRow.map((head, index) => (
                  <li
                    key={`header-${head}-${index}`}
                    style={{ minWidth: "16em" }}
                    className={`${
                      index == headerRow.length - 1 ? "min-w-0 md:text-right md:w-2em" : " flex-1"
                    } font-normal inline-block text-mobileCaption md:text-desktopCaption uppercase pb-1em relative`}
                  >
                    <span className={`${index == headerRow.length - 1 ? "absolute right-0" : ""}`}>
                      {head}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="absolute -mt-5 w-full h-20 md:h-32 md:h-18 z-0 gradient-to-b pointer-events-none top-0 left-0"></div>
        </div>
      )}
      <ul className="w-full px-mobile md:px-desktop text-mobileCaption md:text-desktopCaption flex-1 flex flex-col md:text-base ">
        {rows &&
          rows.map((row) => (
            <li key={`row-${row._key}`} className="flex w-full">
              {row.cells &&
                row.cells.map((cell, index) => (
                  <div
                    key={`row-${row._key}-cell-${index}`}
                    style={{ minWidth: "16em", borderColor: "black" }}
                    className={`${
                      index == row.cells.length - 1
                        ? "min-w-0 md:text-right md:w-2em pr-2em md:pr-0"
                        : " flex-1 pr-1em"
                    } text-mobileCaption  md:text-desktopCaption border-b py-1/4em md:border-none`}
                  >
                    <div className="md:truncate text-mobileCaption md:text-desktopCaption">
                      {cell.value}
                    </div>
                  </div>
                ))}
            </li>
          ))}
      </ul>
      <div className="mx-mobile md:mx-desktop">
        <GridRow />
      </div>
    </div>
  );
};
