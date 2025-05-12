import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";
import { Clock, Menu, X, User } from "lucide-react";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Determine authentication status
  const authStatus = isLoggedIn !== undefined ? isLoggedIn : isAuthenticated();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard", requiresAuth: true },
  ];

  const handleLogout = () => {
    logout();

    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }

    // Show logout notification
    setNotificationMessage("Successfully logged out");
    setShowNotification(true);
    setIsMenuOpen(false);

    navigate("/login");
  };

  // Hide notification after 3 seconds
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <>
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50 flex items-center">
          <span>{notificationMessage}</span>
          <button
            onClick={() => setShowNotification(false)}
            className="ml-4 text-green-700 hover:text-green-900"
          >
            &times;
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-sm py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-blue-600" />
            <Link to="/" className="ml-2 text-xl font-bold text-slate-900">
              LectureAlert
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems
              .filter(
                (item) =>
                  !item.requiresAuth || (item.requiresAuth && authStatus)
              )
              .map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className={`text-slate-700 hover:text-blue-600 font-medium transition-colors ${
                    location.pathname === item.href ? "text-blue-600" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}

            {authStatus ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center text-slate-700 hover:text-blue-600"
                >
                  <User className="h-5 w-5 mr-1" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 px-6 flex flex-col space-y-4 transition-all duration-300 ease-in-out">
            {navItems
              .filter(
                (item) =>
                  !item.requiresAuth || (item.requiresAuth && authStatus)
              )
              .map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className={`text-slate-700 hover:text-blue-600 font-medium py-2 ${
                    location.pathname === item.href ? "text-blue-600" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

            {authStatus ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center text-slate-700 hover:text-blue-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Add space to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
