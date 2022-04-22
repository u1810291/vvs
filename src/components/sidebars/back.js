import React, { useCallback } from "react";

const SidebarBack = () => {
  const menuFunc = useCallback(async () => {
    console.log("menuOpen");
  }, []);

  return (
    <div className="flex flex-col bg-slate-600 w-10 pt-4 items-center sm:w-20 h-full">
      <button onClick={menuFunc}>
        <img src={require("../../assets/assets/left.png")}></img>
      </button>
      <img className="pt-6" src={require("../../assets/assets/Line.png")}></img>
      <button onClick={menuFunc} className="w-4 h-4 pt-6">
        <img src={require("../../assets/assets/hamburger.png")} />
      </button>
    </div>
  );
};

export default SidebarBack;
