import React from "react";
import Card from "./Card/Card";
import "./Cards.css";
import retoservices from "./Projects/retoservices-netlify-app.jpg";
import factservices from "./Projects/fact-services-netlify-app-.jpg";
import newstoolz from "./Projects/newstoolz.png";
import image1 from "./Projects/image1.png";
import image3 from "./Projects/image3.png";

const Cards = () => {
  return (
    <div className="cards">
      <h1>My Recent Projects</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <Card
              src={retoservices}
              text="Multiple Pages Website"
              path="/projects"
            />
            <Card
              src={factservices}
              text="Finance Website Project"
              path="/projects"
            />
            <Card src={newstoolz} text="Blog-like Project" path="/projects" />
            <Card src={image1} text="Explore this project" path="/projects" />
            <Card
              src={image3}
              text="Coming Soon Landing Page"
              path="/projects"
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cards;
