import React, { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import './Navbar.css'
import { NavLink, useNavigate } from "react-router-dom";
import { adminImages } from '../../assets/assets';

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        navigate('/');
        aToken && setAToken("");
        aToken && localStorage.removeItem("aToken");
    }

    return (
        <>
            <div className='admin-panel-navbar-container'>
                <div className='admin-panel-inside-navbar-container'>

                    <div className='admin-navbar-left-side'>
                        <NavLink to={"/dashboard"}>
                            <div className='admin-panel-navbar-logo'>
                                <img src={adminImages.AmenX} className='admin-navbar-logo' alt='img' />
                            </div>
                        </NavLink>
                        <div className='admin-navbar-title'>
                            <NavLink to={"/dashboard"} id='navlink'>
                                <div className='admin-title-text'>
                                    <p className='admin-panel-title'>Atom</p>
                                    <div className='admin-panel-status'>
                                        <p>{aToken ? "Admin" : "Doctor"}</p>
                                    </div>
                                </div>
                                <p className='admin-panel-title-desc'>Dashboard Panel</p>
                            </NavLink>
                        </div>
                    </div>

                    <div className='admin-navbar-panel-left-side'>
                        <button onClick={logoutHandler} className='admin-panel-logout-btn'>Logout</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Navbar
