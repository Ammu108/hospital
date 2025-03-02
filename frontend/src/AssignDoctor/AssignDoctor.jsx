import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { AppContext } from '../context/AppContext';
import "./AssignDoctor.css"

const AssignDoctor = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { url, token } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/admin/getappointment/${id}`, { headers: { token } });
        if (response.data) {
          setUser(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id, url, token]);

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

  const handleGoBack = () => {
    navigate("/yourappointment")
  }

  return (
    <>
      <div className='see-doctor-details'>
      <button className='go-back-btn' onClick={handleGoBack}><i className="fa-solid fa-arrow-left"></i>Back</button>
        <div className='see-doctor-details-header'>
          <div className='see-doctor-details-header-title'>
            <p>Doctor Details</p>
          </div>
          <hr/>
        </div>
        {user?.assignedDoctor ? (
          <div className='doctor-details-box mt-4'>
            <div className='assigned-doctor-img-div'>
              <img src={user.assignedDoctor.image} alt='Doctor' className="doctor-image" />
            </div>
            <div className="details-grid">
              <div><strong>Doctor Name:</strong> {user.assignedDoctor.docName}</div>
              <div><strong>Phone No.:</strong> {user.assignedDoctor.docPhone}</div>

              <div><strong>Department:</strong> {user.assignedDoctor.department}</div>
              <div><strong>Consulting Fee:</strong> $ {user.assignedDoctor.consultingFee}</div>

              <div><strong>Description:</strong> {user.assignedDoctor.description}</div>
              <div><strong>Assigned At (DD/MM/YYYY):</strong> {formatDate(user.assignedDoctor.assignedAt)}</div>
            </div>
          </div>
        ) : (
          <div className='loading-div-parent'>
            <div className='loading-div'>
              <h2>Loading Doctor...</h2>
              <span class="loader"></span>
            </div >
          </div >
        )}
      </div >
    </>
  )
}

export default AssignDoctor
