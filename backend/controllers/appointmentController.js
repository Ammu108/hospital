import appointmentModel from "../models/appointmentModel.js";
import nodemailer from 'nodemailer';

const bookingDetails = async (req, res) => {

    try {
        const { name, dob, gender, number, email, preferredDoctor, date, time, address, description } = req.body;

        if (!name || !dob || !gender || !number || !email || !preferredDoctor || !date || !time || !address || !description) {
            return res.status(400).json({ error: "All Fields Are Required" })
        }

        const newAppointment = new appointmentModel({
            name, dob, gender, number, email, preferredDoctor, date, time, address, description,
        });

        await newAppointment.save();

        let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465, // Use Gmail or another provider
            auth: {
                user: "atomhospital@gmail.com", // Replace with your email
                pass: "fzzcefdgujqirtrt" // Use App Password if using Gmail
            }
        });

        // Email options
        const mailOptions = {
            from: "atomhospital@gmail.com",
            to: email, // Send to user's email
            subject: "Appointment Confirmation",
            text: `Hello ${name},\n\nYour appointment with ${preferredDoctor} is confirmed for ${date} at ${time}.
            \n\nAddress: ${address}\n\n\nYou will receive a confirmation email once your appointment is 
            confirmed within 2 days. If you need to cancel, please do so at least 24 hours in advance.
            \n\nThank you!\nAtom Hospital Team.`,
        };

        // Send email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Email Error:", err);
            } else {
                console.log("Email sent:", info.response);
            }
        });

        return res.status(201).json({ success: "true", message: "Appointment booked successfully", appointment: newAppointment })

    } catch (error) {
        return res.status(500).json({ error: "Something Went Wrong", details: error.message });
    }
};

export default bookingDetails;