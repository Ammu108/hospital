import React from 'react'
import "./BookAppointment.css"

const BookAppointment = () => {
  return (
    <>
      <div className='book-appointment-container'>
        <div className='book-appointment-header'>
          <p><i>Note :- Please fill out the form with accurate details. You will receive a confirmation email/SMS once your appointment is 
          confirmed within 2 days. If you need to cancel, please do so at least 24 hours in advance.</i></p>
        </div>
        <div className='inside-book-appointment'>
        <form className="row g-3">
        <div className="col-md-6">
          <label for="inputName" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="inputName" placeholder='enter your full name' required/>
        </div>
        <div className="col-md-6">
          <label for="inputDob" className="form-label">Date Bo Birth</label>
          <input type="date" className="form-control" id="inputDob" required/>
        </div>
        <div className="col-md-6">
          <label for="gender" className="form-label">Gender</label>
          <select id="gender" name="gender" className="form-control" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="col-md-6">
          <label for="inputNumber" className="form-label">Contact Number</label>
          <input type="tel" className="form-control" id="inputNumber" required />
        </div>
        <div className="col-md-6">
          <label for="inputEmail" className="form-label">Email Address</label>
          <input type="email" className="form-control" id="inputEmail" placeholder="enter your email addrerss" required/>
        </div>
        <div className="col-md-6">
          <label for="gender" className="form-label">Preferred Doctor:</label>
          <select id="gender" name="gender" className="form-control" required>
            <option value="">Select Doctor</option>
            <option value="male">Dr. Smith (Cardiologist)</option>
            <option value="female">Dr. Johnson (Dermatologist)</option>
            <option value="other">Dr. stephen (general physician)</option>
          </select>
        </div>
        <div className="col-md-6">
          <label for="inputDate" className="form-label">Appointment Date:</label>
          <input type="date" className="form-control" id="inputDate" required/>
        </div>
        <div className="col-md-6">
          <label for="inputTime" className="form-label">Time Slot:</label>
          <input type="time" className="form-control" id="inputTime" required />
        </div>
        <div className="col-12">
          <label for="inputAddress" className="form-label">Address</label>
          <input type="text" className="form-control" id="inputAddress" required/>
        </div>
        <div className="col-12 submit-appointment-btn">
          <button className='submit-btn-div'>Submit</button>
        </div>
      </form>
        </div>
      </div>
    </>
  )
}

export default BookAppointment