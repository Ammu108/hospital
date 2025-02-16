import React, { useContext, useEffect, useState } from 'react'
import "./UpdateAppointment.css"
import { useParams, useNavigate  } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const UpdateAppointment = () => {

    const users = {
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
    }
    const { id } = useParams();
    const { url, token } = useContext(AppContext);
    const [user, setUser] = useState(users);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [close, setClose] = useState(false);
    const navigate = useNavigate();

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        console.log(user);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/api/appointment/getappointment/${id}`, { headers: { token } });
                if (response.data) {
                    setUser(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [id, url, token]);


    const updateAppointment = async (event) => {

        event.preventDefault();

        if (!token) {
            handleSignIn();
            return;
        }

        setLoading(true);
        let newUrl = `${url}/api/appointment/updateappointment/${id}`;

        try {

            const response = await axios.put(newUrl, user, { headers: { token } });

            if (response.data.success) {
                setSuccess("Appointment updated successfully! A confirmation email has been sent.");
                setClose(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
                setUser({
                    name: "", dob: "", gender: "", number: "", email: "",
                    preferredDoctor: "", date: "", time: "", address: "", description: "",
                });
                navigate('/');
            } else {
                setError(response.data.message);
            }

            navigate('/yourappointment');

        } catch (err) {
            setError("Failed to update appointment. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className='update-appointments-container'>
                <div className='my-appointments-header'>
                    <p>Update Appointment</p>
                    <hr />
                </div>
                <div className='inside-update-appointments-container'>
                    <div className='update-container-page-form'>
                        <form onSubmit={updateAppointment} className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="inputName" className="form-label">Full Name</label>
                                <input type="text" name="name" value={user.name} onChange={inputChangeHandler} className="form-control" id="inputName" placeholder='enter your full name' required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputDob" className="form-label">Date of Birth</label>
                                <input type="date" name="dob" value={user.dob} onChange={inputChangeHandler} className="form-control" id="inputDob" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select id="gender" name="gender" value={user.gender} onChange={inputChangeHandler} className="form-control" required>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputNumber" className="form-label">Contact Number</label>
                                <input type="tel" name='number' value={user.number} className="form-control" onChange={inputChangeHandler} id="inputNumber" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputEmail" className="form-label">Email Address</label>
                                <input type="email" name='email' value={user.email} className="form-control" onChange={inputChangeHandler} id="inputEmail" placeholder="enter your email address" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="preferredDoctor" className="form-label">Preferred Doctor:</label>
                                <select id="preferredDoctor" name="preferredDoctor" value={user.preferredDoctor} onChange={inputChangeHandler} className="form-control" required>
                                    <option value="">Select Doctor</option>
                                    <option value="dr-smith">Dr. Smith (Cardiologist)</option>
                                    <option value="dr-johnson">Dr. Johnson (Dermatologist)</option>
                                    <option value="dr-stephen">Dr. Stephen (General Physician)</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputDate" className="form-label">Appointment Date:</label>
                                <input type="date" name='date' value={user.date} className="form-control" onChange={inputChangeHandler} id="inputDate" required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputTime" className="form-label">Time Slot:</label>
                                <input type="time" name='time' value={user.time} className="form-control" onChange={inputChangeHandler} id="inputTime" required />
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Address</label>
                                <input type="text" name='address' value={user.address} className="form-control" onChange={inputChangeHandler} id="inputAddress" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description:</label>
                                <textarea className="form-control" value={user.description} name='description' onChange={inputChangeHandler} id="description" rows="3" placeholder="Describe your symptoms or medical history..."></textarea>
                            </div>

                            <div className="col-12 submit-appointment-btn">
                                <button type='submit' className='submit-btn' disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Appointment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateAppointment;
