import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        LectureAlert
      </Link>
      <div>
        {isAuthenticated() ? (
          <button
            onClick={logout}
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
