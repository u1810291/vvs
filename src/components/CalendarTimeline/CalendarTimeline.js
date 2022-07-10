import React, {memo, useCallback} from 'react';

import Row from './Row';
import Column from './Column';
import CalendarModal from './CalendarModal';

import useBoolean from '../../hook/useBoolean';

import {pipe, getProp} from 'crocks';
import {equals} from 'crocks/pointfree';
import {and} from 'crocks/logic';
import {constant} from 'crocks/combinators';

const CalendarTimeline = memo(({
  title,
  value,
  setValue,
  actionButtonTitle,
  columnsTimeInterval,
  crewZones,
}) => {
  const [isOpen, setOpen] = useBoolean();
  const cellsRefs = [];

  const setRef = useCallback((id) => (ref) => {
    cellsRefs.push(ref);
  }, [cellsRefs]);

  const getRef = useCallback((id) => {
    return cellsRefs.find(ref => ref.id === id);
  }, [cellsRefs]);

  return (
    <div className={'max-w-fit mt-6'}>
      <div className={'flex justify-between items-center w-full'}>
        <h2 className={'font-bold'}>
          {title}
        </h2>
        <button
          onClick={setOpen}
          className={'px-10 text-gray-500 bg-gray-200 rounded-sm'}>
          {actionButtonTitle}
        </button>
      </div>
      <div
        className={'flex-col overflow-x-auto mt-6'}>
        <CalendarModal
          isOpen={isOpen}
          setOpen={setOpen}
          events={value}
          isNew={true}
          setEvents={setValue}
          getRef={getRef}
          crewZones={crewZones}
        />
        <div className={'shadow-[1px_1px_0_0_rgba(64,75,95,0.1)]'} style={{width: 1246}}>
          <Column
            interval={columnsTimeInterval}
          />
          <Row
            value={value}
            setValue={setValue}
            cellsRefs={cellsRefs}
            setRef={setRef}
            getRef={getRef}
          />
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) =>
  and(
    constant(equals(pipe(getProp('value'))(prevProps), pipe(getProp('value'))(nextProps))),
    constant(equals(pipe(getProp('crewZones'))(prevProps), pipe(getProp('crewZones'))(nextProps))),
    'ignored'
  )
);

CalendarTimeline.displayName = 'CalendarTimeLine';

export default CalendarTimeline;
