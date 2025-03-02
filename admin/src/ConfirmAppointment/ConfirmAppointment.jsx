import React, { useContext, useEffect, useRef, useState } from 'react'
import './ConfirmAppointment.css'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const ConfirmAppointment = () => {

  const users = {
    name: "",
    dob: "",
    gender: "",
    number: "",
    email: "",
    date: "",
    time: "",
    address: "",
    description: "",
    status: "",
  }

  const { id } = useParams();
  const navigate = useNavigate();
  const { aToken, backendUrl } = useContext(AdminContext);
  const [user, setUser] = useState(users);
  const [image, setImage] = useState(null); // State for Image
  const fileInputRef = useRef(null); // Create a ref for file input
  const [doctor, setDoctor] = useState({
    image: "",
    docName: "",
    docPhone: "",
    department: "",
    description: "",
    consultingFee: "",
  })

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger file input on image click
  };


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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value
    }));
  };

  const handleAssignDoctor = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image); // Append image
    formData.append("docName", doctor.docName);
    formData.append("docPhone", doctor.docPhone);
    formData.append("department", doctor.department);
    formData.append("description", doctor.description);
    formData.append("consultingFee", doctor.consultingFee);

    try {
      const response = await axios.put(
        `${backendUrl}/api/admin/confirm-appointment/${id}`, formData, { ...doctor },
        { headers: { aToken, "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        toast.success("Doctor assigned successfully!");
        navigate('/all-appointments')
      }
    } catch (error) {
      toast.error(error)
      console.error("Error assigning doctor:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/all-appointments")
  }

  return (
    <>
      <div className='admin-confirm-appointment-container'>
        <div className='confirm-appointment-header-container'>
          <button onClick={handleGoBack}><i class="fa-solid fa-arrow-left"></i>Back</button>
          <div className='confirm-appointment-header'>
            <p>Confirm Appointment</p>
          </div>
        </div>
        <div className='inside-admin-confirm-appointment-container'>
          <i><p className='assign-doctor-header-title'>Assign Doctor :- </p></i>
          <hr className='assign-doctor-header-bar' />
          <div className='assign-doctor-form-header'>
            <div className='admin-assign-doctor-img-div'>
              <img src={image ? URL.createObjectURL(image) : "/user.png"} onClick={handleImageClick} className='admin-assign-doc-img' alt='img' style={{ cursor: "pointer" }} />
              <input type="file" ref={fileInputRef} onChange={(e) => setImage(e.target.files[0])} className="form-control" id="doctorImage" required hidden />
            </div>
            <p>Upload Picture</p>
          </div>

          <div className='assign-doctor-form-header-details mt-3'>
            <form onSubmit={handleAssignDoctor} className='row g-3'>
              <div className="col-md-6">
                <label htmlFor="inputName" className="form-label">Doctor Name</label>
                <input type="text" name="docName" className="form-control" id="inputName" placeholder='Full Name' onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputPhoneNo" className="form-label">Phone No.</label>
                <input type="number" name="docPhone" className="form-control" id="inputPhoneNo" placeholder='phone number' onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputConsultingFees" className="form-label">Consulting Fees</label>
                <input type="text" name="consultingFee" className="form-control" id="inputConsultingFees" onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputDepartment" className="form-label">Department</label>
                <input type="text" name="department" className="form-control" id="inputDepartment" placeholder='department, room no.' onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="inputDescription" className="form-label">Description</label>
                <textarea className="form-control" name='description' id="inputDescription" rows="3" placeholder="enter your suggestion..." onChange={handleInputChange} required></textarea>
              </div>


              <div className='confirm-appointment-patient-details-header'>
                <i><p>Patient Details :-</p></i>
                <hr className='confirm-appointment-patient-details-bar' />
              </div>

              <div className='admin-patient-appointment-details'>

                <div className="details-grid">
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

                <div className='patient-appointment-status'>
                  <div><strong>Status:</strong> {user.status}</div>
                </div>

                <div className="confirm-appointment-actions-btn">
                  <button type='submit'>Done</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmAppointment
