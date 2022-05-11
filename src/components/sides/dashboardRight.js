import React from "react";
import { DDAPI } from "../../api/dashboardDispatchApi";

const { AlarmCard } = require("../../components/cards/alarm");
const { OffCard } = require("../../components/cards/off");
const { ActiveCard } = require("../../components/cards/active");
const { RequestCard } = require("../../components/cards/request");
const { TaskCard } = require("../../components/cards/tasks");

const DashboardSideRight = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row border bg-white border-b-2 justify-between">
          <h4 className="text-lg ml-2 self-center font-normal">Ekipažai</h4>
          <div className="h-12"></div>
        </div>
        <div className="text-slate-400">
          <h4 className="ml-6 py-2">Aktyvūs</h4>
          {DDAPI.map((data) => (
            <ActiveCard
              id={data.id}
              key={data.id}
              crew={data.crew}
              name={data.name}
              status={data.status}
              inBreak={data.inBreak}
              inTask={data.inTask}
              askForBreak={data.askForBreak}
            />
          ))}
          {DDAPI.map((data) => (
            <RequestCard
              id={data.id}
              key={data.id}
              crew={data.crew}
              name={data.name}
              status={data.status}
              inBreak={data.inBreak}
              inTask={data.inTask}
              askForBreak={data.askForBreak}
              dislocation={data.dislocation}
            />
          ))}
        </div>
        <h4 className="ml-6 py-2 text-slate-400">Užduotyse</h4>
        {DDAPI.map((data) => (
          <TaskCard
            id={data.id}
            key={data.id}
            crew={data.crew}
            name={data.name}
            status={data.status}
            inBreak={data.inBreak}
            inTask={data.inTask}
            askForBreak={data.askForBreak}
          />
        ))}
      </div>
      <div className="flex flex-col text-slate-400">
        <div className="flex flex-row items-center justify-between ml-6 py-2">
          <h4 className="">Neprisijungę</h4>
          <img
            className="h-2 w-4 mr-2"
            src={require("../../assets/assets/up.png")}
          ></img>
        </div>
        {DDAPI.map((data) => (
          <OffCard
            id={data.id}
            key={data.id}
            crew={data.crew}
            name={data.name}
            status={data.status}
            inBreak={data.inBreak}
            inTask={data.inTask}
            askForBreak={data.askForBreak}
          />
        ))}
      </div>
    </>
  );
};

export default DashboardSideRight;
