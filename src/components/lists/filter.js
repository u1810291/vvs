import React from "react";
import useLanguage from "../../hook/useLanguage";

export const FiltersList = ({
  get,
  object,
  name,
  crew,
  intime,
  reactiontime,
  timeinobject,
  status,
  reason,
  ...props
}) => {
  const { english, lithuanian, t } = useLanguage();
  return (
    <div
      {...props}
      className="rounded-md w-full border sm:pb-2 p-2 mt-2 grid grid-cols-1 bg-white sm:grid-cols-6 justify-between font-normal text-black gap-2 z-1"
    >
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Gauta</p>
        <img className="h-2 w-2" src={require("../../assets/assets/x.png")} />
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Objektas</p>
        <img className="h-2 w-2" src={require("../../assets/assets/x.png")} />
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Pavadinimas</p>
        <img className="h-2 w-2" src={require("../../assets/assets/x.png")} />
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Ekipažas</p>
        <img className="h-2 w-2" src={require("../../assets/assets/x.png")} />
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Spėjo laiku</p>
        <img className="h-2 w-2" src={require("../../assets/assets/x.png")} />
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Reagavimo laikas</p>
        <img className="h-2 w-2" src={require("../../assets/assets/x.png")} />
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Laikas objekte</p>
        <img className="h-2 w-2" src={require("../../assets/assets/x.png")} />
      </div>
      <div className="flex p-1 rounded-sm text-xs font-normal justify-between  items-center text-gray-400 bg-gray-200">
        <p>Būsena</p>
        <img className="h-2 w-2" src={require("../../assets/assets/x.png")} />
      </div>
      <div className="flex p-1 rounded-sm w-full text-xs font-normal justify-between items-center text-gray-400 bg-gray-200">
        <p>Suveikimo priežastis</p>
        <img className="h-2 w-2" src={require("../../assets/assets/x.png")} />
      </div>
      <div className="flex p-1 text-xs font-normal justify-center  items-center text-gray-400 bg-white">
        <img className="h-4 w-4 mr-4" src={require("../../assets/assets/plus.png")} />
        <p>Pridėti stulpelį</p>
      </div>
    </div>
  );
};

{/* replace to drag and drop if needed*/}
