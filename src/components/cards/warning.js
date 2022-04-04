import React from "react";

export function WarningCard() {
  return (
    <div
      href="#"
      className="flex flex-row border w-full h-16 bg-white justify-between hover:shadow items-center"
    >
      <div className="flex flex-row items-center">
        <div className="flex rounded-full border-4 border-yellow-600 bg-white w-8 h-8 ml-6 text-black text-sm font-normal justify-center items-center">
          <p className="flex">81</p>
        </div>
        <div className="flex flex-col ml-4">
          <p className="text-xs text-black">801 RG Kaunas</p>
          <p className="text-xs">Į degalinę</p>
        </div>
      </div>
      <div className="flex">
        <button className="flex justify-center py-1 mr-2 rounded-sm px-4 border border-transparent text-xs font-normal text-gray-400 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none">
          Neleisti
        </button>
        <button className="flex justify-center py-1 mr-2 rounded-sm px-4 border border-transparent text-xs font-normal text-white font-montserrat hover:shadow-none bg-slate-600 focus:outline-none">
          Leisti
        </button>
      </div>
    </div>
  );
}
