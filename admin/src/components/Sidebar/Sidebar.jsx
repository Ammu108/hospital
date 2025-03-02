import React, { useContext } from 'react'
import './Sidebar.css'
import { AdminContext } from '../../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { adminImages } from '../../assets/assets';

const Sidebar = () => {

  const { aToken } = useContext(AdminContext);

  return (
    <>
      <div className='admin-sidebar-container'>
        <div className='admin-sidebar-inside-container'>
          {aToken && (
            <div className='side-bar-items'>
              <NavLink to={"/dashboard"} id='navlink' className={({ isActive }) => `side-bar-item ${isActive ? "setActive-items" : ""}`}>
                <div className='side-bar-items-icon-div'>
                  <img src={adminImages.dashboard} alt='img' className='dashboard-img' />
                  <p className='nav-items-name'>Dashboard</p>
                </div>
              </NavLink>

              <NavLink to={"/all-appointments"} id='navlink' className={({ isActive }) => `side-bar-item ${isActive ? "setActive-items" : ""}`}>
                <div className='side-bar-items-icon-div'>
                  <img src={adminImages.appointments} alt='img' className='img' />
                  <p className='nav-items-name'>Appointments</p>
                </div>
              </NavLink>

              <NavLink to={"/add-doctor"} id='navlink' className={({ isActive }) => `side-bar-item ${isActive ? "setActive-items" : ""}`}>
                <div className='side-bar-items-icon-div'>
                  <img src={adminImages.addDoctors} alt='img' className='img' />
                  <p className='nav-items-name'>Add Doctor</p>
                </div>
              </NavLink>

              <NavLink to={"/doctor-list"} id='navlink' className={({ isActive }) => `side-bar-item ${isActive ? "setActive-items" : ""}`}>
                <div className='side-bar-items-icon-div'>
                  <img src={adminImages.doctorsList} alt='img' className='dashboard-img' />
                  <p className='nav-items-name'>Doctors List</p>
                </div>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar