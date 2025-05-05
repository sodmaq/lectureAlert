const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  subject: String,
  day: String,
  time: String, // e.g., "14:00"
});

const timetableSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lectures: [lectureSchema],
});

module.exports = mongoose.model("Timetable", timetableSchema);
