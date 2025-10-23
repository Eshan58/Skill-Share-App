import React from "react";
import Marquee from "react-fast-marquee";

const LatestNews = () => {
  return (
    <div className="flex items-center justify-center">
      <button className="btn bg-purple-400 text-amber-50 p-7.5 font-medium">
        Top Skill
      </button>
      <Marquee pauseOnHover={true}>
        <p className="bg-gray-200 p-5 font-medium text-blue-500">
          1. Python Programming 2. Web Development 3. Photography Editing 4.
          Baking Basics: Cakes & Cookies 5. Web Development Fundamentals 6.
          Digital Marketing Essentials 7. Python Programming for Beginners 8.
          Public Speaking Confidence & 9. Photography Editing with Lightroom .
        </p>
      </Marquee>
    </div>
  );
};

export default LatestNews;
