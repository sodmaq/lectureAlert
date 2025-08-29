const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/userRoutes.js");
const timetableRoutes = require("./routes/timetableRoutes.js");
const cronRoutes = require("./routes/cronRoutes.js"); // ✅ new route for cron trigger

dotenv.config();

const app = express();
// CORS setup
app.use(
  cors({
    origin: ["https://lecture-alert.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB error:", err));

// API routes
app.use("/api/users", userRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api", cronRoutes); // ✅ now your cron logic is accessible at /api/run-cron

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
