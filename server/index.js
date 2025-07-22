const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads/avatars", express.static(path.join(__dirname, "uploads/avatars"))); 

// Routes
app.use("/api/auth", require("./routes/authRoutes"));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
