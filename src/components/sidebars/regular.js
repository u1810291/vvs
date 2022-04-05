import React, { useCallback } from "react";

const DashboardSidebar = () => {

  const menuFunc = useCallback(async() => {
    console.log("menuFunc");
  }, []);

  return (
    <div className="flex flex-col bg-slate-600 w-10 pt-6 items-center sm:w-20">
      <button onClick={menuFunc} className="w-4 h-4">
      <img
        src={require("../../assets/assets/hamburger.png")}
      />
      </button>
      <img className="pt-6" src={require("../../assets/assets/Line.png")}></img>
      <div className="flex flex-col items-center text-gray-400">
      <button className="font-light text-md mt-6 hover:text-white">FAV1</button>
      <button className="font-light text-md hover:text-white">AGST</button>
      <button className="font-light text-md hover:text-white">FLTR</button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
