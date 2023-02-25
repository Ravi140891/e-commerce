import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <h4 className="text-center">
        All right reserved &copy; ravi-prakash-b6298b164/
      </h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>&nbsp;|&nbsp;
        <Link to="/contact">Contact</Link> | &nbsp;
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
}

export default Footer;
