import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <h1>Oge Obubu</h1>
      <p>Thank you for visiting</p>
      <br />
      <ul className="list-unstyled text-white social list-inline">
        <li className="list-inline-item">
          <a
            href="https://linkedin.com/in/oge-obubu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-linkedin facebook fa-2x"></i>
          </a>
        </li>
        <li className="list-inline-item">
          <a
            href="https://github.com/ogeobubu"
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fa fa-github github fa-2x"></i>
          </a>
        </li>
        <li className="list-inline-item">
          <a
            href="https://twitter.com/obubuoge"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-twitter twitter fa-2x"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
