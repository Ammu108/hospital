import React from 'react'
import './AllAppointments.css'
import { useContext } from 'react'
import { AdminContext } from '../../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'

const AllAppointments = () => {

  const { backendUrl, allAppointments, getAllAppointments, aToken, cancelAppointments } = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchDoctors = async () => {
      if (aToken) {
        setLoading(true); // Start loading
        await getAllAppointments(); // Wait for doctors to load
        setLoading(false); // Stop loading after fetching
      }
    };
    
    fetchDoctors();
  }, [aToken]);


  const handleDelete = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      const response = await axios.delete(`${backendUrl}/api/admin/delete-appointment`, { headers: { aToken }, data: { id: appointmentId } });

      if (response.data.success) {
        toast.success("Appointment deleted successfully!");
        navigate("/all-appointments"); // Redirect to appointments list
      } else {
        toast.error("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Error deleting appointment");
    }
  };

  return (
    <>
      <div className='admin-all-appointments-container'>
        <div className='inside-admin-all-apointments-container'>

          <div className='all-appointments-header'>
            <p>All Appointments</p>
          </div>

          <div className='all-appointments-form-container'>
            <div className='inside-all-appointments-form-container'>
              <div className='all-appointments-form-order fw-bold'>
                <p>#</p>
              </div>

              <div className='all-appointments-form-patientName fw-bold'>
                <p>Patient Name</p>
              </div>

              <div className='all-appointments-form-age fw-bold'>
                <p>Age</p>
              </div>

              <div className='all-appointments-form-date-time fw-bold'>
                <p>Slot Date & Time</p>
              </div>

              <div className='all-appointments-form-assign-description fw-bold'>
                <p>Description</p>
              </div>

              <div className='all-appointments-form-assign-status fw-bold'>
                <p>Status</p>
              </div>

              <div className='all-appointments-form-actions fw-bold'>
                <p>Action</p>
              </div>
            </div>

            <hr className='form-border' />

            <div className='all-appointments-details-container'>
              {loading ? (
                <div className='loading-div-parent'>
                  <div className='loading-div'>
                    <h2>Loading Appointments...</h2>
                    <span className="loader"></span>
                  </div>
                </div>
              ) : (
                allAppointments.map((item, index) => (
                  <div key={index} className='border-div'>
                    <div className='inside-all-appointments-details-container'>

                      <div className='all-appointments-form-order'>
                        <p>{index + 1}</p>
                      </div>

                      <div className='all-appointments-form-patientName'>
                        <p>{item.name}</p>
                      </div>

                      <div className='all-appointments-form-age'>
                        <p>{calculateAge(item.dob)}</p>
                      </div>

                      <div className='all-appointments-form-date-time'>
                        <p>{item.date},{item.time}</p>
                      </div>

                      <div className='all-appointments-form-assign-description'>
                        <p>{item.description}</p>
                      </div>

                      <div className='all-appointments-form-assign-status'>
                        {item.status === "Pending" && <p style={{ color: "orange" }}>Pending</p>}
                        {item.status === "Confirmed" && <p style={{ color: "green" }}>Confirmed</p>}
                        {item.status === "Completed" && <p style={{ color: "blue" }}>Completed</p>}
                        {item.status === "Rejected" && <p style={{ color: "red" }}>Rejected</p>}
                      </div>

                      <div className='all-appointments-form-actions'>
                        {item.cancelled ? (
                          <button onClick={() => handleDelete(item._id)} className='delete-btn'>Delete</button>
                        ) : (
                          <>
                            {item.status === "Completed" ? (
                              <button onClick={() => handleDelete(item._id)} className='delete-btn'>Delete</button>
                            ) : (
                              <>
                                <button className="cancel-btn" onClick={() => cancelAppointments(item._id)}>Cancel</button>
                                {item.status === "Confirmed" ? (
                                  <Link to={`/confirmed-appointment/` + item._id}><button className="confirmed-btn">Confirmed</button></Link>
                                ) : (
                                  <Link to={`/confirm-appointment/` + item._id}><button className="confirm-btn">Confirm</button></Link>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <hr className='patient-form-border-line' />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllAppointments
