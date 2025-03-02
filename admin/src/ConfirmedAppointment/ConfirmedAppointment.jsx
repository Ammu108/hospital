import React, { useContext, useEffect, useState } from 'react'
import './ConfirmedAppointment.css'
import { useNavigate, useParams } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'

const ConfirmedAppointment = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { aToken, backendUrl, getAllAppointments, completedAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/getappointment/${id}`, { headers: { aToken } });
        if (response.data) {
          setUser(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id, backendUrl, aToken]);

  const handleGoBack = () => {
    navigate("/all-appointments")
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).replace(",", "");  // Removes unwanted comma
  };

  return (
    <>
      <div className='admin-confirmed-appointment-container'>
        <div className='confirm-appointment-header-container'>
          <button onClick={handleGoBack}><i className="fa-solid fa-arrow-left"></i>Back</button>
          <div className='confirm-appointment-header'>
            <p>Appointment Confirmed</p>
          </div>
        </div>
        <div className='inside-admin-confirmed-appointment-container'>

          <div className='inside-admin-confirmed-appointment-patient-details-header'>
            <i><p className='admin-confirmed-appointment-patient-title'>Doctor Details :-</p></i>
            <hr className='confirmed-appointment-header-bar' />
          </div>

          {user?.assignedDoctor ? (
            <div className='doctor-details-box mt-4'>
              <div className='confirmed-doctor-img-div'>
                <img src={user.assignedDoctor.image} alt='Doctor' className="doctor-image" />
              </div>
              <div className="details-grid mt-4">
                <div><strong>Doctor Name:</strong> {user.assignedDoctor.docName}</div>
                <div><strong>Phone No.:</strong> {user.assignedDoctor.docPhone}</div>

                <div><strong>Department:</strong> {user.assignedDoctor.department}</div>
                <div><strong>Consulting Fee:</strong> {user.assignedDoctor.consultingFee}</div>

                <div><strong>Description:</strong> {user.assignedDoctor.description}</div>
                <div><strong>Assigned At (DD/MM/YYYY):</strong> {formatDate(user.assignedDoctor.assignedAt)}</div>
              </div>
            </div>
          ) : (
            <div className='loading-div-parent'>
              <div className='loading-div'>
                <h2>Loading Appointments...</h2>
                <span class="loader"></span>
              </div>
            </div>
          )}

          <div className='inside-admin-confirmed-appointment-patient-details-header mt-4'>
            <i><p className='admin-confirmed-appointment-patient-title'>Patient Details :-</p></i>
            <hr className='confirmed-appointment-header-bar' />
          </div>

          {user ? (
            <div className='doctor-details-box mt-4'>
              <div className="details-grid mt-4">
                <div><strong>Patient Name:</strong> {user.name}</div>
                <div><strong>Date of Birth:</strong> {user.dob}</div>

                <div><strong>Gender:</strong> {user.gender}</div>
                <div><strong>Phone No.:</strong> {user.number}</div>

                <div><strong>Email:</strong> {user.email}</div>
                <div><strong>Appointment Date:</strong> {user.date}</div>

                <div><strong>Appointment Time:</strong> {user.time}</div>
                <div><strong>Address:</strong> {user.address}</div>

                <div className="full-width"><strong>Symptoms:</strong> {user.description}</div>

                <div><strong>Booked At (DD/MM/YYYY):</strong> {user.bookedAt}</div>
              </div>

              <div className='confirm-appointment-completed-btn'>
                <button onClick={() => completedAppointment(user._id)}>Check Up Completed</button>
              </div>
            </div>
          ) : (
            <div className='loading-div-parent'>
              <div className='loading-div'>
                <h2>Loading Appointments...</h2>
                <span class="loader"></span>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default ConfirmedAppointment
