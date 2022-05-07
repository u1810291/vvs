import React from "react";
import useLanguage from "../../hook/useLanguage";

const { AlarmCard } = require("../../components/cards/alarm");
const { AssignCard } = require("../../components/cards/assign");
const { BackCard } = require("../../components/cards/back");
const { CancelCard } = require("../../components/cards/canceled");
const { EmptyCard } = require("../../components/cards/empty");
const { WarningCard } = require("../../components/cards/warning");

const DashboardSideLeft = () => {
  const { english, lithuanian, t } = useLanguage();
  return (
    <>
      <div className="flex flex-row items-end border bg-white border-b-2 justify-between"> {/*  some left over pon this line / min-h-full overflow-y-auto scrollbar-gone */}
        <h4 className="text-lg ml-2 self-center font-normal">Užduotys</h4>
        <button
          type="submit"
          className="w-52 h-10 flex mr-2 mt-2 mb-1 justify-center py-2 rounded-sm px-4 border border-transparent drop-shadow shadow text-sm font-light text-white font-montserrat hover:shadow-none bg-slate-600 hover:bg-slate-500 focus:outline-none"
        >
          {t("loginSystem.createTask")}
        </button>
      </div>
      <div className="text-slate-400">
        <h4 className="ml-6 py-2">Nepriskirtos</h4>
        <AssignCard />
        <h4 className="ml-6 py-2">Prašymai</h4>
        <WarningCard />
        <h4 className="ml-6 py-2">Laukiama patvirtinimo</h4>
        <AlarmCard />
        <AlarmCard />
        <h4 className="ml-6 py-2">Važiuoja į objektą</h4>
        <AlarmCard />
        <h4 className="ml-6 py-2">Apžiūri objektą</h4>
        <EmptyCard />
        <h4 className="ml-6 py-2">Laukiama leidimo grįžti</h4>
        <BackCard />
        <h4 className="ml-6 py-2">Atšauktos atsakingo</h4>
        <CancelCard />
        <CancelCard />
      </div>
    </>
  );
};

export default DashboardSideLeft;
