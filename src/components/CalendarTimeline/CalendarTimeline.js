import React, {memo} from 'react';

import Row from './Row';
import Column from './Column';
import CalendarModal from './CalendarModal';

import useBoolean from '../../hook/useBoolean';
import {compareMemo} from '../../util/react';

const CalendarTimeline = memo(({
  title,
  value,
  crewId,
  setValue,
  crewZones,
  actionButtonTitle,
  columnsTimeInterval,
}) => {
  const [isOpen, setOpen] = useBoolean();
  const cellsRefs = [];

  const setRef = () => (ref) => {
    if (ref) {
      cellsRefs.push(ref);
    }
  };

  const getRef = (id) => {
    return cellsRefs.find(ref => ref.id === id);
  };

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
        className={'flex-col overflow-x-auto mt-6 shadow-[0px_0px_0px_1px_rgba(64,75,95,0.1)]'}>
        <CalendarModal
          isOpen={isOpen}
          setOpen={setOpen}
          events={value}
          isNew={true}
          crewId={crewId}
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
            crewZones={crewZones}
          />
        </div>
      </div>
    </div>
  );
}, compareMemo(['value'], ['crewZones']));

CalendarTimeline.displayName = 'CalendarTimeLine';

export default CalendarTimeline;
