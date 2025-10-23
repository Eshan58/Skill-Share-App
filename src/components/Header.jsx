import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/share-logo-template_356123-1.jpg";
import { format } from "date-fns";
import "animate.css";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-10 py-5 bg-black">
        <h1 className="flex justify-center items-center">
          <img className="w-20 h-15" src={logo} alt="Skill Share App" />
        </h1>

        {user ? (
          <div className="flex items-center space-x-4">
            {/* User Avatar with Hover Tooltip */}
            <div className="relative group">
              <Link
                to="/profile"
                className="flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-amber-50 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                {/* User Profile Image */}
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span>My Profile</span>
              </Link>

              {/* Simple Hover Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
                {user.displayName || "User"}
                {/* Tooltip arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn bg-blue-500 hover:bg-blue-600 text-xl text-amber-50 px-6 py-2 rounded-lg transition-colors duration-300"
          >
            Log In
          </Link>
        )}
      </div>

      <div className="flex justify-center flex-col items-center gap-3">
        <h1 className="animate__animated animate__backInDown text-7xl font-bold text-purple-500 mt-5">
          Welcome To Skill Share App
        </h1>
        <p className="text-2xl text-gray-500">
          Here You Can Reach Your Dream Skill
        </p>
        <p className="text-xl text-gray-500">
          {format(new Date(), "EEEE, MMMM dd, yyyy")}
        </p>
      </div>
    </div>
  );
};

export default Header;
