import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import toast from "react-hot-toast";

const Login = ({ setIsLoggedIn }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/users/login", data);

      // Use the login function instead of directly setting localStorage
      login(res.data.token);

      // Update parent component state if the prop is provided
      if (setIsLoggedIn) {
        setIsLoggedIn(true);
      }

      toast.success("Login successful!");

      // Navigate to dashboard instead of root
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-4 border rounded"
    >
      <h2 className="text-xl mb-4 font-bold">Login</h2>
      <input
        name="email"
        type="email"
        onChange={handleChange}
        placeholder="Email"
        className="w-full mb-3 p-2 border"
        required
      />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
        className="w-full mb-3 p-2 border"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
