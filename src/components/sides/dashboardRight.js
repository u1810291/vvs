import React from "react";
import { DDAPI } from "../../mocks/dashboardDispatchApi";
import { generate } from "shortid";

const { ActiveCard } = require("../../components/cards/active");
const { RequestCard } = require("../../components/cards/request");
const { TaskCard } = require("../../components/cards/tasks");

const DashboardSideRight = ({title}) => {
  return (
    <div className="flex flex-col scrollbar-gone flex-shrink-1 overflow-y-auto">
      <div className="flex flex-row py-4 bg-white items-center justify-between border-b">
        <h4 className="ml-4 self-center text-md font-normal">
          {title}
        </h4>
      </div>
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
  );
};

export default DashboardSideRight;
