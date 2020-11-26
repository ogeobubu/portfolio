import React from "react";
import "./IntroSection.css";
import Button from "../Buttons/Buttons";
import { Link } from "react-router-dom";

const IntroSection = () => {
  return (
    <div className="intro">
      <div className="intro-container">
        <div className="details">
          <h2>HI! I'M ANDRETTI</h2>
          <h1>FRONTEND DEVELOPER</h1>
          <p>
            Are you looking for a passionate frontend developer who is
            experienced with HTML5, CSS3, JavaScript, React.js, Node.js,
            Express.js, MongoDB and who will convert your design to an
            interactive website where users interact with your data? Search no
            more you're in the right place.
          </p>
          <Link to="/about">
            <Button buttonStyle="btn--primary" buttonSize="btn-md">
              Explore
            </Button>
          </Link>
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
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-github github fa-2x"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a
                href="https://twitter.com/obubuoge"
                rel="noopener noreferrer"
                target="_blank"
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
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
