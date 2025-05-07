// const cron = require("node-cron");
// const Timetable = require("../models/Timetable");
// const User = require("../models/User");
// const sendEmail = require("../utils/sendEmail.js");

// cron.schedule("* * * * *", async () => {
//   const now = new Date();
//   const day = now.toLocaleDateString("en-US", { weekday: "long" });
//   const time = `${now.getHours().toString().padStart(2, "0")}:${now
//     .getMinutes()
//     .toString()
//     .padStart(2, "0")}`;

//   console.log(`🔍 Checking lectures for ${day} at ${time}`);

//   const allTimetables = await Timetable.find().populate("user");

//   allTimetables.forEach((t) => {
//     t.lectures.forEach((lec) => {
//       if (lec.day === day && lec.time === time) {
//         console.log(`📬 Sending alert for ${lec.subject} to ${t.user.email}`);
//         sendEmail(
//           t.user.email,
//           "Lecture Alert",
//           `You have ${lec.subject} now.`
//         );
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

  const currentHour = now.getHours().toString().padStart(2, "0");
  const currentMin = now.getMinutes().toString().padStart(2, "0");
  const currentTime = `${currentHour}:${currentMin}`;

  // Time 5 minutes from now
  const before5 = new Date(now.getTime() + 5 * 60000); // 5 min in ms
  const alertHour = before5.getHours().toString().padStart(2, "0");
  const alertMin = before5.getMinutes().toString().padStart(2, "0");
  const timeIn5Min = `${alertHour}:${alertMin}`;

  console.log(
    `🔍 Checking lectures for ${day} at ${currentTime} (and in 5 mins: ${timeIn5Min})`
  );

  const allTimetables = await Timetable.find().populate("user");

  allTimetables.forEach((t) => {
    t.lectures.forEach((lec) => {
      if (lec.day === day) {
        if (lec.time === currentTime) {
          sendEmail(
            t.user.email,
            "📢 Lecture Alert",
            `⏰ You have ${lec.subject} now.`
          );
          console.log(
            `📬 Alert sent for ${lec.subject} at ${currentTime} to ${t.user.email}`
          );
        } else if (lec.time === timeIn5Min) {
          sendEmail(
            t.user.email,
            "⏳ Upcoming Lecture",
            `⏳ You have ${lec.subject} in 5 minutes.`
          );
          console.log(
            `⏳ 5-mins-ahead alert sent for ${lec.subject} to ${t.user.email}`
          );
        }
      }
    });
  });
});
