import React from "react";
import Card from "./Card/Card";
import "./Cards.css";
import retoservices from "./Projects/retoservices-netlify-app.jpg";
import factservices from "./Projects/fact-services-netlify-app-.jpg";
import ohtopup from './Projects/ohtopup-desktop.png'
import blog from './Projects/mernblog-desktop.png'
import food from './Projects/food-desktop (2).png'

const Cards = () => {
  return (
    <div id="projects" className="cards">
      <h1>My Recent Projects</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <Card
              src={retoservices}
              text="Responsive Landing Page Design using HTML5, CSS3 and Nodejs"
              path="https://retoservices.netlify.app/"
            />
            <Card
              src={factservices}
              text="Responsive Finance Landing Page Design using HTML5, CSS3 and Vanilla JavaScript"
              path="/projects"
            />
            <Card src={blog} text="Responsive FullStack MERN Blog Application" path="https://still-headland-80064.herokuapp.com" />
            <Card src={ohtopup} text="OhTopUp - A FullStack MERN application with payment gateway" path="https://ohtopupservice.herokuapp.com" />
            <Card
              src={food}
              text="Responsive React Food Delivery Dashboard Design"
              path="https://food-ecom.netlify.app"
            />

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cards;
