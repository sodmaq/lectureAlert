// import { Link, useNavigate } from "react-router-dom";
// import { isAuthenticated, logout } from "../utils/auth";

// const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Use the logout function instead of directly removing token
//     logout();

//     // Update parent component state if the prop is provided
//     if (setIsLoggedIn) {
//       setIsLoggedIn(false);
//     }

//     // Navigation is now optional since the routing will handle it
//     navigate("/login");
//   };

//   return (
//     <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
//       <Link to="/" className="font-bold text-xl">
//         LectureAlert
//       </Link>
//       <div>
//         {/* Use the passed isLoggedIn prop if available, otherwise fall back to isAuthenticated() */}
//         {(isLoggedIn !== undefined ? isLoggedIn : isAuthenticated()) ? (
//           <button
//             onClick={handleLogout}
//             className="bg-white text-blue-600 px-4 py-1 rounded"
//           >
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link to="/login" className="px-4">
//               Login
//             </Link>
//             <Link to="/register" className="px-4">
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Determine authentication status
  const authStatus = isLoggedIn !== undefined ? isLoggedIn : isAuthenticated();

  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();

    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }

    // Show logout success message
    setAlertMessage("Successfully logged out");
    setShowAlert(true);

    navigate("/login");
  };

  // Hide alert after 3 seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      {/* Alert notification */}
      {showAlert && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50 flex items-center">
          <span>{alertMessage}</span>
          <button
            onClick={() => setShowAlert(false)}
            className="ml-4 text-green-700 hover:text-green-900"
          >
            &times;
          </button>
        </div>
      )}

      {/* Main navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-white font-bold text-xl">LectureApp</span>
              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${
                  isActive("/") ? "bg-blue-700" : ""
                }`}
              >
                Home
              </Link>

              {authStatus ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${
                      isActive("/dashboard") ? "bg-blue-700" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${
                      isActive("/login") ? "bg-blue-700" : ""
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition ${
                      isActive("/register") ? "bg-blue-600" : ""
                    }`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 ${
                  isActive("/") ? "bg-blue-700" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {authStatus ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 ${
                      isActive("/dashboard") ? "bg-blue-700" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 ${
                      isActive("/login") ? "bg-blue-700" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-500 hover:bg-blue-600 ${
                      isActive("/register") ? "bg-blue-600" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
