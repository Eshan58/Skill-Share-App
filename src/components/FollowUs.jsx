import React from "react";
import { Link, Links } from "react-router";
import { FaSquareFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

const FollowUs = () => {
  return (
    <div className="social-section text-center pt-8 border-t border-gray-600 p-8 bg-fuchsia-900">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Follow Us</h3>
      <div className="flex justify-center items-center gap-6">
        <Link
          to={`https://www.facebook.com/`}
          href="#"
          className="social-link flex items-center gap-2 bg-blue-600 text-black px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-1"
        >
          <FaSquareFacebook className="text-xl text-black" />
          <span className="font-semibold text-black">Facebook</span>
        </Link>
        <Link
          to={`https://www.instagram.com/`}
          href="#"
          className="social-link flex items-center gap-2 bg-pink-600 text-black px-6 py-3 rounded-lg hover:bg-pink-700 transition-all duration-200 transform hover:-translate-y-1"
        >
          <FaInstagram className="text-xl text-black" />
          <span className="font-semibold text-black">Instagram</span>
        </Link>
        <Link
          to={`https://x.com/`}
          href="#"
          className="social-link flex items-center gap-2 bg-blue-400 text-black px-6 py-3 rounded-lg hover:bg-blue-500 transition-all duration-200 transform hover:-translate-y-1"
        >
          <FaTwitter className="text-xl text-black" />
          <span className="font-semibold text-black">Twitter</span>
        </Link>
      </div>
    </div>
  );
};

export default FollowUs;
