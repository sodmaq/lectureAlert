import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { isAuthenticated } from "./utils/auth";
import LandingPage from "./pages/LandingPage";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";


function App() {
  // Track authentication state in component
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  // Set up listener for auth changes
  useEffect(() => {
    // Function to check authentication status
    const checkAuthStatus = () => {
      setIsLoggedIn(isAuthenticated());
    };

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
    <>
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/dashboard" /> : <LandingPage />
            }
          />

          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/calendar"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />

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
      <Toaster
        position="top-center"
        gutter={16} // Increase spacing between toasts for better visibility
        containerStyle={{
          margin: "16px", // Adjust the container margin for uniformity
          zIndex: 9999, // Ensure it stays on top of other UI components
        }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              backgroundColor: "#d1fae5", // Soft green for success
              color: "#065f46", // Dark green text
              fontSize: "16px",
              padding: "16px 24px",
              border: "1px solid #6ee7b7", // Subtle green border
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Add some depth
              borderRadius: "8px",
            },
          },
          error: {
            duration: 1500,
            style: {
              backgroundColor: "#fee2e2", // Light red for errors
              color: "#b91c1c", // Dark red text
              fontSize: "16px",
              padding: "16px 24px",
              border: "1px solid #fca5a5", // Subtle red border
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Add some depth
              borderRadius: "8px",
            },
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#f3f4f6", // Neutral light grey
            color: "#374151", // Dark grey text
            borderRadius: "8px",
            border: "1px solid #d1d5db", // Subtle grey border
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Unified shadow
          },
        }}
        reverseOrder={false}
      />
    </>
  );
}

export default App;
