import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth"; // Import the logout function

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Use the logout function instead of directly removing token
    logout();

    // Update parent component state if the prop is provided
    if (setIsLoggedIn) {
      setIsLoggedIn(false);
    }

    // Navigation is now optional since the routing will handle it
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        LectureAlert
      </Link>
      <div>
        {/* Use the passed isLoggedIn prop if available, otherwise fall back to isAuthenticated() */}
        {(isLoggedIn !== undefined ? isLoggedIn : isAuthenticated()) ? (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="px-4">
              Login
            </Link>
            <Link to="/register" className="px-4">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
