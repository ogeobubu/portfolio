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
            href="https://facebook.com/ogeobubu9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-facebook facebook fa-2x"></i>
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
        <li className="list-inline-item">
          <a
            target="_blank"
            href="https://wa.me/2348146347130"
            rel="noopener noreferrer"
          >
            <i className="fa fa-whatsapp whatsapp fa-2x"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
