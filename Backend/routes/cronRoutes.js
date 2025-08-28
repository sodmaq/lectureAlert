const express = require("express");
const Timetable = require("../models/Timetable");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.get("/run-cron", async (req, res) => {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" });

  const formatTime = (date) =>
    `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

  const currentTime = formatTime(now);

  // Calculate different reminder times
  const reminderIntervals = [
    { minutes: 0, label: "NOW", emoji: "📢", message: "now" },
    { minutes: 5, label: "5-min", emoji: "⏳", message: "in 5 minutes" },
    { minutes: 10, label: "10-min", emoji: "⏰", message: "in 10 minutes" },
    { minutes: 20, label: "20-min", emoji: "🔔", message: "in 20 minutes" },
    { minutes: 30, label: "30-min", emoji: "⏱️", message: "in 30 minutes" },
    { minutes: 60, label: "1hr", emoji: "📅", message: "in 1 hour" },
  ];

  const reminderTimes = reminderIntervals.map((interval) => ({
    ...interval,
    time: formatTime(new Date(now.getTime() + interval.minutes * 60 * 1000)),
  }));

  console.log(`🔍 Checking lecturess for ${day} at ${currentTime}`);

  try {
    const allTimetables = await Timetable.find().populate("user");

    allTimetables.forEach((timetable) => {
      timetable.lectures.forEach((lecture) => {
        if (lecture.day === day) {
          // Check each reminder interval
          reminderTimes.forEach((reminder) => {
            if (lecture.time === reminder.time) {
              const subject = `${reminder.emoji} ${
                reminder.minutes === 0 ? "Lecture Alert" : "Upcoming Lecture"
              }`;
              const message = `${reminder.emoji} You have ${lecture.subject} ${reminder.message}.`;

              console.log(
                `${reminder.emoji} ${reminder.label} alert: ${lecture.subject} to ${timetable.user.email}`
              );

              sendEmail(timetable.user.email, subject, message);
            }
          });
        }
      });
    });

    res.json({ success: true, message: "Cron job executed successfully" });
  } catch (error) {
    console.error("❌ Error checking lectures:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
