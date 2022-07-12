import React from 'react';

import CalendarModal from './CalendarModal';

import useBoolean from '../../hook/useBoolean';

import {format, isValid} from 'date-fns';

import {isNumber} from 'crocks/predicates';
import {chain, getProp, map, Maybe, pipe, safe} from 'crocks';

const Event = ({
  events,
  title,
  startTime,
  endTime,
  weekDay,
  id,
  twTitle,
  twTime,
  setEvents,
  getRef,
  crewZones,
  height = 51,
  minuteSpan = 3.25
}) => {
  const [isOpen, setOpen] = useBoolean();
  const eventData = {
    crew: title,
    startTime,
    endTime,
    weekDay,
    id,
  }

  console.log(getRef(String(endTime))?.offsetLeft)

  const dtToRefElement = pipe(
    safe(isValid),
    map(String),
    map(getRef),
    chain(safe(a => a instanceof HTMLElement)),
  )

  const start = dtToRefElement(startTime);
  const end = dtToRefElement(endTime);

  const width = Maybe.of(start => end => minuteSpan => end - start + minuteSpan)
    .ap(start.chain(getProp('offsetLeft')))
    .ap(end.chain(getProp('offsetLeft')))
    .ap(safe(isNumber, minuteSpan))

  const style = Maybe.of(top => left => width => ({
    height,
    left,
    top,
    width,
  }))
    .ap(start.chain(getProp('offsetTop')))
    .ap(start.chain(getProp('offsetLeft')))
    .ap(width)

  return style
    .map(style => (
      <>
        <div
          style={style}
          className={'px-1 my-1 flex flex-col absolute justify-center rounded-md text-sm bg-slate-300 opacity-70 select-none'}
          onClick={setOpen}
        >
          <span className={`text-gray-900 truncate ${twTitle}`}>{title.key}</span>
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
          eventData={eventData}
          isOpen={isOpen}
          setOpen={setOpen}
          isDeletable={true}
          getRef={getRef}
          crewZones={crewZones}
        />
      </>
    )).option(null)
};

export default Event;
