// const express = require("express");
// const Timetable = require("../models/Timetable");
// const sendEmail = require("../utils/sendEmail");

// const router = express.Router();

// router.get("/run-cron", async (req, res) => {
//   const now = new Date();
//   const day = now.toLocaleDateString("en-US", { weekday: "long" });

//   const formatTime = (date) =>
//     `${date.getHours().toString().padStart(2, "0")}:${date
//       .getMinutes()
//       .toString()
//       .padStart(2, "0")}`;

//   const currentTime = formatTime(now);

//   const reminderIntervals = [
//     { minutes: 0, label: "NOW", emoji: "📢", message: "now" },
//     { minutes: 5, label: "5-min", emoji: "⏳", message: "in 5 minutes" },
//     { minutes: 10, label: "10-min", emoji: "⏰", message: "in 10 minutes" },
//     { minutes: 20, label: "20-min", emoji: "🔔", message: "in 20 minutes" },
//     { minutes: 30, label: "30-min", emoji: "⏱️", message: "in 30 minutes" },
//     { minutes: 60, label: "1hr", emoji: "📅", message: "in 1 hour" },
//   ];

//   const reminderTimes = reminderIntervals.map((interval) => ({
//     ...interval,
//     time: formatTime(new Date(now.getTime() + interval.minutes * 60 * 1000)),
//   }));

//   console.log(`🔍 Checking lectures for ${day} at ${currentTime}`);

//   try {
//     const allTimetables = await Timetable.find().populate("user");

//     allTimetables.forEach((timetable) => {
//       timetable.lectures.forEach((lecture) => {
//         if (lecture.day === day) {
//           reminderTimes.forEach((reminder) => {
//             if (lecture.time === reminder.time) {
//               const subject = `${reminder.emoji} ${
//                 reminder.minutes === 0 ? "Lecture Alert" : "Upcoming Lecture"
//               }`;
//               const message = `${reminder.emoji} You have ${lecture.subject} ${reminder.message}.`;

//               console.log(
//                 `${reminder.emoji} ${reminder.label} alert: ${lecture.subject} to ${timetable.user.email}`
//               );

//               sendEmail(timetable.user.email, subject, message);
//             }
//           });
//         }
//       });
//     });

//     res.json({ success: true, message: "Cron job executed successfully" });
//   } catch (error) {
//     console.error("❌ Error checking lectures:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// module.exports = router;

const express = require("express");
const Timetable = require("../models/Timetable");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.get("/run-cron", async (req, res) => {
  try {
    // Use UTC time or specify timezone consistently
    const now = new Date();
    const day = now.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "Africa/Lagos",
    }); // Specify your timezone

    const formatTime = (date) => {
      // Ensure consistent timezone formatting
      const localDate = new Date(
        date.toLocaleString("en-US", { timeZone: "Africa/Lagos" })
      );
      return `${localDate.getHours().toString().padStart(2, "0")}:${localDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
    };

    const currentTime = formatTime(now);

    const reminderIntervals = [
      { minutes: 0, label: "NOW", emoji: "📢", message: "now" },
      { minutes: 5, label: "5-min", emoji: "⏳", message: "in 5 minutes" },
      { minutes: 10, label: "10-min", emoji: "⏰", message: "in 10 minutes" },
      { minutes: 20, label: "20-min", emoji: "🔔", message: "in 20 minutes" },
      { minutes: 30, label: "30-min", emoji: "⏱️", message: "in 30 minutes" },
      { minutes: 60, label: "1hr", emoji: "📅", message: "in 1 hour" },
    ];

    // Create reminder times with consistent timezone
    const reminderTimes = reminderIntervals.map((interval) => {
      const reminderDate = new Date(
        now.getTime() + interval.minutes * 60 * 1000
      );
      return {
        ...interval,
        time: formatTime(reminderDate),
      };
    });

    console.log(`🔍 Checking lectures for ${day} at ${currentTime}`);
    console.log(
      `📋 Reminder times to check:`,
      reminderTimes.map((r) => `${r.time} (${r.label})`).join(", ")
    );

    const allTimetables = await Timetable.find().populate("user");
    console.log(`👥 Found ${allTimetables.length} timetables to check`);

    let alertsSent = 0;
    const emailPromises = [];

    // Use for...of instead of forEach for better async handling
    for (const timetable of allTimetables) {
      console.log(`📚 Checking timetable for user: ${timetable.user.email}`);

      // Log lectures for this day
      const todaysLectures = timetable.lectures.filter(
        (lecture) => lecture.day === day
      );
      console.log(
        `📅 ${day} lectures for ${timetable.user.email}:`,
        todaysLectures.map((l) => `${l.subject} at ${l.time}`)
      );

      for (const lecture of timetable.lectures) {
        if (lecture.day === day) {
          console.log(
            `🔍 Checking lecture: ${lecture.subject} at ${lecture.time} for ${timetable.user.email}`
          );

          for (const reminder of reminderTimes) {
            if (lecture.time === reminder.time) {
              const subject = `${reminder.emoji} ${
                reminder.minutes === 0 ? "Lecture Alert" : "Upcoming Lecture"
              }`;
              const message = `${reminder.emoji} You have ${lecture.subject} ${reminder.message}.`;

              console.log(
                `✅ ${reminder.label} MATCH! Sending alert: ${lecture.subject} at ${lecture.time} to ${timetable.user.email}`
              );

              // Add to promises array for proper async handling
              emailPromises.push(
                sendEmail(timetable.user.email, subject, message)
              );
              alertsSent++;
            } else {
              console.log(
                `❌ No match: ${lecture.time} !== ${reminder.time} (${reminder.label})`
              );
            }
          }
        }
      }
    }

    // Wait for all emails to be sent
    if (emailPromises.length > 0) {
      await Promise.all(emailPromises);
      console.log(`📧 Successfully sent ${alertsSent} alerts`);
    } else {
      console.log(`📭 No alerts needed at ${currentTime}`);
    }

    res.json({
      success: true,
      message: "Cron job executed successfully",
      alertsSent,
      currentTime,
      day,
    });
  } catch (error) {
    console.error("❌ Error checking lectures:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
