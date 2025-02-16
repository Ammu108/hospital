import React, { useContext, useState } from 'react'
import "./BookAppointment.css"
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const BookAppointment = () => {

  const { url, token } = useContext(AppContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [close, setClose] = useState(false);
  const [data, setData] = useState({
    name: "",
    dob: "",
    gender: "",
    number: "",
    email: "",
    preferredDoctor: "",
    date: "",
    time: "",
    address: "",
    description: "",
  })

  const [modalOverlay, setModalOverlay] = useState(false)

  const handleSignIn = () => {
    setModalOverlay(true);
  }

  const handleCloseModalOverlay = () => {
    setModalOverlay(false)
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  }

  const onBooking = async (event) => {
    event.preventDefault();

    if (!token) {
      handleSignIn();
      return;
    }

    setLoading(true);
    let newUrl = `${url}/api/appointment/bookappointment`;


    try {

      const response = await axios.post(newUrl, data, { headers: { token } });


      if (response.data.success) {
        setSuccess("Appointment booked successfully! A confirmation email has been sent.");
        setClose(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setData({
          name: "", dob: "", gender: "", number: "", email: "",
          preferredDoctor: "", date: "", time: "", address: "", description: "",
        });
      } else {
        setError(response.data.message)
      }

    } catch (err) {
      setError("Failed to book appointment. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='book-appointment-container'>
        <div className='book-appointment-header'>
          <p><i>Note :- Please fill out the form with accurate details. You will receive a confirmation email once your appointment is
            confirmed within 2 days. If you need to cancel or edit, please do so at least 24 hours in advance.</i></p>
        </div>
        {success && close && (
          <div className='succes-container'>
            <p>{success}</p>
            <i onClick={() => setClose(false)} className="fa-solid fa-x" style={{ cursor: "pointer" }}></i>
          </div>
        )}
        <div className='inside-book-appointment'>
          <form onSubmit={onBooking} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputName" className="form-label">Full Name</label>
              <input type="text" name="name" value={data.name} onChange={onChangeHandler} className="form-control" id="inputName" placeholder='enter your full name' required />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputDob" className="form-label">Date of Birth</label>
              <input type="date" name="dob" value={data.dob} onChange={onChangeHandler} className="form-control" id="inputDob" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">Gender</label>
              <select id="gender" name="gender" value={data.gender} onChange={onChangeHandler} className="form-control" required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputNumber" className="form-label">Contact Number</label>
              <input type="tel" name='number' value={data.number} onChange={onChangeHandler} className="form-control" id="inputNumber" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputEmail" className="form-label">Email Address</label>
              <input type="email" name='email' value={data.email} onChange={onChangeHandler} className="form-control" id="inputEmail" placeholder="enter your email addrerss" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="preferredDoctor" className="form-label">Preferred Doctor:</label>
              <select id="preferredDoctor" name="preferredDoctor" value={data.preferredDoctor} onChange={onChangeHandler} className="form-control" required>
                <option value="">Select Doctor</option>
                <option value="dr-smith">Dr. Smith (Cardiologist)</option>
                <option value="dr-johnson">Dr. Johnson (Dermatologist)</option>
                <option value="dr-stephen">Dr. stephen (General Physician)</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="inputDate" className="form-label">Appointment Date:</label>
              <input type="date" name='date' value={data.date} onChange={onChangeHandler} className="form-control" id="inputDate" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputTime" className="form-label">Time Slot:</label>
              <input type="time" name='time' value={data.time} onChange={onChangeHandler} className="form-control" id="inputTime" required />
            </div>
            <div className="col-12">
              <label htmlFor="inputAddress" className="form-label">Address</label>
              <input type="text" name='address' value={data.address} onChange={onChangeHandler} className="form-control" id="inputAddress" required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description:</label>
              <textarea className="form-control" name='description' value={data.description} onChange={onChangeHandler} id="description" rows="3" placeholder="Describe your symptoms or medical history..."></textarea>
            </div>
            {error && (
              <div className='error-parent-div'>
                <div className='error-container'>
                  <p className="error-message">{error}</p>
                </div>
              </div>
            )}
            <div className="col-12 submit-appointment-btn">
              <button type='submit' className='submit-btn' disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
            </div>
          </form>
        </div>

        <div className={`modalOverlay ${modalOverlay ? "activeModalOverlay" : ""}`}></div>
        <div className={`modaldiv ${modalOverlay ? " activeModaldiv" : ""}`}>
          <div className='modaldiv-message'>
            <div className='cross-icon-modal-div' onClick={handleCloseModalOverlay}>
              <i className="fa-solid fa-xmark cross-icon-modal"></i>
            </div>
            <div className="user-img-modal-div">
              <div className="user-icon-modal-div">
                <img src='/user.png' alt='icon' className='sign-icon' />
              </div>
            </div>
            <p>Please Sign In First.</p>
          </div>
        </div>

      </div>
    </>
  )
}

export default BookAppointment