import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { isAuthenticated } from "./utils/auth";
import LandingPage from "./pages/LandingPage";
import { useState, useEffect } from "react";

function App() {
  // Track authentication state in component
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  // Set up listener for auth changes
  useEffect(() => {
    // Function to check authentication status
    const checkAuthStatus = () => {
      setIsLoggedIn(isAuthenticated());
    };

    // Check on mount
    checkAuthStatus();

    // Set up event listeners for login/logout events
    window.addEventListener("login", checkAuthStatus);
    window.addEventListener("logout", checkAuthStatus);

    // Clean up listeners on unmount
    return () => {
      window.removeEventListener("login", checkAuthStatus);
      window.removeEventListener("logout", checkAuthStatus);
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Redirect to dashboard if logged in, otherwise show landing page */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />}
        />

        {/* Protect dashboard route - only accessible if authenticated */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        {/* Redirect to dashboard if already registered/logged in */}
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Register setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
