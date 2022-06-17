import React, {useEffect, useState, useCallback} from 'react';

import Row from './Row';
import Column from './Column';
import CalendarModal from './CalendarModal';

import {generate} from 'shortid';
import {endOfDay, formatISO, startOfDay} from 'date-fns';

import useChunk from '../../hook/useChunk';
import useBoolean from '../../hook/useBoolean';
import useLanguage from '../../hook/useLanguage';
import useWeekDays from '../../hook/useWeekDays';

import getTimeslots from './getTimeSlots';

const CalendarTimeline = ({
  title,
  events,
  setEvents,
  actionButtonTitle,
  columnsTimeInterval,
}) => {
  const {t} = useLanguage();
  const [isOpen, setOpen] = useBoolean();
  const cellsRefs = new Array;

  const setRef = useCallback((id) => (ref) => {
    cellsRefs.push(ref);
  }, [cellsRefs]);

  const getRef = useCallback((id) => {
    const ref = cellsRefs.find(ref => ref.id === id);
    return ref.getBoundingClientRect();
  }, [cellsRefs]);

  const rowsTitles = [
    t('eurocash.weekdays.monday'),
    t('eurocash.weekdays.tuesday'),
    t('eurocash.weekdays.wednesday'),
    t('eurocash.weekdays.thursday'),
    t('eurocash.weekdays.friday'),
    t('eurocash.weekdays.saturday'),
    t('eurocash.weekdays.sunday')
  ];

  return (
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
        <h2 className={'mx-4 text-gray-700 font-medium'}>
          {title}
        </h2>
        <button
          onClick={setOpen}
          className={'m-4 px-10 text-gray-500 bg-gray-200 rounded-sm'}>
          {actionButtonTitle}
        </button>
      </div>
      <div className={'shadow-[1px_1px_0_0_rgba(64,75,95,0.1)]'}>
        <Column
          interval={columnsTimeInterval}
        />
        <Row
          rowsTitles={rowsTitles}
          value={events}
          setValue={setEvents}
          cellsRefs={cellsRefs}
          setRef={setRef}
          getRef={getRef}
        />
      </div>
    </div>
  );
};

export default CalendarTimeline;
