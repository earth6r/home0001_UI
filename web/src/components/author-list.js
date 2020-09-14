import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";

function AuthorList({ items, title }) {
  return (
    <div className="">
      <h2 className="">{title}</h2>
      <ul className="">
        {items.map(({ author, _key }) => {
          const authorName = author && author.name;
          return (
            <li key={_key} className="">
              <div>
                <div className="">
                  {author && author.image && author.image.asset && (
                    <img
                      src={imageUrlFor(buildImageObj(author.image))
                        .width(100)
                        .height(100)
                        .fit("crop")
                        .url()}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div>
                <div>{authorName || <em>Missing name</em>}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AuthorList;
