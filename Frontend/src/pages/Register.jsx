import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/users/register", data);
    navigate("/login");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-4 border rounded"
    >
      <h2 className="text-xl mb-4 font-bold">Register</h2>
      <input
        name="name"
        onChange={handleChange}
        placeholder="Name"
        className="w-full mb-3 p-2 border"
        required
      />
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
        Register
      </button>
    </form>
  );
};

export default Register;
