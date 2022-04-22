import React from "react";

export function NewConfirmCard() {
  return (
    <div
      href="#"
      className="flex flex-row border w-full h-16 bg-white justify-between hover:shadow items-center text-sm"
    >
      <div className="flex flex-row mx-6 items-center justify-between w-full">
        <p className="text-gray-400 font-light font-xs">14:46:00</p>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <p className="text-black font-normal mr-2 font-xs">Sistema</p>
            <p className="text-black font-light mr-2 font-xs">
              Priskyrė ekipažą
            </p>
            <p className="text-black font-normal mr-2 font-xs">10 RG</p>
          </div>
          <div className="flex justify-center w-32 h-4 truncate rounded text-white bg-yellow-500">
            <p className="font-light text-xs">laukiama patvirtinimo</p>
          </div>
        </div>
        <p className="text-gray-400 font-light">per 0:19</p>
      </div>
    </div>
  );
}
