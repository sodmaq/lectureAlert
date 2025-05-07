// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import NotFound from "./pages/NotFound";
// import Navbar from "./components/Navbar";
// import { isAuthenticated } from "./utils/auth";
// import LandingPage from "./pages/LandingPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route
//           path="/dashboard"
//           element={isAuthenticated() ? <Dashboard /> : <Login />}
//         />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { isAuthenticated } from "./utils/auth";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Redirect to dashboard if logged in, otherwise show landing page */}
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/dashboard" /> : <LandingPage />
          }
        />

        {/* Protect dashboard route - only accessible if authenticated */}
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* Redirect to dashboard if already registered/logged in */}
        <Route
          path="/register"
          element={
            isAuthenticated() ? <Navigate to="/dashboard" /> : <Register />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
