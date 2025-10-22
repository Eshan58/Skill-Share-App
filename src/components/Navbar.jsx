// src/components/Navbar.jsx (Enhanced version)
import { NavLink } from "react-router";
import AuthNav from "./AuthNav";
import user from "../assets/385-3858923_skillshare-logo-makers-mark-hd-png-download.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      {/* Brand/Logo Section */}
      <div className="flex items-center gap-2">
        <img className="w-10 h-10" src={user} alt="SkillShare Logo" />
        <span className="text-xl font-bold">SkillShare</span>
      </div>

      {/* Navigation Links */}
      <div className="nav text-center flex gap-8">
        <NavLink
          className={({ isActive }) =>
            `font-medium transition duration-200 px-3 py-2 rounded-lg ${
              isActive
                ? "bg-white text-blue-600"
                : "text-white hover:bg-white hover:bg-opacity-20"
            }`
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `font-medium transition duration-200 px-3 py-2 rounded-lg ${
              isActive
                ? "bg-white text-blue-600"
                : "text-white hover:bg-white hover:bg-opacity-20"
            }`
          }
          to="/AboutDetails"
        >
          About
        </NavLink>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        <AuthNav />
      </div>
    </nav>
  );
};

export default Navbar;
