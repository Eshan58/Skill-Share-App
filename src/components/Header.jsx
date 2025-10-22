import React from "react";
import logo from "../assets/share-logo-template_356123-1.jpg";
import { format } from "date-fns";

const Header = () => {
  return (
    <div className="mt-5">
      <div className="w-full">
        <div className="flex items-center justify-between px-10 py-5 bg-black">
          <h1 className="flex justify-center items-center">
            <img className="w-20 h-15" src={logo} alt="" />
            <button className="btn bg-blue-500 text-2xl text-amber-50 ml-1.5 border-blue-500">Log In</button>
          </h1>
          <button className="btn btn-success text-2xl">My Profile</button>
        </div>
        <div className="flex justify-center flex-col items-center gap-3">
          <h1 className="text-7xl font-bold text-purple-500 mt-5">
            Welcome To Skill Share App
          </h1>
          <p className=" text-2xl text-gray-500">
            Here You Can Reach Dream Skill
          </p>
          <p className="text-xl text-gray-500">
            {format(new Date(), "EEEE, MMMM MM, yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
