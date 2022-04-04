import React from "react";

export function OffCard() {
  return (
    <div
      href="#"
      className="flex flex-row border w-full h-16 bg-white justify-between hover:shadow items-center"
    >
      <div className="flex flex-row items-center">
        <div className="flex rounded-full border-4 border-gray-200 bg-white w-8 h-8 ml-6 text-black text-sm font-normal justify-center items-center">
          <p className="flex">G9</p>
        </div>
        <div className="flex flex-col ml-4">
          <p className="text-xs text-black">G9 Neveikia</p>
        </div>
      </div>
    </div>
  );
}
