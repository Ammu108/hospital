import { createContext, useEffect, useState } from "react";
import { doctorsDetails, specialityMenu } from "../assets/assets";
import axios from 'axios'
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {

    // const url = "http://localhost:4000";
    // "https://hospital-backend-12qu.onrender.com" ||
    const url = "https://hospital-backend-12qu.onrender.com" || import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [doctorsDetails, setDoctorsDetails] = useState([]);

    const getDoctorsData = async () => {

        try {

            const { data } = await axios.get(url + '/api/doctor/list')
            if(data.success){
                setDoctorsDetails(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        getDoctorsData()
    },[])

    const value = {
        specialityMenu,
        doctorsDetails,
        url,
        token,
        setToken,
        user,
        setUser
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider