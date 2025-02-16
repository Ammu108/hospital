import React, { useContext, useState } from "react";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const HeroSection = () => {

  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [modalOverlay, setModalOverlay] = useState(false)

  const handleSignIn = () => {
    setModalOverlay(true);
  }

  const handleCloseModalOverlay = () => {
    setModalOverlay(false)
  }

  const navigateToBooking = () => {
    navigate("/bookappointment");
  }

  return (
    <>
      <div className="heroSection-container">
        <div className="overlay"></div>
        <div className="header">
          <div className="header-message">
            <h1 className="header-title">
              Book Appointment <br /> with Trusted Doctors
            </h1>
            <p className="header-message-para">
              Providing compassionate care with cutting-edge technology and a
              team of trusted specialists. We're here for your health, every
              step of the way. Discover excellence in healthcare with
              personalized attention and 24/7 emergency services.
            </p>

            <div onClick={token ? navigateToBooking : handleSignIn} className="herader-btn-div">
              <button className="header-btn">Book Appoinment</button>
              <i className="fa-solid fa-arrow-right"></i>
            </div>

          </div>
        </div>

        <div className={`modalOverlay ${modalOverlay ? " activeModalOverlay" : ""}`}></div>
        <div className={`modaldiv ${modalOverlay ? " activeModaldiv" : ""}`}>
          <div className='modaldiv-message'>
            <div className='cross-icon-modal-div' onClick={handleCloseModalOverlay}>
              <i className="fa-solid fa-xmark cross-icon-modal"></i>
            </div>
            <div className="user-img-modal-div">
              <div className="user-icon-modal-div">
                <img src='/user.png' alt='icon' className='sign-icon' />
              </div>
            </div>
            <p>Please Sign In First.</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default HeroSection;
