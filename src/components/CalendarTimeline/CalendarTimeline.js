import React, {useCallback, memo} from 'react';

import Row from './Row';
import Column from './Column';
import CalendarModal from './CalendarModal';

import useBoolean from '../../hook/useBoolean';
import useLanguage from '../../hook/useLanguage';

const CalendarTimeline = memo(({
  title,
  value: events,
  setValue: setEvents,
  actionButtonTitle,
  columnsTimeInterval,
}) => {
  const {t} = useLanguage();
  const [isOpen, setOpen] = useBoolean();
  const cellsRefs = [];

  const setRef = useCallback((id) => (ref) => {
    cellsRefs.push(ref);
  }, [cellsRefs]);

  const getRef = useCallback((id) => {
    const ref = cellsRefs.find(ref => ref.id === id);
    return ref;
  }, [cellsRefs]);

  return (
    <div className={'overflow-x-auto mt-6'}>
      <div
        style={{width: 1246}}
        className={'flex-col'}>
        <CalendarModal
          isOpen={isOpen}
          setOpen={setOpen}
          events={events}
          isNew={true}
          setEvents={setEvents}
          getRef={getRef}
        />
        <div className={'flex justify-between items-center'}>
          <h2 className={'font-bold'}>
            {title}
          </h2>
          <button
            onClick={setOpen}
            className={'mb-4 px-10 text-gray-500 bg-gray-200 rounded-sm'}>
            {actionButtonTitle}
          </button>
        </div>
        <div className={'mt-6 shadow-[1px_1px_0_0_rgba(64,75,95,0.1)]'}>
          <Column
            interval={columnsTimeInterval}
          />
          <Row
            value={events}
            setValue={setEvents}
            cellsRefs={cellsRefs}
            setRef={setRef}
            getRef={getRef}
          />
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => JSON.stringify(prevProps?.events) === JSON.stringify(nextProps?.events) && prevProps.setValue === nextProps.setValue);

CalendarTimeline.displayName = 'CalendarTimeLine';

export default CalendarTimeline;
