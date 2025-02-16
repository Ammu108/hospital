import React, { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { token, setToken, user, setUser } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();

    const menuHandle = () => {
        setMenu(!menu);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser(null);
        navigate("/");
    };

    const [showUserInfo, setShowUserInfo] = useState(false);

    const toggleUserInfo = () => {
        setShowUserInfo(!showUserInfo);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    };

    return (
        <>
            <div className='navbar-container'>
                <div className='inside-navbar'>
                    <div className='left-nav'>
                        <div className='logo'>
                            <img src="./AmenX.png" alt="logo" />
                        </div>
                        <Link to="/"><h4 className='nav-logo'>Atom</h4></Link>
                    </div>

                    <div className={`middle-nav ${menu ? 'show-menu' : ''}`}>
                        <div className={`close-menu-bars ${menu ? 'show-close-menu-bars' : ''}`} onClick={menuHandle}>
                            <i className="fa-solid fa-times"></i>
                        </div>
                        <ul className={`middle-nav-menus ${menu ? 'show-middle-nav-menus' : ''}`}>
                            <Link to="/">
                                <li className={`nav-menu ${location.pathname === '/' ? 'active' : ''}`}>Home</li>
                            </Link>
                            <Link to="/about">
                                <li className={`nav-menu ${location.pathname === '/about' ? 'active' : ''}`}>About</li>
                            </Link>
                            <Link to="/alldoctors">
                                <li className={`nav-menu ${location.pathname.startsWith("/alldoctors") ? 'active' : ''}`}>All Doctors</li>
                            </Link>
                            <Link to="/contact">
                                <li className={`nav-menu ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</li>
                            </Link>

                            {!token ? (
                                <Link to="/bookappointment">
                                    <li className={`nav-menu ${location.pathname === '/bookappointment' ? 'active' : ''}`}>Book Appointment</li>
                                </Link>
                            ) : (
                                <li className="nav-menu dropdown">
                                    <div className="dropdown-toggle" onClick={toggleDropdown}>
                                        Services
                                    </div>
                                    {dropdownOpen && (
                                        <ul className="dropdown-menu">
                                            <Link to="/bookappointment">
                                                <li className={`nav-menu ${location.pathname === '/bookappointment' ? 'active' : ''}`}>Book Appointments</li>
                                            </Link>
                                            <hr />
                                            <Link to="/yourappointment">
                                                <li className={`nav-menu ${location.pathname === '/yourappointment' ? 'active' : ''}`}>My Appointments</li>
                                            </Link>
                                        </ul>
                                    )}
                                </li>
                            )}

                            <div className='adjustable-user-section-navbar'>
                                {!token ? (
                                    <div onClick={() => setShowLogin(true)} className='signup-box'>
                                        <i className="fa-solid fa-user-plus adjustable-font"></i>
                                        <p className='adjustable-text'>Sign Up</p>
                                    </div>
                                ) : (
                                    // <div className='adjustable-user-section'>
                                    <div className="user-section">
                                        <div className='container-user-img ms-lg-2 ms-md-2' onClick={toggleUserInfo} style={{ cursor: 'pointer' }}>
                                            <div className='user-img-div'>
                                                {/* <img className='user-img' src={user.picture} alt="profile" /> */}
                                                <i className="fa-regular fa-user"></i>
                                            </div>
                                            {/* {showUserInfo && user && (
                                                    <div className='adjustable-user-info'>
                                                        <div className='user-info'>
                                                            <P className='text-black'>{user.name}</P>
                                                            <p className='text-black'>{user.email}</p>
                                                            <a className="nav-link" onClick={handleLogout} href="#">Logout</a>
                                                        </div>
                                                    </div>
                                                )} */}
                                        </div>
                                        {showUserInfo && user && (
                                            <>
                                                <p className='text-black'>{user.name}</p>
                                                <p className='text-black'>{user.email}</p>
                                                <a className="nav-link" onClick={handleLogout} href="#">Logout</a>
                                            </>
                                        )}
                                    </div>
                                    // </div>
                                )}
                            </div>
                        </ul>

                    </div>

                    <div className='right-nav'>

                        {!token ? (
                            <div onClick={() => setShowLogin(true)} className='signup-box'>
                                <i className="fa-solid fa-user-plus adjustable-font"></i>
                                <p className='adjustable-text'>Sign Up</p>
                            </div>
                        ) : (
                            <div className='adjustable-user-section'>
                                <div className="user-section">
                                    <div className='container-user-img ms-lg-2 ms-md-2' onClick={toggleUserInfo} style={{ cursor: 'pointer' }}>
                                        <div className='user-img-div'>
                                            {/* <img className='user-img' src={user.picture} alt="profile" /> */}
                                            <i className="fa-regular fa-user"></i>
                                        </div>
                                        {showUserInfo && user && (
                                            <div className='user-info-div'>
                                                <div className='user-info'>
                                                    <p className='text-black'>{user.name}</p>
                                                    <p className='text-black'>{user.email}</p>
                                                    <a className="nav-link" onClick={handleLogout} href="#">Logout</a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* <div onClick={()=> {window.scrollTo({ top: 0, behavior: "smooth" }); navigate('/login')}} className='login-box'>
                    <i className="fa-solid fa-lock adjustable-font"></i>
                    <p className='adjustable-text'>Login</p>
                </div> */}

                        <div className="menu-handler" onClick={menuHandle}>
                            <div className='menu-bars'>
                                <i className='fa-solid fa-bars'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Navbar