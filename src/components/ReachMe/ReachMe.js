import React from "react";
import "./ReachMe.css";

const ReachMe = () => {
  return (
    <div className="reach-me">
      <div className="reach-container">
        <div className="flex">
          <h2>Do you have a project you want me to work on? Let's talk.</h2>
          <p>Any website design you have in mind; reach out to me</p>
          <form
            action="mailto:frankokafor634@gmail.com"
            method="post"
            enctype="text/plain"
          >
            <input type="submit" value="Send Message" />
            <i className="fas fa-chevron-right"></i>
          </form>
        </div>
        <div className="location">
          <div className="phone">
            <h3>Phone Number</h3>
            <p>+2348146347130</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReachMe;
