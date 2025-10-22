// src/components/AuthNav.jsx
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";

const AuthNav = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-white">{user.image}</span>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition duration-200"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link
      to="/login"
      className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition duration-200"
    >
      Login
    </Link>
  );
};

export default AuthNav;
