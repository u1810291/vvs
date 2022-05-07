import React from "react";
import useLanguage from "../../hook/useLanguage";

const { PhoneCard } = require("../../components/cards/phone");

const NewSideLeft = () => {
  const { english, lithuanian, t } = useLanguage();
  return (
    <>
      <div className="flex flex-row items-end border bg-white border-b-2 justify-between">
        <div className="flex flex-col h-28">
          <h2 className="text-normal ml-2 font-light mt-4 w-3/4">
            UAB &quot;Įmonė&quot; Sekretoriatas + direktorius, paradinės pusės 2
            aukštas
          </h2>
          <h5 className="text-sm ml-2 text-gray-400 font-normal mt-2">
            Vilnius, pievu g. 9
          </h5>
        </div>
      </div>
      <div className="text-slate-400">
        <h4 className="ml-6 py-1">Atsakingi asmenys</h4>
        <PhoneCard />
        <PhoneCard />
        <PhoneCard />
      </div>
    </>
  );
};

export default NewSideLeft;
