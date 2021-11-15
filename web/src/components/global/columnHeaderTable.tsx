import React from "react";
import { PageLink } from "../link";
import GridRow from "../grid/grid-row";

export interface ColumnHeaderTableProps {
  data: {
    title: string;
    headers: any[];
    rows: any[];
  };
}

export const ColumnHeaderTable = ({ data }: ColumnHeaderTableProps) => {
  const { title, headers, rows } = data;
  return (
    <div>
      {title && (
        <>
          <h3 className="text-mobileBody md:text-desktopBody pb-1/4em md:pb-1em pt-1/4em">{title}</h3>
          <div className="w-full ">
            <GridRow />
          </div>
        </>
      )}
      <div className="relative z-0 pb-1em w-full flex flex-col">
        <div className="relative z-10 px-mobile md:px-desktop md:overflow-x-hidden">
          <div className="md:flex justify-between w-full pt-1/2em">
            {headers &&
              headers.map((head, index) => {
                let currentHeader = index;
                if (head.length > 0) {
                  return (
                    <ul
                      className={`mb-4 md:mb-0 pr-5 inline-block align-top w-1/2 md:flex-1 md:w-auto column-header `}
                    >
                      <li
                        key={`header-${head}-${index}`}
                        style={{ minWidth: "16em" }}
                        className="font-normal inline-block text-mobileCaption md:text-desktopCaption uppercase pb-1em px-0 relative"
                      >
                        <span>{head}</span>
                      </li>
                      <div className="md:mt-2em"></div>
                      {rows &&
                        rows.map((row) => {
                          return (
                            <li key={`row-${row._key}`} className="flex w-full list-none px-0">
                              {row.cells &&
                                row.cells.map((cell, index) => {
                                  if (index == currentHeader && !cell.desktopText) {
                                   return (<div className="md:text-base  text-mobileCaption  md:text-desktopCaption border-b py-1/4em md:border-none">
                                      <div className="md:truncate text-mobileCaption md:text-desktopCaption">
                                        {cell.mobileText}
                                      </div>
                                    </div>);
                                  } else if (index == currentHeader) {
                                    return (
                                      <div className="md:text-base text-mobileCaption md:text-desktopCaption border-b py-1/4em md:border-none">
                                        {cell.url ? (
                                          <a href={cell.url} target="blank">
                                            <div
                                              className={`md:truncate text-mobileCaption md:text-desktopCaption ${
                                                cell.mobileText ? "hidden md:block" : "block"
                                              }`}
                                            >
                                              {cell.desktopText}
                                            </div>
                                            <div
                                              className={`text-mobileCaption ${
                                                cell.mobileText ? "visible md:hidden" : "hidden"
                                              }`}
                                            >
                                              {cell.mobileText}
                                            </div>
                                          </a>
                                        ) : (
                                          <>
                                            <div
                                              className={`md:truncate text-mobileCaption md:text-desktopCaption ${
                                                cell.mobileText ? "hidden md:block" : "block"
                                              }`}
                                            >
                                              {cell.desktopText}
                                            </div>
                                            <div
                                              className={`text-mobileCaption ${
                                                cell.mobileText ? "visible md:hidden" : "hidden"
                                              }`}
                                            >
                                              {cell.mobileText}
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    );
                                  }
                                })}
                            </li>
                          );
                        })}
                    </ul>
                  );
                }
              })}
          </div>
          <div className="absolute -mt-5 w-full h-20 md:h-32 z-0 pointer-events-none top-0 left-0"></div>
        </div>
      </div>
    </div>
  );
};
