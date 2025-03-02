import React, { useContext } from 'react'
import Login from './pages/Login/Login'
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor/AddDoctor';
import DoctorList from './pages/Admin/DoctorList/DoctorList';
import ConfirmAppointment from './ConfirmAppointment/ConfirmAppointment';
import ConfirmedAppointment from './ConfirmedAppointment/ConfirmedAppointment';
import DoctorDetails from './DoctorDetails/DoctorDetails';
import AllUsers from './AllUsers/AllUsers';

const App = () => {

  const { aToken } = useContext(AdminContext);

  return (
    <>
      {aToken ? (
        <div className='admin-panel-body'>
          <ToastContainer />
          <Navbar />
          <div className='admin-content'>
            <Sidebar />
            <div className='inside-admin-content'>
              <Routes>

                {/* Admin Routes */}
                <Route path="/" element={<></>} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/all-appointments" element={<AllAppointments />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/doctor-list" element={<DoctorList />} />
                <Route path="/confirm-appointment/:id" element={<ConfirmAppointment />} />
                <Route path="/confirmed-appointment/:id" element={<ConfirmedAppointment />} />
                <Route path="/doctor-details/:id" element={<DoctorDetails />} />
                <Route path="/all-users" element={<AllUsers />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Login />
          <ToastContainer />
        </>
      )}
    </>
  )
}

export default App


{/* <div className='adding-form-header'>
              <div className='upload-img-div' onClick={() => fileInputRef.current.click()}>
                <img src={docImg ? URL.createObjectURL(docImg) : 'user.png'} alt='img' className=' ' />
                <input type='file' id='doc_img' ref={fileInputRef} onChange={handleFileUpload} hidden />
              </div>
              <p className='upload-header-text mt-3 px-3'>Upload Doctor <br />Image</p>
            </div> */}
