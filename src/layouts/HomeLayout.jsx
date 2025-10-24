import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import LatestNews from "../components/LatestNews";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import FollowUs from "../components/FollowUs";
// import FollowUs from "../components/FollowUs";

const HomeLayout = () => {
  return (
    <div>
      <header className="w-11/12 mx-auto my-3">
        <Header></Header>
        <section className="w-11/12 mx-auto my-3">
          <LatestNews></LatestNews>
        </section>
        <nav className="w-11/12 mx-auto my-3">
          <Navbar></Navbar>
        </nav>
      </header>
      <main>
        <section className="w-11/12 mx-auto my-3">
          <Outlet></Outlet>
        </section>
        <section className="w-11/12 mx-auto my-3">
          <HowItWorks></HowItWorks>
          <FollowUs></FollowUs>
        </section>
      </main>
      <footer className="w-11/12 mx-auto my-3">
        <section>
          <Footer></Footer>
        </section>
      </footer>
    </div>
  );
};

export default HomeLayout;
