import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary';
import userModel from "../models/userModel.js";

// admin login

const adminLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });

        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// API to get all doctors list for admin panel

const allDoctors = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// API to get all appointments list for admin panel

const allAppointments = async (req, res) => {
    try {
        const allAppointments = await appointmentModel.find({})
        res.json({ success: true, allAppointments })
        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// API to cancel a appointments from admin panel

const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true, status: "Rejected" });

        return res.json({ success: true, message: "Appointment successfully cancelled" });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get an appointment

const getAppointment = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await appointmentModel.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "User Not Found" });
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

// API to confirm the appointment

const confirmAppointment = async (req, res) => {
    try {
        const { doctorId, docName, docPhone, department, description, consultingFee } = req.body;
        const imageFile = req.file

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url

        const updatedAppointment = await appointmentModel.findByIdAndUpdate(req.params.id,
            {
                assignedDoctor: {
                    doctorId,
                    image: imageUrl,
                    docName,
                    docPhone,
                    department,
                    description,
                    consultingFee,
                    assignedAt: new Date(),
                },
                status: "Confirmed"
            },
            { new: true }
        );
        res.json({ success: true, updatedAppointment });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error });
    }
}

// API to complete the appointment

const completedAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        await appointmentModel.findByIdAndUpdate(appointmentId, { status: "Completed" });

        return res.json({ success: true, message: "Appointment successfully Completed" });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to delete the appointment 

const deleteAppointment = async (req, res) => {
    try {

        const { id } = req.body;

        const deletedAppointment = await appointmentModel.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        res.json({ success: true, message: "Appointment deleted successfully" });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// API to get dashboard data fro admin panel

const adminDashboard = async (req, res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})

        const pendingAppointments = await appointmentModel.countDocuments({ status: "Pending" });
        const confirmedAppointments = await appointmentModel.countDocuments({ status: "Confirmed" });
        const rejectedAppointments = await appointmentModel.countDocuments({ status: "Rejected" });
        const completedAppointments = await appointmentModel.countDocuments({ status: "Completed" });

        const dashData = {
            doctors: doctors.length,
            users: users.length,
            totalAppointments: pendingAppointments + confirmedAppointments + rejectedAppointments + completedAppointments,
            pendingAppointments,
            confirmedAppointments,
            rejectedAppointments,
            completedAppointments
        }

        res.json({success:true, dashData})
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


export { adminLogin, allDoctors, allAppointments, cancelAppointment, getAppointment, confirmAppointment, completedAppointment, deleteAppointment, adminDashboard };