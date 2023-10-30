require("dotenv").config();
const express = require("express");
const cors = require("cors")
const { connectDB } = require("./config/db")
const { userRouter } = require("./routes/user.route")
const { doctorRouter } = require("./routes/doctor.route");
const { connection } = require("./models/user.model");

const app = express();

app.use(express.json());
app.use(cors())
app.use("/user", userRouter)
app.use("/doctor", doctorRouter)

app.get("/", (req, res) => {
    res.send("Welcome to Doctor Management System")
})

let PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
    try {
      await connection  
      console.log("Connected to DB");
    } catch (error) {
      console.log("Cannot connect to Database");
    }
  });
