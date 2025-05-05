const Timetable = require("../models/Timetable");

exports.saveTimetable = async (req, res) => {
  const { lectures } = req.body;
  console.log(lectures);
  const timetable = await Timetable.findOneAndUpdate(
    { user: req.user.id },
    { lectures },

    { upsert: true, new: true }
  );
  return res.json(timetable);
};

exports.getTimetable = async (req, res) => {
  const timetable = await Timetable.findOne({ user: req.user.id });
  res.json(timetable);
};
