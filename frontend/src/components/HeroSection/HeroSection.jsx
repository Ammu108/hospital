import React from "react";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="heroSection-container">
        <div className="overlay"></div>
        <div className="header">
          <div className="header-message">
            <h1 className="header-title">
              Book Appointment <br/> with Trusted Doctors
            </h1>
            <p className="header-message-para">
              Providing compassionate care with cutting-edge technology and a
              team of trusted specialists. We're here for your health, every
              step of the way. Discover excellence in healthcare with
              personalized attention and 24/7 emergency services.
            </p>

            <div onClick={()=>navigate('/bookappointment')} className="herader-btn-div">
              <button className="header-btn">Book Appoinment</button>
              <i className="fa-solid fa-arrow-right"></i>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
