import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : '');
    const [doctors, setDoctors] = useState([]);
    const [allAppointments, setAllAppointments] = useState([]);
    const navigate = useNavigate();
    const [dashData, setDashData] = useState(false)
    const [allUsers, setAllUsers] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // "https://hospital-backend-12qu.onrender.com" ||
    
    const getAllDoctors = async () => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/all-appointments', {}, { headers: { aToken } })
            if (data.success) {
                setAllAppointments(data.allAppointments.reverse())
                console.log(data.allAppointments)
            } else {
                toast.error(error.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(data.message)
        }
    }

    const cancelAppointments = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/appointment-cancel', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            }

        } catch (error) {
            toast.error(data.message)
        }
    }

    const completedAppointment = async (appointmentId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/appointment-completed', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                navigate("/all-appointments")
                getAllAppointments()
            }

        } catch (error) {
            toast.error(data.message)
        }
    }

    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(data.message)
        }
    }

    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/all-users', {}, { headers: { aToken } })
            if (data.success) {
                setAllUsers(data.allUsers.reverse())
                console.log(data.allUsers)
            } else {
                toast.error(error.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(data.message)
        }
    }

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        allAppointments,
        getAllAppointments,
        cancelAppointments,
        completedAppointment,
        dashData,
        getDashData,
        allUsers,
        getAllUsers,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider