import React, { useContext, useEffect, useState } from 'react'
import './DoctorDetails.css'
import { useNavigate, useParams } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'

const DoctorDetails = () => {

    const { id } = useParams();
    const { backendUrl, aToken } = useContext(AdminContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [docData, setdocData] = useState({})

    const handleGoBack = () => {
        navigate("/doctor-list")
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${backendUrl}/api/doctor/doctor-details/${id}`, { headers: { aToken } });
                if (response.data) {
                    setdocData(response.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, backendUrl, aToken]);

    return (
        <>
            <div className='doctor-details-conatiner'>
                <div className='confirm-appointment-header-container'>
                    <button onClick={handleGoBack}><i className="fa-solid fa-arrow-left"></i>Back</button>
                    <div className='doctor-details-header'>
                        <p>Doctor Details</p>
                    </div>
                </div>
                <div className='inside-doctor-details-container'>
                    {loading ? (
                        <div className='loading-div-parent'>
                            <div className='loading-div'>
                                <h2>Loading Appointments...</h2>
                                <span className="loader"></span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className='doctorsAbout-container'>
                                <div className='inside-DoctorAbout-container'>

                                    <div className='aboutDoctor-box'>

                                        <div className='about-doctor-img-box'>
                                            <img src={docData.image} alt='img' />
                                        </div>

                                        <div className='about-doctor-div'>
                                            <div className='about-doctor-name-div'>
                                                <h2>{docData.name}</h2>
                                               <i><p className='doctor-added-date'>{docData.date}</p></i>
                                            </div>

                                            <div className='qualifications'>
                                                <p>{docData.degree} -</p>
                                                <p>{docData.speciality}</p>
                                            </div>

                                            <div className="about-doctors-ratings">
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-solid fa-star"></i>
                                                <i className="fa-regular fa-star"></i>
                                                <i className="fa-regular fa-star"></i>
                                            </div>

                                            <div className='about-doctors-experience-div mt-2'>
                                                <p>{docData.experience}</p>
                                            </div>

                                            <div className='contact-information-div'>
                                                <p><strong>Contact Information</strong></p>
                                                <div className='contact-information'>
                                                    <p>{docData.phoneNumber}</p>
                                                    <p>{docData.email}</p>
                                                </div>
                                            </div>

                                            <div className='description-header'>
                                                <p><strong>About</strong></p>
                                                <i className="fa-solid fa-circle-info"></i>
                                            </div>

                                            <div className='description'>
                                                <p>{docData.about}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='adjustable-description-container'>

                                        <div className='adjustable-description-header'>
                                            <p><strong>About</strong></p>
                                            <i className="fa-solid fa-circle-info"></i>
                                        </div>

                                        <div className='adjustable-description'>
                                            <p>{docData.about}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default DoctorDetails
