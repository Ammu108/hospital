import React, { useContext, useEffect, useState } from 'react'
import './YourAppointment.css'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

const YourAppointment = () => {

    const { url, token } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {

        let newUrl = `${url}/api/appointment/yourappointment`;

        try {

            const response = await axios.get(newUrl, { headers: { token } });

            if (response.data.success) {
                setAppointments(response.data.appointments.reverse());
                console.log(response.data.appointments);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteAppointment = async (appointmentId) => {

        let newUrl = `${url}/api/appointment/cancel-appointment`;

        try {
            const response = await axios.post(newUrl, { appointmentId }, { headers: { token } });
            if (response.data.success) {

                getAppointments()

            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token) {
            getAppointments();
        }
    }, [token])

    return (
        <>
            <div className='my-appointments-container'>
                <div className='inside-my-appointments-container'>
                    <div className='book-appointment-header'>
                        <p><i>Note:-If you need to cancel or edit your appointment, please do so at least 24 hours in 
                            advance to avoid any inconvenience. You will receive an email confirmation once your 
                            request is processed. A doctor will be assigned to you after the confirmation, and their 
                            details will be displayed here so that you can contact them.</i></p>
                    </div>
                    <div className='my-appointments-header'>
                        <p>My Appointments</p>
                        <hr />
                    </div>

                    <div className='booked-appointments-container'>
                        {appointments.length > 0 ? (
                            appointments.map((item, index) => (
                                <div key={index}>
                                    <div className='adjustable-div'>
                                        <div className='inside-booked-appointments-container-left'>
                                            <p className='patient-name'><strong>{item.name}</strong></p>
                                            <p>Date :- {item.dob}</p>
                                            <p>Gender :- {item.gender}</p>
                                            <p>Phone No. :- {item.number}</p>
                                            <p>Email : - {item.email}</p>
                                            <p>Preffred Doctor :- {item.preferredDoctor}</p>
                                            <p>Appointment Date :- {item.date}</p>
                                            <p>Appointment Time :- {item.time}</p>
                                            <p>Address :- {item.address}</p>
                                            <p>Description :- {item.description}</p>
                                        </div>
                                        <div className='inside-booked-appointments-container-left-right'>
                                            <div className='edit-btn-div'>
                                                {!item.cancelled && <Link to={`/updateappointment/`+ item._id} className='edit-btn' >Edit</Link>}
                                                {!item.cancelled && <button className='cancel-btn' onClick={() => handleDeleteAppointment(item._id)}>Cancel Appointment</button>}
                                                {item.cancelled && <button className='canceled-btn'>Appointment Cancelled</button>}
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <div className='no-data-found-div'>
                                <h2>No Data Found</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default YourAppointment
