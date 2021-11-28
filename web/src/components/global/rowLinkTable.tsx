import React from "react";
import ReactHtmlParser from "react-html-parser";
import { PageLink } from "../link";

export interface RowLinkTableProps {
  data: {
    rows: any[];
    desktopWidth?: string;
  };
}

const handleRowClick = (e) => {
  e.preventDefault();
  let url = e.target.getAttribute("data-link");
  if (window) window.location = url;
}

export const RowLinkTable = ({ data }: RowLinkTableProps) => {
  const { rows, desktopWidth } = data;
  return (
    <div className={`w-full ${desktopWidth ? `sm:w-${desktopWidth}`: ""}`}>
      <table className={`w-full`}>
        {rows && rows.map((row) => (
          <tr key={`row-${row._key}`} className="hover:underline cursor-pointer">
            <PageLink to={row.cells[0] && row.cells[0].url ? row.cells[0].url : "/"} className="w-full contents">
              {row.cells && row.cells.map((cell, index) => {
                return (
                  <td key={`cell-${cell._key}`} className={`py-1/4em border-none`}>
                    <div className={`truncate text-smallBody ${cell.mobileText || cell.hideMobile ? "hidden" : "inline-block"} ${cell.hideTablet ? "sm:hidden lg:inline-block" : "sm:inline-block"} lg:text-desktopBody`}>{ReactHtmlParser(cell.desktopText)}</div>
                    <div className={`truncate text-smallBody ${cell.mobileText && !cell.hideMobile ? "inline-block  sm:hidden" : "hidden"}`}>{ReactHtmlParser(cell.mobileText)}</div>
                  </td>
                )
              })}
            </PageLink>
          </tr>
        ))}
      </table>
    </div>
  );
}