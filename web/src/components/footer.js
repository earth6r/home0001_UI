import { Link } from "gatsby";
import React from "react";

/*

*/

const Footer = () => {
  const query = "";
  return (
    <footer className="mb-2em md:mb-0 container text-sm">
      <small>
        <a href="#">Earth</a>, All rights reserved {new Date().getFullYear()}.
      </small>
    </footer>
  );
};

export default Footer;
