const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes")

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes)

// Test Route
app.get("/", (req, res) =>{
    res.send("API Working...");
});

// Connect MonngoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Sucessfully");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);

        });
    })
    .catch ((err) => console.log(err));