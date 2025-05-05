import { useEffect, useState } from "react";
import axios from "../api/axios";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Dashboard = () => {
  const [lectures, setLectures] = useState([
    { subject: "", day: "", time: "" },
  ]);

  const handleChange = (index, e) => {
    const newLectures = [...lectures];
    newLectures[index][e.target.name] = e.target.value;
    setLectures(newLectures);
  };

  const addLecture = () => {
    setLectures([...lectures, { subject: "", day: "", time: "" }]);
  };

  const saveTimetable = async () => {
    await axios.post("/timetable", { lectures });
    alert("Timetable saved!");
  };

  const getTimetable = async () => {
    const res = await axios.get("/timetable");
    if (res.data?.lectures) setLectures(res.data.lectures);
  };

  useEffect(() => {
    getTimetable();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl mb-4 font-bold bg-red-300 p-2">Your Timetable</h2>
      {lectures.map((lec, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            name="subject"
            value={lec.subject}
            onChange={(e) => handleChange(i, e)}
            placeholder="Subject"
            className="flex-1 p-2 border"
          />
          <select
            name="day"
            value={lec.day}
            onChange={(e) => handleChange(i, e)}
            className="p-2 border"
          >
            <option value="">Day</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <input
            name="time"
            type="time"
            value={lec.time}
            onChange={(e) => handleChange(i, e)}
            className="p-2 border"
          />
        </div>
      ))}
      <button
        onClick={addLecture}
        className="bg-gray-300 px-3 py-1 rounded mr-2"
      >
        + Add
      </button>
      <button
        onClick={saveTimetable}
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default Dashboard;
