import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    name:{
        type: String,  
        required: true,
    },
    dob:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    number:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    preferredDoctor:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    time:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    cancelled:{
        type: Boolean,
        default: false,
    },
})

const appointmentModel = mongoose.models.appointment || mongoose.model("appointment", appointmentSchema);
export default appointmentModel;