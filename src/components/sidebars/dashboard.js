import React from "react";

const DashboardSidebar = () => {
  return (
    <div className="flex flex-col bg-slate-600 w-10 pt-6 items-center sm:w-20">
      <img
        href="#"
        className="w-4 h-4 mx-16"
        src={require("../../assets/assets/hamburger.png")}
      />
    </div>
  );
};

export default DashboardSidebar;
