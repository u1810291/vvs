import React from "react";

export function EmptyCard() {
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
          <p className="text-xs text-black">Įvykis: Spindulio Nr. X sabotažas</p>
          <p className="text-xs">Vilniaus, A Goštauto g.</p>
        </div>
      </div>
    </div>
  );
}
