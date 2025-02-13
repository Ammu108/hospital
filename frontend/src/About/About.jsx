import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";

const About = () => {

  const navigate = useNavigate();

  return (
    <>
      <div className="aabout-page-container">
        <div className="inside-about-page-container">
          <div className="about-page-box">
            <div className="about-page-img">
              <img src="./about_img.jpg" alt="img" />
            </div>
            <div className="about-page-content">
              <div className="about-div">
                <h5>
                  <strong>About Us</strong>
                </h5>
                <p>
                  Welcome to Atom Hospital, where compassionate care meets
                  medical excellence. Our mission is to provide top-quality
                  healthcare services with a patient-centered approach, ensuring
                  that every individual receives personalized and effective
                  treatment.
                </p>
              </div>

              <div className="mission-div">
                <h5>
                  <strong>Our Mission</strong>
                </h5>
                <p>
                  At Atom Hospital, we are dedicated to delivering
                  comprehensive healthcare with a commitment to innovation,
                  excellence, and patient satisfaction. We strive to enhance the
                  well-being of our community through accessible, affordable,
                  and high-quality medical services. our vision to be a leading
                  healthcare institution known for setting new standards in
                  patient care, medical research, and professional excellence.
                </p>
              </div>
            </div>
          </div>

          <div className="mission-adjustable-div">
            <h5>
              <strong>Our Mission</strong>
            </h5>
            <p>
              At Atom Hospital, we are dedicated to delivering
              comprehensive healthcare with a commitment to innovation,
              excellence, and patient satisfaction. We strive to enhance the
              well-being of our community through accessible, affordable,
              and high-quality medical services. our vision to be a leading
              healthcare institution known for setting new standards in
              patient care, medical research, and professional excellence.
            </p>
          </div>


          <div className="why-choose-box">
            <h5><strong>Why Choose Us?</strong></h5>
          </div>

          <div className="why-choose-us-div">
            <div className="choose-box">
              <p>Our team of highly qualified and experienced doctors is dedicated to offering the best possible treatment.</p>
            </div>

            <div className="choose-box">
              <p>We leverage state-of-the-art medical equipment and technology to provide accurate diagnoses and effective treatments.</p>
            </div>

            <div className="choose-box">
              <p>From preventive care to specialized treatments, we cater to a wide range of medical needs.</p>
            </div>
                
          </div>

          <div className="about-contact-box">
            <h5><strong>Contact Us</strong></h5>
            <p>If you have any questions or wish to learn more about our services, feel free to get in touch with us. Your health is our priority, and we are here to support you every step of the way.
              Thank you for choosing Atom hospital for your healthcare needs.
              <img onClick={()=>{window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/contact")}} src="./share.png" alt="img" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
