import React from "react";
import { useNavigate } from "react-router-dom";
import AvatarImage from "../assets/avatar.png";
import { toast } from "react-toastify";
const Profile = () => {
  const navigate = useNavigate();

  // Fetch user details from localStorage
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const userName = user?.userName || "Guest";
  const userEmail = user?.emailId || "No email provided";

  const handleLogout = () => {
    // Clear localStorage and navigate to home or login page
    localStorage.removeItem("userDetails");
    navigate("/login");
    toast.success("Successfully Logout");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      {/* Avatar and User Details */}
      <div className="flex flex-col items-center space-y-4">
        <img
          src={AvatarImage}
          alt={`${userName}'s avatar`}
          className="w-32 h-32 rounded-full shadow-lg border-4 border-white"
        />
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">{userName}</h1>
          <p className="text-gray-600">{userEmail}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => navigate("/create-task")}
          className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
        >
          Add Task
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
