const cron = require("node-cron");
const Timetable = require("../models/Timetable");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail.js");

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const time = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  console.log(`🔍 Checking lectures for ${day} at ${time}`);

  const allTimetables = await Timetable.find().populate("user");

  allTimetables.forEach((t) => {
    t.lectures.forEach((lec) => {
      if (lec.day === day && lec.time === time) {
        console.log(`📬 Sending alert for ${lec.subject} to ${t.user.email}`);
        sendEmail(
          t.user.email,
          "Lecture Alert",
          `You have ${lec.subject} now.`
        );
      }
    });
  });
});
