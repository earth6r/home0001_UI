import { Link } from "gatsby";
import React from "react";
import BlogPostPreview from "./blog-post-preview";

function BlogPostPreviewGrid(props) {
  return (
    <div className="">
      {props.title && <h2 className="">{props.title}</h2>}
      <ul className="">
        {props.nodes &&
          props.nodes.map((node) => (
            <li key={node.id}>
              <BlogPostPreview {...node} />
            </li>
          ))}
      </ul>
      {props.browseMoreHref && (
        <div className="">
          <Link to={props.browseMoreHref}>Browse more</Link>
        </div>
      )}
    </div>
  );
}

BlogPostPreviewGrid.defaultProps = {
  title: "",
  nodes: [],
  browseMoreHref: "",
};

export default BlogPostPreviewGrid;
