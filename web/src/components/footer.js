import { Link } from "gatsby";
import React from "react";

/*

*/

const Footer = () => {
  const query = "";
  return (
    <footer className="pb-4em md:pb-desktop container text-sm">
      <small>
        <a href="#">Earth</a>, All rights reserved {new Date().getFullYear()}.
      </small>
    </footer>
  );
};

export default Footer;
