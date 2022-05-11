import React from "react";

export function TaskCard({
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
      {inTask === "true" ? (
        <div
          href="#"
          className="flex flex-row border w-full h-16 bg-white justify-between hover:shadow items-center"
        >
          <div className="flex flex-row items-center">
            <div className="flex rounded-full border-4 border-red-600 bg-white w-8 h-8 ml-6 text-black text-sm font-normal justify-center items-center">
              <p className="flex">{crew}</p>
            </div>
            <div className="flex flex-col ml-4">
              <p className="text-xs text-black">8 RG</p>
              <p className="text-xs text-gray-400">Į degalinę</p>
              {status === "Prarastas rišys" ? (
              <p className="text-xs text-gray-400">Prarastas rišys</p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center mr-2 rounded-sm px-4 mb-1 border border-transparent text-xs font-normal text-gray-600 hover:shadow-none bg-gray-200 focus:outline-none">
              0.07s
            </div>
            <div className="flex justify-center mr-2 rounded-sm px-4 border border-transparent text-xs font-normal text-gray-600 hover:shadow-none bg-gray-200 focus:outline-none">
              0.07s
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
