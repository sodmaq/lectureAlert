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

  const inFiveMin = new Date(now.getTime() + 5 * 60 * 1000);
  const timeIn5Min = formatTime(inFiveMin);

  console.log(
    `🔍 Checking lectures for ${day} at ${currentTime} and ${timeIn5Min}`
  );

  const allTimetables = await Timetable.find().populate("user");

  allTimetables.forEach((t) => {
    t.lectures.forEach((lec) => {
      if (lec.day === day) {
        if (lec.time === currentTime) {
          console.log(`📬 NOW alert: ${lec.subject} to ${t.user.email}`);
          sendEmail(
            t.user.email,
            "📢 Lecture Alert",
            `⏰ You have ${lec.subject} now.`
          );
        } else if (lec.time === timeIn5Min) {
          console.log(`⏳ 5-min alert: ${lec.subject} to ${t.user.email}`);
          sendEmail(
            t.user.email,
            "⏳ Upcoming Lecture",
            `⏳ You have ${lec.subject} in 5 minutes.`
          );
        }
      }
    });
  });
});
