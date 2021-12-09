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
  const { title, tableSpacer, headers, rows} = data;
  return (
    <div className={`w-full`}>
      {title && (
        <>
          <h3 className="text-mobileBody md:text-desktopBody pb-1/4em md:pb-1em pt-1/4em">{title}</h3>
          {tableSpacer &&
            <div style={{ width: "100%", height: `${tableSpacer}vh` }}></div>
          }
        </>
      )}
      <div className="w-full relative z-0 pb-1em">
        <div className="relative z-10 px-mobile md:px-desktop md:overflow-x-hidden">
          <div className="w-full flex flex-wrap lg:flex-no-wrap justify-between">
            {headers &&
              headers.map((head, index) => {
                let currentHeader = index;
                if (head.length > 0) {
                  return (
                    <ul
                      className={`mb-4 pr-5 pt-1/2em w-autoinline-block align-top column-header`}
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
                            <li key={`row-${row._key}`} className="flex flex-row center py-0 px-0">
                              {row.cells &&
                                row.cells.map((cell, index) => {
                                  if (index == currentHeader) {
                                    return (
                                      <div className="md:text-base text-mobileCaption md:text-desktopCaption border-b py-1/4em md:border-none">
                                        {cell.url ? <LinkCell url={cell.url} desktopText={cell.desktopText} hideTablet={cell.hideTablet} mobileText={cell.mobileText} hideMobile={cell.hideMobile} /> : <TextCell desktopText={cell.desktopText} mobileText={cell.mobileText} hideMobile={cell.hideMobile} hideTablet={cell.hideTablet}/>}
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
  const { url, mobileText, desktopText, hideTablet, hideMobile } = props;
  return (
    <a href={url} target="blank">
      <div
        className={`md:truncate text-mobileCaption md:text-desktopCaption ${mobileText ? "hidden md:inline-block" : "inline-block"
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
  const { desktopText, mobileText, hideTablet, hideMobile } = props;
  return (
    <>
      <div
        className={`md:truncate text-mobileCaption md:text-desktopCaption ${!!mobileText || !!hideMobile ? "hidden" : "inline-block"} ${!!hideTablet ? "sm:hidden lg:inline-block" : "sm:inline-block"}`}
      >
        {ReactHtmlParser(desktopText)}
      </div>
      {mobileText && <div
        className={"text-mobileCaption inline-block sm:hidden"}
      >
        {ReactHtmlParser(mobileText)}
      </div>}
    </>
  )
}