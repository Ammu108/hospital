import React, { useContext, useState } from 'react'
import './Login.css'
import { AdminContext } from '../../context/AdminContext';
import axios from "axios";
import { toast } from 'react-toastify';
import { DoctorContext } from '../../context/DoctorContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [state, setState] = useState("Admin");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl, setAToken } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext)
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {

    event.preventDefault();

    try {

      if (state === 'Admin') {

        const { data } = await axios.post(backendUrl + `/api/admin/login`, { email, password });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          navigate('/dashboard')
        } else {
          toast.error(data.message);
        }

      } else {
         const { data } = await axios.post(backendUrl + '/api/doctor/login', {email, password})

         if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          console.log(data.token)
        } else {
          toast.error(data.message);
        }

      }

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <div className='admin-login-container'>
        <div className='admin-login-box'>
          <form onSubmit={onSubmitHandler}>
            <div className='admin-login-form-header'>
              <p><span>{state} </span>Login</p>
            </div>
            <hr className='admin-form-header-bar mt-2 mb-4'/>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="admin_email" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" id="admin_password" placeholder="password" />
            </div>
            {error && (
              <div className='admin-form-error-div mb-3'>
                <p>Invalid Credentials</p>
              </div>
            )}
            <div className="mb-3">
              <button className='admin_login_btn'>Login</button>
            </div>
            <div className='switch-panel-div'>
              {state === 'Admin' ? (
                <p>Doctor Login? <span onClick={() => setState('Doctor')}>click here</span></p>
              ) : (
                <p>Admin Login? <span onClick={() => setState('Admin')}>click here</span></p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
