import React from "react";
import { PageLink } from "../link";
import GridRow from "../grid/grid-row";

export const RichTable = (props) => {
  const { headerRow, rows } = props.data;
  console.log(rows);

  return (
    <div className="relative z-0 w-screen overflow-x-scroll -mx-mobile md:-mx-desktop flex">
      <table className="w-full  text-mobileCaption md:text-desktopCaption flex-1 w-auto  md:text-base mx-mobile md:mx-desktop">
        <thead className="text-left font-normal">
          <tr>
            {headerRow &&
              headerRow.map((head, index) => (
                <th
                  key={`header-${head}-${index}`}
                  className="font-normal text-mobileCaption md:text-desktopCaption uppercase pb-1em"
                >
                  {head}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {rows &&
            rows.map((row) => (
              <tr key={row._key}>
                {row.cells &&
                  row.cells.map((cell) => (
                    <td
                      key={`${row._key}-${cell.value}`}
                      style={{ maxWidth: "5em" }}
                      className="text-mobileBody md:text-desktopBody whitespace-no-wrap pr-1em"
                    >
                      <div className="truncate text-mobileBody md:text-desktopBody">
                        {cell.value}
                      </div>
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
