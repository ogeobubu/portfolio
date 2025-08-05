import React from "react";
import "./Contact.css";
import Button from "../../components/Buttons/Buttons";
import { Link } from "react-router-dom";


const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-container">
        <div className="contact-text">
          <h1>Do you think I am the right person for you?</h1>
          <p>Contact me for your website below</p>
        </div>
        <Link className="link" to="" target="_blank">
          <Button buttonStyle="btn--secondary" buttonSize="btn-md">
            Contact Me
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Contact;
