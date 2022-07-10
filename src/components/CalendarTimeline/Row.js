import React from 'react';

import Cell from './Cell';
import Event from './Event';

import useChunk from '../../hook/useChunk';
import useWeekDays from '../../hook/useWeekDays';

import getTimeslots from './getTimeSlots';
import {generate} from 'shortid';
import {startOfWeek, endOfWeek, formatISO} from 'date-fns';

const Row = ({value, setRef, setValue, getRef}) => {
  const {getTimeLocals} = useWeekDays();
  const {weekDays} = useWeekDays();

  return (
    <div className={'flex flex-row w-full'}>
      <div className={'flex flex-col'}>
        {weekDays.map(({key}) => (
          <div
            key={key}
            style={{width: 310, height: 60}}
            className={'shadow-[0_-1px_0_0_rgba(64,75,95,0.1)] font-normal text-gray-800 py-4 px-4 pr-4'}>
            {key}
          </div>
        ))}
      </div>
      <div className={'flex flex-col w-full relative'}>
        <div
          style={{width: 936}}
          className={'flex flex-row w-full flex-wrap'}>
          {value && value.map(({crew, startTime, endTime, position, weekDay, id}) => (
            <Event
              key={generate()}
              title={crew}
              startTime={startTime}
              endTime={endTime}
              position={position}
              weekDay={weekDay}
              id={id}
              setEvents={setValue}
              events={value}
              getRef={getRef}
            />
          ))}
          {useChunk(
            getTimeslots(
              formatISO(startOfWeek(new Date(), {locale: getTimeLocals()})),
              formatISO(endOfWeek(new Date(), {locale: getTimeLocals()})),
              5
            ), 48).map(chunkedSlot => (
              <div
                key={generate()}
                style={{height: 60, width: 156}}
                className={'h-full w-full flex flex-row shadow-[0_-1px_0_0_rgba(64,75,95,0.1)]'}
              >
                {chunkedSlot.map((slot, index) => (
                  <Cell
                    key={generate()}
                    ref={setRef(slot)}
                    slot={slot}
                    index={index}
                  />
                ))}
              </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Row;
