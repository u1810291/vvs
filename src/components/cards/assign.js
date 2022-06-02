import React from "react";

export function AssignCard({
  id,
  crew,
  name,
  status,
  inBreak,
  inTask,
  askForBreak,
  dislocation,
  dislocationStatus,
  connection,
  event,
  address,
  newEvent,
  type
}) {
  return (
    <>
      {newEvent ? (
        <div className="flex flex-row border-b w-full h-16 bg-white justify-between items-center">
          <div className="flex flex-row items-center">
            <div className="flex rounded-full border-4 border-red-600 bg-white w-8 h-8 ml-4 text-black text-sm font-normal justify-center items-center">
              <p className="flex w-8 h-8"></p>
            </div>
            <div className="flex flex-col ml-4">
              <p className="text-xs text-black">
                {type}: {event}
              </p>
              <p className="text-xs">{newEvent}</p>
            </div>
          </div>
          <div className="flex">
            <button
              // onClick={addTask}
              className="flex justify-center py-1 mr-2 rounded-sm px-4 border border-transparent text-xs font-normal text-white font-montserrat bg-slate-600 hover:bg-slate-500 focus:outline-none"
            >
              Priskirti
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
