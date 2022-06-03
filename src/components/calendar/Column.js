import React from "react";

import useLanguage from "../../hook/useLanguage";
import getTimeslots from "./getTimeSlots";

import {generate} from "shortid";
import {endOfDay, format, formatISO, startOfDay} from "date-fns";

const Column = ({interval}) => {
  const {t} = useLanguage();
  const timeSlots = getTimeslots(
    formatISO(startOfDay(new Date())),
    formatISO(endOfDay(new Date())),
    60
  );
  const customInterval = timeSlots.filter((_, index) => {
    return index % interval === 0;
  });
  return (
    <div
      className={"flex bg-gray-100 w-full text-sm"}>
      <div
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
        style={{width: 310, height: 40}}
        className={"py-2 px-4 pr-8 font-normal text-gray-800"}>
        {t("eurocash.date")}
      </div>
      {customInterval.map((slot, index) => {
        return (
          <div
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
            style={{width: 156, height: 40}}
            key={generate()}
            className={"py-2 px-1 font-normal text-gray-500 flex justify-between shadow-[-1px_0_0_0_rgba(64,75,95,0.1)]"}
          >
            {format(slot, "HH:mm")}
            {index === customInterval.length - 1 && (
              <p>
                24:00
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Column;
