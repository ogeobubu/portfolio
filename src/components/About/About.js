import React from "react";
import "./About.css";

import { motion, useMotionValue } from "framer-motion";

import react from "../../components/img/react.png";
import javascript from "../../components/img/javascript.png";
import nodejs from "../../components/img/nodejs.png";
import mongodb from "../../components/img/mongodb.png";

const About = () => {
  const scale = useMotionValue(1);
  return (
    <motion.div animate={{ scale }}>
      <div className="about">
        <h2>About Me</h2>
        <div className="text">
          <div className="name">
            <h1 data-aos="fade-right">Obubu Ogechukwuka Andretti</h1>
          </div>
          <div className="about-me">
            <motion.div
              animate={{ x: 0, y: 0, scale: 1, rotate: 360 }}
              transition={{ ease: "easeOut", duration: 2 }}
            >
              <p data-aos="fade-left">
                Hello there! I'm Andretti, a frontend developer who resides in
                Nigeria. Coding is one of the things I am passionate about how I
                can be useful in solving a problem, that I enjoy doing, I easily
                get motivated in striving to be the best at what I do. If you
                need a website for your business, company or yourself; are
                looking to redesign your website or just user experience scroll
                to check out some of my projects below. Below are the languages
                and technologies I am experienced with.
              </p>
            </motion.div>
          </div>
        </div>
        <div data-aos="fade-up" className="languages">
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
    </motion.div>
  );
};

export default About;
