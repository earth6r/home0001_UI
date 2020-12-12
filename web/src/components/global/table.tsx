import React from "react";
import { PageLink } from "../link";
import GridRow from "../grid/grid-row";

export const Table = (props) => {
  const { data } = props;


  return (
    <>
      <div className="relative z-0 w-screen overflow-x-scroll -mx-mobile md:-mx-desktop flex">
        <div className="w-full flex">
          <div className="flex flex-col w-full flex-1 w-auto  md:text-base mx-mobile md:mx-desktop">
            {data.table.rows &&
              data.table.rows.map((row, rowIndex) => (
                <div className="m-0 p-0 list-none w-full flex">
                  {row.cells &&
                    row.cells.map((cell, cellIndex) => (
                      <>
                        {rowIndex !== 0 ? (
                          <div
                            style={{ minWidth: "10em" }}
                            className={`${
                              cellIndex == row.cells.length ? " pr-mobile md:pr-desktop" : ""
                            } pr-2em flex-1 w-3/10 text-base whitespace-no-wrap truncate md:text-base my-contentOffsetDesktopborder-b border-black`}
                          >
                            {cell}
                          </div>
                        ) : (
                          <div
                            style={{ minWidth: "10em", maxWidth: "em" }}
                            className="flex-1 w-3/10 text-left pb-1em mb-1em border-none text-base truncate font-normal   border-b border-black"
                          >
                            <span
                              style={{ borderColor: "#000000" }}
                              className="mb-1em text-sm block border-b pb-1em"
                            >
                              {cell}
                            </span>
                          </div>
                        )}
                      </>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
      <GridRow />
    </>
  );
};
