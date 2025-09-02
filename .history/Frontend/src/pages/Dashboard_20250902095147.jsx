/* eslint-disable */
import { useEffect, useState } from "react";
import {
  X,
  Clock,
  Calendar,
  Book,
  Plus,
  Save,
  Trash2,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import your actual axios instance
import axios from "../api/axios";

// Toast notification component
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className={`fixed top-4 right-4 z-50 rounded-lg shadow-lg px-4 py-3 flex items-center ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white`}
  >
    <span>{message}</span>
    <button onClick={onClose} className="ml-3">
      <X size={16} />
    </button>
  </motion.div>
);

const Dashboard = () => {
  const [lectures, setLectures] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isDayView, setIsDayView] = useState(false);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (index, e) => {
    const newLectures = [...lectures];
    newLectures[index][e.target.name] = e.target.value;
    setLectures(newLectures);
  };

  const addLecture = () => {
    setLectures([
      ...lectures,
      { subject: "", day: "", time: "", id: Date.now() },
    ]);
  };

  const removeLecture = (index) => {
    const newLectures = [...lectures];
    newLectures.splice(index, 1);
    setLectures(newLectures);
  };

  const saveTimetable = async () => {
    try {
      setIsLoading(true);
      // Send data to your API
      await axios.post("/timetable", { lectures });
      showToast("Timetable saved successfully!");

      // Fetch the updated data from the server to ensure consistency
      await getTimetable();
    } catch (error) {
      showToast("Failed to save timetable", "error");
      console.error("Error saving timetable:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTimetable = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/timetable");
      if (res.data?.lectures && res.data.lectures.length > 0) {
        // Use the data exactly as received from the server
        setLectures(
          res.data.lectures.map((lec) => ({
            ...lec,
            id: lec.id || Date.now() + Math.random(), // Only add ID if missing
          }))
        );
      } else {
        // Initialize with an empty lecture if no data
        setLectures([{ subject: "", day: "", time: "", id: Date.now() }]);
      }
    } catch (error) {
      console.error("Error fetching timetable:", error);
      showToast("Failed to load timetable", "error");
      setLectures([{ subject: "", day: "", time: "", id: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTimetable();
  }, []);

  // Group lectures by day for the day view
  const lecturesByDay = days.map((day) => ({
    day,
    lectures: lectures
      .filter((lecture) => lecture.day === day)
      .sort((a, b) => a.time.localeCompare(b.time)),
  }));

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`,
      }}
    >
      {/* Blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-800/80 to-indigo-900/85"></div>

      <div className="relative z-10">
        <AnimatePresence>
          {toast.show && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ ...toast, show: false })}
            />
          )}
        </AnimatePresence>

        {/* Hero Section with Student Image */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Left side - Hero content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <GraduationCap size={48} className="text-blue-200 mr-3" />
                    <h1 className="text-5xl lg:text-6xl font-bold text-white">
                      Smart Schedule
                    </h1>
                  </div>
                  <p className="text-xl text-blue-100 mb-6 max-w-2xl">
                    Transform your academic journey with our intelligent lecture
                    alert system. Stay organized, never miss a class, and excel
                    in your studies.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <BookOpen size={20} className="text-blue-200 mr-2" />
                      <span className="text-blue-100">
                        Never Miss a Lecture
                      </span>
                    </div>
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                      <Clock size={20} className="text-blue-200 mr-2" />
                      <span className="text-blue-100">Smart Notifications</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right side - Student studying image */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex-1 max-w-md lg:max-w-lg"
              >
                <div className="relative">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white/20">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Students collaborating"
                      className="w-full h-80 lg:h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Dashboard Content */}
        <div className="container mx-auto px-4 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <h1 className="text-3xl font-bold text-white mb-2 sm:mb-0">
                  Your Timetable
                </h1>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsDayView(!isDayView)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white px-3 py-1.5 rounded-md text-sm flex items-center"
                  >
                    {isDayView ? (
                      <>
                        <Calendar size={16} className="mr-1.5" /> List View
                      </>
                    ) : (
                      <>
                        <Calendar size={16} className="mr-1.5" /> Day View
                      </>
                    )}
                  </button>
                  <button
                    onClick={saveTimetable}
                    disabled={isLoading}
                    className={`bg-white text-blue-700 px-4 py-1.5 rounded-md text-sm font-medium flex items-center
                      ${
                        isLoading
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:bg-blue-50"
                      } transition-colors`}
                  >
                    <Save size={16} className="mr-1.5" />
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
              <p className="text-blue-100">
                Organize your weekly lectures and classes
              </p>
            </div>

            <div className="p-4 sm:p-6">
              {isDayView ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lecturesByDay.map((dayData) => (
                    <motion.div
                      key={dayData.day}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 shadow-lg border border-blue-100"
                    >
                      <h3 className="text-lg font-medium text-blue-800 mb-3 border-b border-blue-200 pb-2">
                        {dayData.day}
                      </h3>
                      {dayData.lectures.length > 0 ? (
                        <div className="space-y-2">
                          {dayData.lectures.map((lecture, idx) => (
                            <motion.div
                              key={lecture.id || idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="bg-white p-3 rounded shadow-sm border border-gray-100"
                            >
                              <div className="font-medium text-gray-800">
                                {lecture.subject}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center mt-1">
                                <Clock size={14} className="mr-1" />
                                {lecture.time}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-blue-500 italic">
                          No lectures scheduled
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div>
                  <AnimatePresence>
                    {lectures.map((lecture, index) => (
                      <motion.div
                        key={lecture.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="flex flex-col sm:flex-row gap-3 mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg shadow-lg border border-blue-100"
                      >
                        <div className="flex-1">
                          <div className="flex items-center text-gray-600 mb-1 text-sm">
                            <Book size={16} className="mr-1.5" /> Course Code
                          </div>
                          <input
                            name="subject"
                            value={lecture.subject}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Enter subject name"
                            className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          />
                        </div>
                        <div className="w-full sm:w-40">
                          <div className="flex items-center text-gray-600 mb-1 text-sm">
                            <Calendar size={16} className="mr-1.5" /> Day
                          </div>
                          <select
                            name="day"
                            value={lecture.day}
                            onChange={(e) => handleChange(index, e)}
                            className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="">Select day</option>
                            {days.map((day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="w-full sm:w-32">
                          <div className="flex items-center text-gray-600 mb-1 text-sm">
                            <Clock size={16} className="mr-1.5" />
                            Lecture Time
                          </div>
                          <input
                            name="time"
                            type="time"
                            value={lecture.time}
                            onChange={(e) => handleChange(index, e)}
                            className="w-full p-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          />
                        </div>
                        <div className="flex items-end justify-end sm:w-10">
                          <button
                            onClick={() => removeLecture(index)}
                            className="p-2.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                            title="Remove lecture"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button
                      onClick={addLecture}
                      className="mt-2 flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
                    >
                      <Plus size={18} className="mr-1" /> Add New Lecture
                    </button>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
