import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    speciality:{
        type: String,
        required: true,
    },
    degree:{
        type: String,
        required: true,
    },
    experience:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: Number,
        required: true,
    },
    about:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
}, {minimize: false})

const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema)
export default doctorModel;