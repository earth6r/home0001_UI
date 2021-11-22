import React from "react";
import { PageLink } from "../link";

export interface RowLinkTableProps {
  data: {
    title: string
    rows: any[];
  };
}

const handleRowClick = (e) => {
  e.preventDefault();
  let url = e.target.getAttribute("data-link");
  if (window) window.location = url;
}
// export const RowLinkTable = ({ data } : RowLinkTableProps) => {
//     const { title, rows } = data;
//     return (
//         <>
//           <div className="relative z-0 w-full flex flex-col">
//             <div className="relative z-10 overflow-x-hidden">
//               <div className="flex justify-left w-full">
//                 <ul className={`mb-0 align-top flex-1 pb-0 table w-full`}>
//                   {rows && rows.map((row) => (
//                     <PageLink className="table-link" to={row.cells[0] && row.cells[0].url ? row.cells[0].url : "/"}>
//                       <li key={`row-${row._key}`} className="flex pl-0 hover:underline">
//                         {row.cells && row.cells.map((cell, index) => {
//                           if (!cell.desktopText) {
//                             <div key={`cell-${cell._key}`} className="visible py-1/4em border-none pl-0">
//                               {/* <div className="truncate text-mobileCaption lg:text-desktopCaption">{cell.desktopText}</div> */}
//                               <div className="truncate text-mobileCaption lg:text-desktopCaption">{cell.mobileText}</div>
//                             </div>
//                           } else {
//                             return (
//                               <div key={`cell-${cell._key}`} className={`${index == 0 ? "w-2/4" : "w-1/4 pr-1"} md:w-1/4 py-1/4em border-none`}>
//                                 <div className={`truncate text-smallBody ${cell.mobileText ? "hidden md:block" : "block"} lg:text-desktopBody`}>{cell.desktopText}</div>
//                                 <div className={`truncate text-smallBody ${cell.mobileText ? "visible md:hidden" : "hidden"}`}>{cell.mobileText}</div>
//                               </div>
//                             )
//                           }
//                         })}
//                       </li>
//                     </PageLink>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </>
//       );
// }

export const RowLinkTable = ({ data }: RowLinkTableProps) => {
  const { title, rows } = data;
  return (
    <>
      <table className="w-full">
        {rows && rows.map((row) => (
          <tr key={`row-${row._key}`} className="hover:underline cursor-pointer">
            <PageLink to={row.cells[0] && row.cells[0].url ? row.cells[0].url : "/"} className="w-full contents">
              {row.cells && row.cells.map((cell, index) => {
                return (
                  <td key={`cell-${cell._key}`} className={`py-1/4em border-none`}>
                    <div className={`truncate text-smallBody ${cell.mobileText ? "hidden md:block" : "block"} lg:text-desktopBody`}>{cell.desktopText}</div>
                    <div className={`truncate text-smallBody ${cell.mobileText ? "visible md:hidden" : "hidden"}`}>{cell.mobileText}</div>
                  </td>
                )
              })}
            </PageLink>
          </tr>
        ))}
      </table>
    </>
  );
}