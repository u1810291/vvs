import React, { useContext } from "react";
import useLanguage from "../../hook/useLanguage";
import { RedWatching } from "../buttons/redWatching";
import { RedDriving } from "../buttons/redDriving";
import { BlueStatus } from "../buttons/blueStatus";
import { GreenStatus } from "../buttons/greenStatus";
import { GrayStatus } from "../buttons/grayStatus";

export const DashboardList = ({
  id,
  date,
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
      className="w-full border-b grid grid-cols-1 bg-white grid-rows-1 grid-flow-row table-auto sm:grid-cols-9 grid-gap-6 justify-between font-normal text-black z-1"
    >
      <div className="flex flex-row items-center">
        <span className="bg-white text-gray-400">{date}</span>
      </div>
      <div className="flex flex-row items-center">
        <span className="bg-white text-gray-400">{object}</span>
      </div>
      <div className="flex flex-row items-center">
        <span className="bg-white text-gray-500">{name}</span>
      </div>
      <div className="flex flex-row items-center">
        <span className="bg-white text-gray-400">{crew}</span>
      </div>
      <div className="flex flex-row items-center">
        <span className="bg-white text-gray-400">{intime}</span>
      </div>
      <div className="flex flex-row items-center">
        <span className="bg-white text-gray-400">{reactiontime}</span>
      </div>
      <div className="flex flex-row items-center">
        <span className="bg-white text-gray-400">{timeinobject}</span>
      </div>
      <div className="flex whitespace-nowrap flex-row items-center">
        <RedWatching />
        {/* <RedDriving/>
      <GrayStatus/>
      <GreenStatus/>
      <BlueStatus/> */}
      </div>
      <div className="flex flex-row justify-center items-center">
        <span className="flex bg-white text-gray-500 self-center">
          {reason}
        </span>
      </div>
    </div>
  );
};
