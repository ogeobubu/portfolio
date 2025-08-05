import React from "react";

const Card = (props) => {
  return (
    <>
      <li className="cards__item">
        <a href={props.path} className="cards__item__link" target="_blank" rel="noopener noreferrer">
          <figure className="cards__item__pic-wrap" data-category={props.label}>
            <img src={props.src} alt="project" className="cards__item__img" />
          </figure>
          <div className="cards__item__info">
            <h5 className="cards__item__text">{props.text}</h5>
          </div>
        </a>
      </li>
    </>
  );
};

export default Card;
