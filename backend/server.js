const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes")

const authMiddleware = require("./middleware/authMiddleware");
const projectRoutes = require("./routes/projectRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes)

app.use("/api/projects", projectRoutes);

// Test Route
app.get("/", (req, res) =>{
    res.send("API Working...");
});

app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You accessed protected route",
        user: req.user
    });
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