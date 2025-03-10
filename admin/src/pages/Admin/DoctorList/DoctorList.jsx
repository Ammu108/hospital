import React, { useContext, useEffect } from 'react'
import './DoctorList.css'
import { AdminContext } from '../../../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const DoctorList = () => {

  const { doctors, getAllDoctors, aToken } = useContext(AdminContext)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (aToken) {
        setLoading(true); // Start loading
        await getAllDoctors(); // Wait for doctors to load
        setLoading(false); // Stop loading after fetching
      }
    };
  
    fetchDoctors();
  }, [aToken]);
  

  return (
    <>
      <div className='admin-all-doctors-container'>
        <div className='inside-admin-all-doctors-container'>
          <div className='admin-doctors-list-header'>
            <p>All Doctors</p>
          </div>

          <div className="admin-doctors-parent-container mt-2">
            {loading ? (
              <div className='loading-div-parent'>
                <div className='loading-div'>
                  <h2>Loading Doctors...</h2>
                  <span className="loader"></span>
                </div>
              </div>
            ) : (
              doctors.map((item, index) => (
                <div onClick={() => { navigate(`/doctor-details/` + item._id);; window.scrollTo({ top: 0, behavior: "smooth" }); }} key={index} className="doctor-images-card">
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
                    <p className="doctor-img-name">Dr. {item.name}</p>
                    <p>{item.speciality}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorList