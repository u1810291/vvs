import React from "react";
import useLanguage from "../../hook/useLanguage";
const { ActiveCard } = require("../../components/cards/active");
import BreachTimeCard from '../cards/breachTimeCard';

const BreachSideRight = () => {
  const { english, lithuanian, t } = useLanguage();
  return (
    <>
      <div className="flex flex-col">
        <div className="text-slate-400">
          <BreachTimeCard
            receivedAt={"14 min. 19 s."}
            timeOutOfZone={"2021-07-12 14:32:01"}/>
          <ActiveCard />
        </div>
      </div>
    </>
  );
};

export default BreachSideRight;
