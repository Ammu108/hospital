import React, { useContext } from "react";
import "./Specialist.css";
// import { specialityMenu } from "../../assets/assets";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const SpecialistMenu = () => {

  const {specialityMenu} = useContext(AppContext);

  return (
    <>
      <div className="specialistMenu-container">
        <div className="specialistMenu-message">
          <h1>Find By Speciality</h1>
          <p>
            Simply browse through our extensive list of trusted doctors, With
            just a few clicks, you can easily <br />
            schedule your appointment on our hassle-free system
          </p>
        </div>
        <div className="specialistMenu-images-box">

          {specialityMenu.map((item, index) => (
            <Link key={index} to={`/alldoctors/${item.speciality}`}>
              <div className="specialistMenu-images">
                <div className="specialistMenu-image">
                  <img src={item.image} alt="img" />
                </div>
                <p>{item.speciality}</p>
              </div>
            </Link>
          ))}
          
        </div>
      </div>
    </>
  );
};

export default SpecialistMenu;
