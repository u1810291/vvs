import React from "react";

export function OffCard({
  id,
  key,
  crew,
  name,
  status,
  inBreak,
  inTask,
  askForBreak,
}) {
  return (
    <>
      {status === "offline" ? (
        <div className="flex flex-row border-b w-full h-16 bg-white justify-between hover:shadow items-center">
          <div className="flex flex-row items-center">
            <div className="flex rounded-full border-4 border-gray-200 bg-white w-8 h-8 ml-6 text-black text-sm font-normal justify-center items-center">
              <p className="flex">{crew}</p>
            </div>
            <div className="flex flex-col ml-4">
              <p className="text-xs text-black">{name} Neveikia</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
