// const cron = require("node-cron");
// const Timetable = require("../models/Timetable");
// const sendEmail = require("../utils/sendEmail");

// cron.schedule("* * * * *", async () => {
//   const now = new Date();
//   const day = now.toLocaleDateString("en-US", { weekday: "long" });

//   const formatTime = (date) =>
//     `${date.getHours().toString().padStart(2, "0")}:${date
//       .getMinutes()
//       .toString()
//       .padStart(2, "0")}`;

//   const currentTime = formatTime(now);

//   const inFiveMin = new Date(now.getTime() + 5 * 60 * 1000);
//   const timeIn5Min = formatTime(inFiveMin);

//   console.log(
//     `🔍 Checking lectures for ${day} at ${currentTime} and ${timeIn5Min}`
//   );

//   const allTimetables = await Timetable.find().populate("user");

//   allTimetables.forEach((t) => {
//     t.lectures.forEach((lec) => {
//       if (lec.day === day) {
//         if (lec.time === currentTime) {
//           console.log(`📬 NOW alert: ${lec.subject} to ${t.user.email}`);
//           sendEmail(
//             t.user.email,
//             "📢 Lecture Alert",
//             `⏰ You have ${lec.subject} now.`
//           );
//         } else if (lec.time === timeIn5Min) {
//           console.log(`⏳ 5-min alert: ${lec.subject} to ${t.user.email}`);
//           sendEmail(
//             t.user.email,
//             "⏳ Upcoming Lecture",
//             `⏳ You have ${lec.subject} in 5 minutes.`
//           );
//         }
//       }
//     });
//   });
// });
const cron = require("node-cron");
const Timetable = require("../models/Timetable");
const sendEmail = require("../utils/sendEmail");

cron.schedule("* * * * *", async () => {
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

  console.log(`🔍 Checking lectures for ${day} at ${currentTime}`);

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
  } catch (error) {
    console.error("❌ Error checking lectures:", error);
  }
});

// Optional: Add a startup message
console.log("🚀 Lecture reminder system started!");
console.log("📋 Reminder schedule:");
console.log("  • 1 hour before lecture");
console.log("  • 30 minutes before lecture");
console.log("  • 20 minutes before lecture");
console.log("  • 10 minutes before lecture");
console.log("  • 5 minutes before lecture");
console.log("  • When lecture starts");
