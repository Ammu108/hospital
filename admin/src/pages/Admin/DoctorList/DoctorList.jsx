import React, { useContext, useEffect } from 'react'
import './DoctorList.css'
import { AdminContext } from '../../../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const DoctorList = () => {

  const { doctors, getAllDoctors, aToken } = useContext(AdminContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken]);

  return (
    <>
      <div className='admin-all-doctors-container'>
        <div className='inside-admin-all-doctors-container'>
          <div className='admin-doctors-list-header'>
            <p>All Doctors</p>
          </div>

          <div className="admin-doctors-parent-container mt-2">
            {doctors.map((item, index) => (
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
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default DoctorList
