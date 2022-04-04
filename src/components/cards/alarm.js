import React from "react";

export function AlarmCard() {
  return (
    <div
      href="#"
      className="flex flex-row border w-full h-16 bg-white justify-between hover:shadow items-center"
    >
      <div className="flex flex-row items-center">
        <div className="flex rounded-full border-4 border-red-600 bg-white w-8 h-8 ml-6 text-black text-sm font-normal justify-center items-center">
          <p className="flex">G9</p>
        </div>
        <div className="flex flex-col ml-4">
          <p className="text-xs text-black">[tipas]: [įvikio pavadinimas]</p>
          <p className="text-xs">[adresas]</p>
        </div>
      </div>
      <div className="flex">
      <button className="flex justify-center mr-2 rounded-sm px-4 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none">
          0.07s
        </button>
      </div>
    </div>
  );
}
