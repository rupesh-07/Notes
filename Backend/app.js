const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Middleware
app.use(cors());
app.use(express.json());

//Testing Purpose
app.get("/", (req, res) => {
  res.send("Home Page Backend");
});

// Routes
app.use("/notes", noteRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
