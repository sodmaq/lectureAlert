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
          // Convert lecture time to minutes for comparison
          const [lectureHour, lectureMinute] = lecture.time
            .split(":")
            .map(Number);
          const lectureTimeInMinutes = lectureHour * 60 + lectureMinute;

          // Convert current time to minutes
          const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

          // Check each reminder interval
          reminderTimes.forEach((reminder) => {
            if (lecture.time === reminder.time) {
              // Calculate how many minutes before the lecture this reminder should be sent
              const reminderMinutesBeforeLecture = reminder.minutes;

              // Calculate when this lecture was likely created (approximate)
              // If current time + reminder interval = lecture time,
              // then lecture was created around: current time - (time since creation)
              const timeUntilLecture =
                lectureTimeInMinutes - currentTimeInMinutes;

              // Only send alerts that make sense based on timing
              // If the alert is for "NOW" (0 minutes), always send it
              // If the alert is for future (5min, 10min, etc.), only send if enough time has passed
              // since the lecture could have been created

              if (reminder.minutes === 0) {
                // Always send "NOW" alert when lecture time arrives
                const subject = `${reminder.emoji} Lecture Alert`;
                const message = `${reminder.emoji} You have ${lecture.subject} ${reminder.message}.`;

                console.log(
                  `${reminder.emoji} ${reminder.label} alert: ${lecture.subject} to ${timetable.user.email}`
                );

                sendEmail(timetable.user.email, subject, message);
              } else {
                // For advance alerts (5min, 10min, 30min, 1hr before)
                // Only send if we're actually at the right time for this advance notice
                // This means the lecture is exactly X minutes away

                if (timeUntilLecture === reminderMinutesBeforeLecture) {
                  const subject = `${reminder.emoji} Upcoming Lecture`;
                  const message = `${reminder.emoji} You have ${lecture.subject} ${reminder.message}.`;

                  console.log(
                    `${reminder.emoji} ${reminder.label} alert: ${lecture.subject} to ${timetable.user.email}`
                  );

                  sendEmail(timetable.user.email, subject, message);
                }
              }
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
