import React, { Suspense } from "react";
import Home from "./Home";
import SkillDetail from "./SkillDetail";

const Category = () => {
  return (
    <div>
      <Suspense
        fallback={<span className="loading loading-infinity loading-xl"></span>}
      >
        <Home></Home>
      </Suspense>
    </div>
  );
};

export default Category;
