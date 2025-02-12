import React, { useContext, useEffect } from "react";
import "./AllDoctors.css";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const AllDoctors = () => {
  const { specialityMenu, doctorsDetails } = useContext(AppContext);
  const [active, setActive] = useState(null);
  const { speciality } = useParams();
  const [filteredSpecialist, setFilteredSpecialist] = useState([]);
  const [adjustFilterDropDown, setAdjustFilterDropDown] = useState(false)
  const navigate = useNavigate();

  const handleActive = (speciality) => {
    setActive(active === speciality ? null : speciality);
  };

  const handleFilterDropDown = () => {
    setAdjustFilterDropDown(!adjustFilterDropDown)
  }

  useEffect(() => {
    if(speciality){
      const filtered = doctorsDetails.filter(doc => doc.speciality === speciality);
      setFilteredSpecialist(filtered);
    } else {
      setFilteredSpecialist(doctorsDetails);
    }
  },[speciality, doctorsDetails]);

  return (
    <>
      <div className="allDoctors-containner">
        <div className="inside-alldoctors-cotaier">
          <div className="alldoctors-header">
            <p>{speciality ? `Doctors Specializing In ${speciality}.` : "Browse Through The Doctors Speciality."}</p>
          </div>

          <div className="specilaity-filter-box">
            <div className="adjust-specilaity-container-div">
              <div onClick={handleFilterDropDown} className={`adjust-specilaity-container ${adjustFilterDropDown ? "active-filter" : ""}`}>
                <p>Filter</p>
                <i className="fa-solid fa-filter"></i>
              </div>
              <div className={`dropdown-speciality ${adjustFilterDropDown ? " active-adjustFilterDropDown" : ""}`}>
                {specialityMenu.map((item, index) => (
                  <Link key={index} to={speciality === item.speciality ? "/alldoctors" : `/alldoctors/${item.speciality}`} onClick={() => handleActive(item.speciality)}>
                    <div className={`dropDown-speciality-type ${active === item.speciality ? "activeSpeciality" : ""}`}>
                      <p>{item.speciality}</p>
                    </div>
                  </Link>
                ))}
              </div>
          </div>
          </div>

          <div className="display-all-doctors-conntainer">
            <div className="speciality-section">
              {specialityMenu.map((item, index) => (
                <Link key={index} to={speciality === item.speciality ? "/alldoctors" : `/alldoctors/${item.speciality}`} onClick={() => handleActive(item.speciality)}>
                  <div className={`speciality-type ${active === item.speciality ? "activeSpeciality" : ""}`}>
                    <p>{item.speciality}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="display-doctors">
              {filteredSpecialist.map((item, index) => (
                <div onClick={() => {window.scrollTo({ top: 0, behavior: "smooth" }); 
                navigate(`/aboutdoctor/${item._id}`)}} key={index} className="doctors-card">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AllDoctors;
