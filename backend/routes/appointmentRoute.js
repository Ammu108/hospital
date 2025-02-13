import express from 'express';
import bookingDetails from '../controllers/appointmentController.js';

const appointmentRouter = express.Router();

appointmentRouter.post("/bookappointment", bookingDetails);

export default appointmentRouter;