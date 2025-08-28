const express = require("express");
const Timetable = require("../models/Timetable");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

// Alternative: More robust timezone handling
router.get("/run-cron", async (req, res) => {
  // Helper function to get Nigeria time
  const getNigeriaTime = () => {
    const now = new Date();
    // Use Intl API to get accurate Nigeria time
    const nigeriaTimeString = now.toLocaleString("en-CA", {
      timeZone: "Africa/Lagos",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    // Convert back to Date object
    return new Date(nigeriaTimeString.replace(", ", "T"));
  };

  const nigeriaTime = getNigeriaTime();
  const day = nigeriaTime.toLocaleDateString("en-US", { weekday: "long" });

  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const currentTime = formatTime(nigeriaTime);

  // Rest of your code remains the same...
  const reminderIntervals = [
    { minutes: 0, label: "NOW", emoji: "📢", message: "now" },
    { minutes: 5, label: "5-min", emoji: "⏳", message: "in 5 minutes" },
    { minutes: 10, label: "10-min", emoji: "⏰", message: "in 10 minutes" },
    { minutes: 20, label: "20-min", emoji: "🔔", message: "in 20 minutes" },
    { minutes: 30, label: "30-min", emoji: "⏱️", message: "in 30 minutes" },
    { minutes: 60, label: "1hr", emoji: "📅", message: "in 1 hour" },
  ];

  // Use nigeriaTime for all calculations
  const reminderTimes = reminderIntervals.map((interval) => {
    const reminderDate = new Date(
      nigeriaTime.getTime() + interval.minutes * 60 * 1000
    );
    return {
      ...interval,
      time: formatTime(reminderDate),
    };
  });

  console.log(
    `🔍 Checking lecturess for ${day} at ${currentTime} (Nigeria Time)`
  );

  try {
    const allTimetables = await Timetable.find().populate("user");

    allTimetables.forEach((timetable) => {
      timetable.lectures.forEach((lecture) => {
        if (lecture.day === day && lecture.subject && lecture.time) {
          const [lectureHour, lectureMinute] = lecture.time
            .split(":")
            .map(Number);
          const lectureTimeInMinutes = lectureHour * 60 + lectureMinute;

          const currentTimeInMinutes =
            nigeriaTime.getHours() * 60 + nigeriaTime.getMinutes();

          let minutesUntilLecture = lectureTimeInMinutes - currentTimeInMinutes;

          if (minutesUntilLecture < 0) {
            minutesUntilLecture += 24 * 60;
          }

          reminderIntervals.forEach((interval) => {
            if (minutesUntilLecture === interval.minutes) {
              const subject = `${interval.emoji} ${
                interval.minutes === 0 ? "Lecture Alert" : "Upcoming Lecture"
              }`;
              const message = `${interval.emoji} You have ${lecture.subject} ${interval.message}.`;

              console.log(
                `${interval.emoji} ${interval.label} alert: ${lecture.subject} to ${timetable.user.email} (${minutesUntilLecture} minutes until lecture)`
              );

              sendEmail(timetable.user.email, subject, message);
            }
          });
        }
      });
    });

    res.json({
      success: true,
      message: "Cron job executed successfully",
      currentTime: currentTime,
      timezone: "Africa/Lagos (Nigeria Time)",
    });
  } catch (error) {
    console.error("❌ Error checking lectures:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
