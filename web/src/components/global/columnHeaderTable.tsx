import React from "react";
import ReactHtmlParser from "react-html-parser";
export interface ColumnHeaderTableProps {
  data: {
    title: string;
    tableSpacer: string;
    headers: any[];
    rows: any[];
  };
}

export const ColumnHeaderTable = ({ data }: ColumnHeaderTableProps) => {
  const { title, tableSpacer, headers, rows } = data;
  return (
    <div>
      {title && (
        <>
          <h3 className="text-mobileBody md:text-desktopBody pb-1/4em md:pb-1em pt-1/4em">{title}</h3>
          {tableSpacer &&
            <div style={{ width: "100%", height: `${tableSpacer}vh` }}></div>
          }
        </>
      )}
      <div className="relative z-0 pb-1em w-full flex flex-col">
        <div className="relative z-10 px-mobile md:px-desktop md:overflow-x-hidden">
          <div className="md:flex md:flex-wrap justify-between w-full">
            {headers &&
              headers.map((head, index) => {
                let currentHeader = index;
                if (head.length > 0) {
                  return (
                    <ul
                      className={`mb-4 pr-5 pt-1/2em inline-block align-top w-1/2 md:flex-1 md:w-auto column-header`}
                    >
                      <li
                        key={`header-${head}-${index}`}
                        style={{ minWidth: "16em" }}
                        className="font-normal inline-block text-mobileCaption md:text-desktopCaption uppercase pb-1em pl-0 relative"
                      >
                        <span>{head}</span>
                      </li>
                      <div className="md:mt-2em"></div>
                      {rows &&
                        rows.map((row) => {
                          return (
                            <li key={`row-${row._key}`} className="flex w-full px-0">
                              {row.cells &&
                                row.cells.map((cell, index) => {
                                  if (index == currentHeader) {
                                    return (
                                      <div className="md:text-base text-mobileCaption md:text-desktopCaption border-b py-1/4em md:border-none">
                                        {cell.url ? <LinkCell url={cell.url} desktopText={cell.desktopText} mobileText={cell.mobileText} /> : <TextCell desktopText={cell.desktopText} mobileText={cell.mobileText} />}
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

const LinkCell = (props) => {
  const { url, mobileText, desktopText } = props;
  return (
    <a href={url} target="blank">
      <div
        className={`md:truncate text-mobileCaption md:text-desktopCaption ${mobileText ? "hidden md:block" : "block"
          }`}
      >
        {ReactHtmlParser(desktopText)}
      </div>
      {mobileText && <div
        className={"text-mobileCaption inline-block md:hidden"}
      >
        {ReactHtmlParser(mobileText)}
      </div>
      }
    </a>
  )
}

const TextCell = (props) => {
  const { desktopText, mobileText } = props;
  return (
    <>
      <div
        className={`md:truncate text-mobileCaption md:text-desktopCaption ${mobileText ? "hidden md:block" : "block"
          }`}
      >
        {ReactHtmlParser(desktopText)}
      </div>
      {mobileText && <div
        className={"text-mobileCaption inline-block md:hidden"}
      >
        {ReactHtmlParser(mobileText)}
      </div>}
    </>
  )
}