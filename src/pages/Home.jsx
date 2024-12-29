import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Fetch user name from localStorage
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const userName = user?.userName || "Guest";



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      {/* Profile Content Card */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome, {userName}!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          You can manage your tasks here.
        </p>
        
        <button
          onClick={() => navigate("/create-task")}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg shadow-md hover:scale-105 transition-transform"
        >
          Add Task
        </button>

       
      </div>
    </div>
  );
};

export default Home;
