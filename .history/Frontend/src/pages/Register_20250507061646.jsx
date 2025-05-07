// import { useState } from "react";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Register = () => {
//   const [data, setData] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setData({ ...data, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("/users/register", data);
//     toast.success("Registration successful!");
//     navigate("/login");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto mt-10 p-4 border rounded"
//     >
//       <h2 className="text-xl mb-4 font-bold">Register</h2>
//       <input
//         name="name"
//         onChange={handleChange}
//         placeholder="Name"
//         className="w-full mb-3 p-2 border"
//         required
//       />
//       <input
//         name="email"
//         type="email"
//         onChange={handleChange}
//         placeholder="Email"
//         className="w-full mb-3 p-2 border"
//         required
//       />
//       <input
//         name="password"
//         type="password"
//         onChange={handleChange}
//         placeholder="Password"
//         className="w-full mb-3 p-2 border"
//         required
//       />
//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 rounded"
//       >
//         Register
//       </button>
//     </form>
//   );
// };

// export default Register;
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Register = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (data.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (data.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await axios.post("/users/register", data);
      toast.success("Registration successful!");

      // Add a small delay to show success state before navigating
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to check password strength
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "" };

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const checks = [
      password.length >= 8,
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSpecial,
    ];

    const passedChecks = checks.filter(Boolean).length;

    if (passedChecks <= 2)
      return { strength: 25, label: "Weak", color: "bg-red-500" };
    if (passedChecks === 3)
      return { strength: 50, label: "Moderate", color: "bg-yellow-500" };
    if (passedChecks === 4)
      return { strength: 75, label: "Strong", color: "bg-blue-500" };
    return { strength: 100, label: "Very Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(data.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fadeIn">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 animate-fadeSlideDown">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 animate-fadeSlideUp">
            Join us today and start organizing your schedule
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            {/* Name Field */}
            <div className="animate-fadeSlideUp-delay-1">
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={data.name}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="animate-fadeSlideUp-delay-2">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={data.email}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Email address"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="animate-fadeSlideUp-delay-3">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={data.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full pl-10 pr-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {data.password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-500">
                      Password strength
                    </div>
                    <div
                      className="text-xs font-medium"
                      style={{
                        color: passwordStrength.color?.replace("bg-", "text-"),
                      }}
                    >
                      {passwordStrength.label}
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} transition-all duration-300`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          password.length >= 8 ? "bg-green-500" : "bg-gray-300"
                        }`}
                      ></div>
                      At least 8 characters
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          /[A-Z]/.test(data.password)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      Uppercase letter
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          /[a-z]/.test(data.password)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      Lowercase letter
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-2 ${
                          /\d/.test(data.password)
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      Number
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="animate-fadeSlideUp-delay-4">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CheckCircle size={18} className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
                  placeholder="Confirm Password"
                />
              </div>
              {confirmPassword && data.password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  Passwords do not match
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-md animate-shake">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="animate-fadeSlideUp-delay-5">
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <span className="absolute right-4 inset-y-0 flex items-center">
                <ArrowRight
                  size={18}
                  className="text-blue-300 group-hover:text-blue-200 transition-colors duration-200"
                />
              </span>
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-sm animate-fadeSlideUp-delay-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              Sign in
            </a>
          </p>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeSlideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeSlideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeSlideUp-delay-1 {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            70%,
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeSlideUp-delay-2 {
            0%,
            20% {
              opacity: 0;
              transform: translateY(20px);
            }
            90%,
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeSlideUp-delay-3 {
            0%,
            40% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeSlideUp-delay-4 {
            0%,
            60% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeSlideUp-delay-5 {
            0%,
            80% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeSlideUp-delay-6 {
            0%,
            90% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shake {
            0%,
            100% {
              transform: translateX(0);
            }
            20%,
            60% {
              transform: translateX(-5px);
            }
            40%,
            80% {
              transform: translateX(5px);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }

          .animate-fadeSlideDown {
            animation: fadeSlideDown 0.5s ease-out 0.2s forwards;
          }

          .animate-fadeSlideUp {
            animation: fadeSlideUp 0.5s ease-out 0.3s forwards;
          }

          .animate-fadeSlideUp-delay-1 {
            opacity: 0;
            animation: fadeSlideUp-delay-1 0.5s ease-out 0.4s forwards;
          }

          .animate-fadeSlideUp-delay-2 {
            opacity: 0;
            animation: fadeSlideUp-delay-2 0.5s ease-out 0.5s forwards;
          }

          .animate-fadeSlideUp-delay-3 {
            opacity: 0;
            animation: fadeSlideUp-delay-3 0.5s ease-out 0.6s forwards;
          }

          .animate-fadeSlideUp-delay-4 {
            opacity: 0;
            animation: fadeSlideUp-delay-4 0.5s ease-out 0.7s forwards;
          }

          .animate-fadeSlideUp-delay-5 {
            opacity: 0;
            animation: fadeSlideUp-delay-5 0.5s ease-out 0.8s forwards;
          }

          .animate-fadeSlideUp-delay-6 {
            opacity: 0;
            animation: fadeSlideUp-delay-6 0.5s ease-out 0.9s forwards;
          }

          .animate-shake {
            animation: shake 0.4s ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Register;
