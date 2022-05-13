import React from "react";
import { DDAPI } from "../../api/dashboardDispatchApi";
import { generate } from "shortid";

const { AlarmCard } = require("../../components/cards/alarm");
const { OffCard } = require("../../components/cards/off");
const { ActiveCard } = require("../../components/cards/active");
const { RequestCard } = require("../../components/cards/request");
const { TaskCard } = require("../../components/cards/tasks");

const DashboardSideRight = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="text-slate-400">
          <h4 className="ml-6 py-2 text-sm">Aktyvūs</h4>
          {DDAPI.map((data) => (
            <ActiveCard
              key={generate()}
              id={data.id}
              crew={data.crew}
              name={data.name}
              status={data.status}
              inBreak={data.inBreak}
              inTask={data.inTask}
              askForBreak={data.askForBreak}
              connection={data.connection}
              event={data.event}
            />
          ))}
          {DDAPI.map((data) => (
            <RequestCard
              id={generate()}
              key={data.id}
              crew={data.crew}
              name={data.name}
              status={data.status}
              inBreak={data.inBreak}
              inTask={data.inTask}
              askForBreak={data.askForBreak}
              dislocation={data.dislocation}
              dislocationStatus={data.dislocationStatus}
              connection={data.connection}
              event={data.event}
            />
          ))}
        </div>
        <h4 className="ml-6 py-2 text-slate-400 text-sm">Užduotyse</h4>
        {DDAPI.map((data) => (
          <TaskCard
            id={generate()}
            key={data.id}
            crew={data.crew}
            name={data.name}
            status={data.status}
            inBreak={data.inBreak}
            inTask={data.inTask}
            askForBreak={data.askForBreak}
            connection={data.connection}
            event={data.event}
          />
        ))}
      </div>
    </>
  );
};

export default DashboardSideRight;
