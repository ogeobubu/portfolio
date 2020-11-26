import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <h1 data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        Oge Obubu
      </h1>
      <p data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        Thank you for visiting
      </p>
      <br />
      <ul
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1000"
        className="list-unstyled text-white social list-inline"
      >
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
