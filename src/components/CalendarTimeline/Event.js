import React from 'react';

import CalendarModal from './CalendarModal';

import useBoolean from '../../hook/useBoolean';

import {format} from 'date-fns';

const Event = ({events, title, startTime, endTime, position, weekDay, id, twEvent, twTitle, twTime, setEvents, getRef}) => {
  const [isOpen, setOpen] = useBoolean();
  const eventData = {
    crew: title,
    startTime,
    endTime,
    weekDay,
    id,
  }
  return (
    <>
      <div
        style={{height: 51, left: position.left, top: position.top, width: (position.width + 3.25)}}
        className={'px-1 my-1 flex flex-col fixed justify-center rounded-md text-sm bg-slate-300 opacity-70 select-none'}
        onClick={setOpen}
      >
        <span className={`text-gray-900 truncate ${twTitle}`}>{title}</span>
        <div className={'flex text-ellipsis overflow-hidden'}>
          <span className={`text-gray-600 truncate ${twTime}`}>{format(startTime, 'HH:mm')}</span>
          <span className={'mx-1'}> - </span>
          <span className={`text-gray-600 truncate ${twTime}`}>{format(endTime, 'HH:mm')}</span>
        </div>
      </div>
      <CalendarModal
        id={id}
        isEdit={true}
        events={events}
        setEvents={setEvents}
        isOpen={isOpen}
        setOpen={setOpen}
        isDeletable={true}
        eventData={eventData}
        getRef={getRef}
      />
    </>
  );
};

export default Event;
