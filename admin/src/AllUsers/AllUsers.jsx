import React, { useContext, useEffect, useState } from 'react'
import './AllUsers.css'
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const AllUsers = () => {

    const { allUsers, getAllUsers, aToken, backendUrl } = useContext(AdminContext);
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/dashboard")
    }

    const handleDelete = async (appointmentId) => {
        if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    
        try {
          const response = await axios.delete(`${backendUrl}/api/user/delete-user`, {headers: { aToken }, data: { id: appointmentId }});
    
          if (response.data.success) {
            toast.success("Appointment deleted successfully!");
            navigate("/dashboard"); // Redirect to appointments list
          } else {
            toast.error("Failed to delete appointment");
          }
        } catch (error) {
          console.error("Error deleting appointment:", error);
          toast.error("Error deleting appointment");
        }
      };

    useEffect(() => {
        if (aToken) {
            setLoading(true)
            getAllUsers()
        }
        setLoading(false)
      }, [aToken])

    return (
        <>
            <div className='admin-all-users-container'>
                <div className='confirm-appointment-header-container'>
                    <button onClick={handleGoBack}><i className="fa-solid fa-arrow-left"></i>Back</button>
                    <div className='confirm-appointment-header'>
                        <p>All Users</p>
                    </div>
                </div>
                <div className='inside-admin-all-users-container'>
                {loading ? (
                    <p className="loading-text">Loading users...</p>
                ) : allUsers.length > 0 ? (
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className='all-users-name'>Name</th>
                                <th>Email</th>
                                <th className='all-user-actions-btn'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className="delete-button" onClick={()=>handleDelete(user._id)}>
                                            <i className="fa-solid fa-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-users-text">No users found.</p>
                )}
                </div>
            </div>
        </>
    )
}

export default AllUsers
