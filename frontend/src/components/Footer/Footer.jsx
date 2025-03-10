import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { clientImages } from "../../assets/assets";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="inside-footer-container">
          <div className="left-footer-container">
            <div className="footer-header">
              <div className="footer-logo">
                <img src={clientImages.amenx} alt="logo"/>
              </div>
              <h3>Atom Hospital</h3>
            </div>
            <p>
              At Atom Hospital, we are committed to delivering compassionate,
              high-quality healthcare tailored to meet the unique needs of every
              patient. Our dedicated team of medical professionals strives to
              provide excellence in service, ensuring your health and well-being
              remain our top priority.
            </p>
            <div className="social-media-icons">
              <a href="https://facebook.com">
                <i className="hover-transition fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://twitter.com">
                <i className="hover-transition fab fa-twitter fa-2x"></i>
              </a>
              <a href="https://instagram.com">
                <i className="hover-transition fab fa-instagram fa-2x"></i>
              </a>
              <a href="https://youtube.com">
                <i className="hover-transition fab fa-youtube fa-2x"></i>
              </a>
            </div>
          </div>

          <div className="middle-footer-container">
            <h3>Company</h3>
            <div className="footer-navigation-menus">
              <Link to="/">
                <li className={`footer-nav-menu`}>Home</li>
              </Link>
              <Link to="/about">
                <li className={`footer-nav-menu`}>About</li>
              </Link>
              <Link to="/alldoctors">
                <li className={`footer-nav-menu`}>All Doctors</li>
              </Link>
              <Link to="/contact">
                <li className={`footer-nav-menu`}>Contact</li>
              </Link>
            </div>
          </div>

          <div className="right-footer-container">
            <p>+91-999-071-6368</p>
            <p>atomhospital@gmail.com</p>
            <button onClick={() => window.open("https://admin-iota-jade.vercel.app/dashboard", "_blank")} className="admin-btn">Admin Panel</button>
          </div>
        </div>

        <div className="copy-right-section">
          <hr />
          <p>
            © 2024 Atom Hospital App. All Rights Reserved. Designed By{" "}
            <span>AmenX</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
