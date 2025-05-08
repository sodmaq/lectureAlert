import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

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
  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-sm py-4 px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Clock className="h-6 w-6 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-slate-900">
            TimeTable
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              {item.name}
            </a>
          ))}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
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
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-slate-700 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors">
            Sign Up
          </button>
        </div>
      )}
    </nav>
    // <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
    //   <Link to="/" className="font-bold text-xl">
    //     LectureAlert
    //   </Link>
    //   <div>
    //     {/* Use the passed isLoggedIn prop if available, otherwise fall back to isAuthenticated() */}
    //     {(isLoggedIn !== undefined ? isLoggedIn : isAuthenticated()) ? (
    //       <button
    //         onClick={handleLogout}
    //         className="bg-white text-blue-600 px-4 py-1 rounded"
    //       >
    //         Logout
    //       </button>
    //     ) : (
    //       <>
    //         <Link to="/login" className="px-4">
    //           Login
    //         </Link>
    //         <Link to="/register" className="px-4">
    //           Register
    //         </Link>
    //       </>
    //     )}
    //   </div>
    // </nav>
  );
};

export default Navbar;
