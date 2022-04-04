import React from "react";
import useLanguage from "../../hook/useLanguage";

const { AlarmCard } = require("../../components/cards/alarm");
const { OffCard } = require("../../components/cards/off");
const { ActiveCard } = require("../../components/cards/active");
const { RequestCard } = require("../../components/cards/request");
const { TaskCard } = require("../../components/cards/tasks");

const DashboardSideRight = () => {
  const { english, lithuanian, t } = useLanguage();
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row border bg-white border-b-2 justify-between">
          <h4 className="text-lg ml-2 self-center font-normal">Ekipažai</h4>
          <div className="h-12"></div>
        </div>
        <div className="text-slate-400">
          <h4 className="ml-6 py-2">Aktyvūs</h4>
          <ActiveCard />
          <ActiveCard />
          <ActiveCard />
          <RequestCard />
          <RequestCard />
        </div>
        <h4 className="ml-6 py-2 text-slate-400">Užduotyse</h4>
        <TaskCard />
      </div>
      <div className="flex flex-col text-slate-400">
        <div className="flex flex-row items-center justify-between ml-6 py-2">
          <h4 className="">Neprisijungę</h4>
          <img
            className="h-2 w-4 mr-2"
            src={require("../../assets/assets/up.png")}
          ></img>
        </div>
        <OffCard />
      </div>
    </>
  );
};

export default DashboardSideRight;
