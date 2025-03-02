import express from 'express'
import { doctorDetails, doctorList, loginDoctor } from '../controllers/doctorController.js'

const doctorRouter = express.Router()

doctorRouter.post("/login", loginDoctor)
doctorRouter.get('/list', doctorList)
doctorRouter.get('/doctor-details/:id', doctorDetails)

export default doctorRouter