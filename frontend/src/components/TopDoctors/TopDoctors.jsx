import React, { useContext } from "react";
import "./TopDoctors.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const TopDoctors = () => {

  const navigate = useNavigate();
  const { doctorsDetails } = useContext(AppContext);

  return (
    <>
      <div className="doctors-container">
        <div className="doctors-container-header">
          <h1>Top Doctors To Book</h1>
          <p>
            Simply browse through our extensive list of trusted doctors, With
            just a few clicks, you can easily <br />
            schedule your appointment on our hassle-free system
          </p>
        </div>

        <div className="doctors-parent-container">
          {doctorsDetails.slice(0, 5).map((item, index) => (
            <div
              onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" });
              navigate(`/aboutdoctor/${item._id}`)}}
              key={index}
              className="doctor-images-card"
            >
              <div className="card-img-box">
                <img src={item.image} alt="img" />
              </div>
              <div className="doctor-img-details">
                <div className="doctors-ratings">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                </div>
                <p className="doctor-img-name">{item.name}</p>
                <p>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

        <div onClick={() => {window.scrollTo({ top: 0, behavior: "smooth" }); navigate("/alldoctors")}} className="show-more-btn-div">
          <button className="show-more-btn">Show More</button>
          <i className="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </>
  );
};

export default TopDoctors;
