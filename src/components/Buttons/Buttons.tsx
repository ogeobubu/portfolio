import React from "react";
import "./Buttons.css";

const STYLES = ["btn--primary", "btn--secondary", "btn-contact"];
const SIZES = ["btn-md", "btn-lg"];

const Buttons = ({ children, type, handleClick, buttonStyle, buttonSize }) => {
  const activeButtonStyles = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const activeButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`btn ${activeButtonStyles} ${activeButtonSize}`}
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Buttons;
