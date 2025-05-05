const express = require("express");
const {
  saveTimetable,
  getTimetable,
} = require("../controllers/timetableController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.post("/", authMiddleware, saveTimetable);
router.get("/", authMiddleware, getTimetable);

module.exports = router;
