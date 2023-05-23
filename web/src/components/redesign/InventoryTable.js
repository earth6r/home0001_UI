import React, { useState, useEffect, useRef } from "react";

export const InventoryTable = ({ data }) => {
  const { headers, rows } = data;
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  };
  return (
    <div className="w-full flex gap-20">
      {headers &&
        headers.map((head, index) => {
          let currentHeader = index;
          if (head.length > 0) {
            return (
              <ul key={index} className="text-base w-full">
                <li className="mb-4 uppercase" key={`header-${head}-${index}`}>
                  <p>{head}</p>
                </li>
                {rows &&
                  rows.map(row => {
                    return (
                      <li key={`row-${row._key}`} className="flex flex-row center py-0 px-0">
                        {row.cells &&
                          row.cells.map((cell, index) => {
                            if (index == currentHeader && cell.text) {
                              return (
                                <p key={index} className="">
                                  {cell.text}
                                </p>
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
  );
};
