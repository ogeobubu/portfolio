import React from "react";
import "./Contact.css";
import Button from "../../components/Buttons/Buttons";

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-container">
        <div className="contact-text">
          <h1>Do you think I am the right person for you?</h1>
          <p>Contact me for your website below</p>
        </div>
        <Button buttonStyle="btn-contact" buttonSize="btn-md">
          Contact Me
        </Button>
      </div>
    </div>
  );
};

export default Contact;
