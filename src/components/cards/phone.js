import React from "react";

export function PhoneCard() {
  return (
    <div
      className="flex flex-row border w-full h-12 bg-white justify-between hover:shadow items-center"
    >
      <div className="flex flex-row mx-6 items-center justify-between w-full">
        <h6 className="text-black">Vardenis Pavardenis</h6>
        <h5 className="text-black">+37065611222</h5>
      </div>
    </div>
  );
}
