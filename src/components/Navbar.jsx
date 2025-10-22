// import React, { use } from "react";
import { NavLink } from "react-router";
import user from "../assets/385-3858923_skillshare-logo-makers-mark-hd-png-download.png";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      <div></div>
      <div className="nav  text-center">
        <NavLink className="mr-1.5" to="/">
          Home
        </NavLink>
        <NavLink className="ml-1.5" to="/AboutDetails">
          About
        </NavLink>
      </div>
      <div className=" flex items-center gap-3 justify-center">
        <img className="w-12" src={user} alt="" />
        <button className="btn bg-black px-10 text-amber-50">Login</button>
      </div>
    </div>
  );
};

export default Navbar;
