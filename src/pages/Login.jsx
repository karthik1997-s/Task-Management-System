import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/login-img.svg";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Hardcoded user credentials
  const validUser = {
    userName: "Admin",
    emailId: "admin@gmail.com",
    password: "Test@123",
    token: "sample-mocking-token",
  };

  const handleLogin = () => {
    if (email === validUser.emailId && password === validUser.password) {
      // Successful login
      const userDetails = {
        emailId: validUser.emailId,
        userName: validUser.userName,
        token: validUser.token,
      };
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      
      navigate("/");
      toast.success("Welocome Admin");
    } else {
      // Failed login
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className=" flex justify-center items-center h-screen bg-[#ffff]">
      <div className="w-[50%]">
        <img src={LoginImage} alt="login-img" />
      </div>
      <div className="w-[50%] flex items-center justify-center bg-gradient-to-br min-h-screen from-blue-400 to-blue-300 ">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm h-max">
          <h2 className="text-2xl font-bold mb-4">Welcome back 👋 Login</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            className="w-full px-3 py-2 mb-3 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e?.target?.value)}
            className="w-full px-3 py-2 mb-3 border rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
