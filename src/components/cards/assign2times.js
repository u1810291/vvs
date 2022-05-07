import React from "react";

export function Assign2timesCard() {
  return (
    <div
      href="#"
      className="flex flex-row w-full border h-16 bg-white justify-between hover:shadow items-center"
    >
      <div className="flex flex-row items-center">
        <div className="flex rounded-full border-4 border-green-600 bg-white w-8 h-8 ml-6 text-black text-sm font-normal justify-center items-center">
          <p className="flex">10</p>
        </div>
        <div className="flex flex-col ml-4">
          <p className="text-xs text-black">10 RG</p>
          <p className="text-xs text-gray-400">Vardenis Pavardenis</p>
        </div>
      </div>
      <div className="flex flex-row items-start">
        <button className="flex justify-center  h-4 rounded-sm px-4 border border-transparent mx-1 text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none">
          0.07s
        </button>
        <button className="flex justify-center h-4 rounded-sm px-4 border border-transparent mx-1  text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none">
          0.07s
        </button>
        <div className="flex">
          <button className="flex justify-center py-1 mr-2 rounded-sm px-4 border border-transparent mx-1  text-xs font-normal text-white font-montserrat hover:shadow-none hover:bg-slate-500  bg-slate-600 focus:outline-none">
            Priskirti
          </button>
        </div>
      </div>
    </div>
  );
}
