import React from "react";

export function ActiveCard({
  id,
  crew,
  name,
  status,
  inBreak,
  inTask,
  askForBreak,
  connection,
  event,
}) {
  return (
    <>
      {status === "online" ? (
        <div className="flex flex-row border-t w-full h-16 bg-white">
          <div className="flex flex-row w-full">
            <div className="flex flex-col items-center justify-center">
              <div className="flex rounded-full border-4 border-green-600 bg-white w-8 h-8 mx-4 text-black text-xs font-normal justify-center items-center">
                <p className="flex text-xs">{crew}</p>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <div className="flex flex-row items-end h-full w-full">
                <p className="text-xs text-black">{name}</p>
              </div>

              <div className="flex flex-row justify-between h-full w-full">
                {connection === "Prarastas rišys" ? (
                  <>
                    <div className="flex flex-row items-center">
                      <p className="text-xs text-gray-500">Prarastas rišys</p>
                    </div>
                    <div className="flex justify-center mr-12 my-2 items-center rounded-sm px-4 border border-transparent text-xs font-normal text-gray-600 font-montserrat hover:shadow-none bg-gray-200 focus:outline-none">
                      <p className="text-xs">0.07s</p>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
