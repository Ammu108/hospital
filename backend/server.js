import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import appointmentRouter from "./routes/appointmentRoute.js"
import 'dotenv/config.js'

// app config
const app = express()
const port = process.env.PORT || 4000;

// DB Connection
connectDB();

// middleware
app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/appointment", appointmentRouter);

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, ()=>{
    console.log(`Server Started On http://localhost:${port}`)
})