import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "../assets/logout-icon.png";
import { toast } from "react-toastify";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // logout icon
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // Logout handler
  const handleLogout = () => {
    // Clear localStorage and navigate to home or login page
    localStorage.removeItem("userDetails");
    navigate("/login");
    toast.success("Successfully Logout");
  };

  return (
    <header className="bg-[#6495ED] text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left Side: Logo and Links */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Task Manager</h1>
        </div>

        {/* Navigation Links for Desktop */}
        <nav className="hidden md:flex space-x-6 ml-auto px-4">
        <Link to="/" className="hover:text-black">
            Home
          </Link>
          <Link to="/tasks" className="hover:text-black">
            Tasks
          </Link>
       
        </nav>

        {/* Logout Button */}
        <div className="relative cursor-pointer" onClick={toggleDropdown}>
        <img src={LogoutIcon} className="w-[32px] h-[32px]" />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"  onMouseLeave={() => setIsDropdownOpen(false)}>
            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsDropdownOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={() => {
                // Handle logout logic here
                handleLogout()
                setIsDropdownOpen(false);
               
              }}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu as Bottom Overlay */}
      {isMenuOpen && (
        <nav className="md:hidden fixed w-full bg-gray-700 z-50">
          <ul className="space-y-2 px-4 py-4">
            <li>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:text-gray-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:text-gray-400"
              >
                Tasks
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:text-gray-400"
              >
                Tasks
              </Link>
            </li> 
            <li>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left text-white hover:text-gray-400"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
