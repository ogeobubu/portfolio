import React from "react";
import "./About.css";

import react from "../../components/img/react.png";
import javascript from "../../components/img/javascript.png";
import nodejs from "../../components/img/nodejs.png";
import mongodb from "../../components/img/mongodb.png";

const About = () => {
  return (
    <div className="about">
      <h2>About Me</h2>
      <div className="text">
        <div className="name">
          <h1>Obubu Ogechukwuka Andretti</h1>
        </div>
        <div className="about-me">
          <p>
            Hello there! I'm Andretti, a frontend developer who resides in
            Nigeria. Coding is one of the things I am passionate about how that
            I can be useful in solving problem that I enjoy doing, I easily get
            motivated in striving to be the best at what I do. If you need a
            website for your business, company or yourself; are looking to
            redesign your website or just user experience scroll to check out
            some of my projects below. Below are the languages and technologies
            I am experienced with.
          </p>
        </div>
      </div>
      <div className="languages">
        <div className="box">
          <i className="fa fa-html5 fa-3x"></i>
        </div>
        <div className="box">
          <i className="fa fa-css3 fa-3x"></i>
        </div>
        <div className="box">
          <img src={react} width="45px" alt="react" />
        </div>
        <div className="box">
          <img src={javascript} width="45px" alt="javascript" />
        </div>
        <div className="box">
          <img src={nodejs} width="45px" alt="nodejs" />
        </div>
        <div className="box">
          <img src={mongodb} width="45px" alt="mongodb" />
        </div>
      </div>
    </div>
  );
};

export default About;
