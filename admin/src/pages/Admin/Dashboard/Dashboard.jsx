import React, { useContext, useEffect } from 'react'
import './Dashboard.css'
import { adminImages } from '../../../assets/assets'
import { AdminContext } from '../../../context/AdminContext'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const { aToken, dashData, getDashData, cancelAppointments} = useContext(AdminContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(aToken){
            getDashData()
        }
    },[aToken])

    const goToAllUsers = () => {
        navigate("/all-users")
    }

    const goToAllAppointments = () => {
        navigate("/all-appointments")
    }

    const goToAllDoctors = () => {
        navigate("/doctor-list")
    }

    return (
        <>
            <div className='admin-dashboard-container'>
                <div className='inside-admin-dashboard-container'>

                    <div className='dashboard-details-parent-div'>
                        <div onClick={goToAllUsers} className='total-users-div' style={{cursor: "pointer"}}>
                            <div className='new-user-img-div'>
                                <img src={adminImages.newUser} alt='img' />
                            </div>
                            <div className='total-users-details'>
                                <p className='total-user-number'>{dashData.users}</p>
                                <p className='total-user-text'>Users</p>
                            </div>
                        </div>

                        <div onClick={goToAllAppointments} className='total-appointments-div' style={{cursor: "pointer"}}>
                            <div className='total-appoiintments-img-div'>
                                <img src={adminImages.totalAppointments} alt='img' />
                            </div>
                            <div className='total-users-details mx-4'>
                                <p className='total-user-number'>{dashData.totalAppointments}</p>
                                <p className='total-user-text'>Appointments</p>
                            </div>
                        </div>

                        <div onClick={goToAllDoctors} className='total-appointments-div' style={{cursor: "pointer"}}>
                            <div className='total-appoiintments-img-div'>
                                <img src={adminImages.doctor} alt='img' />
                            </div>
                            <div className='total-users-details mx-4'>
                                <p className='total-user-number'>{dashData.doctors}</p>
                                <p className='total-user-text'>Total Doctors</p>
                            </div>
                        </div>
                    </div>

                    <div className='total-appointments-details-div'>
                        <div className='total-appoiintments-img-div'>
                            <img src={adminImages.totalAppointments} alt='img' />
                        </div>
                        <div className='total-appointments-details-status-div mx-4'>
                            <p className='total-appointments-status-title'>Total Appointments Status :- </p>
                            <div className='total-appointments-details mt-3'>
                                <div className='appointments-status-div'>
                                    <p>Pending : {dashData.pendingAppointments}</p>
                                </div>
                                <div className='appointments-status-div'>
                                    <p>Confirm : {dashData.confirmedAppointments}</p>
                                </div>
                                <div className='appointments-status-div'>
                                    <p>Completed : {dashData.completedAppointments}</p>
                                </div>
                                <div className='appointments-status-div mx-4'>
                                    <p>Rejected : {dashData.rejectedAppointments}</p>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}

export default Dashboard
