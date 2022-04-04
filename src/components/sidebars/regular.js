import React from "react";

const DashboardSidebar = () => {
  return (
    <div className="flex flex-col bg-slate-600 w-10 pt-6 items-center sm:w-20">
      <img
        href="#"
        className="w-4 h-4"
        src={require("../../assets/assets/hamburger.png")}
      />
      <img className="pt-6" src={require("../../assets/assets/Line.png")}></img>
      <div className="flex flex-col items-center text-gray-400">
      <p className="font-light text-md mt-6">FAV1</p>
      <p className="font-light text-md">PGST</p>
      <p className="font-light text-md">FLTR</p>
      </div>
    </div>
  );
};

export default DashboardSidebar;
