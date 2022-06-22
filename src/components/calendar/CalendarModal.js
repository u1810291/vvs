import React, {useState, useCallback} from 'react';

import Modal from '../atom/Modal';
import Selectbox from '../input/Selectbox';
import TimePicker from '../input/TimePicker';

import useLanguage from '../../hook/useLanguage';
import useWeekDays from '../../hook/useWeekDays';
import useValidation from '../../hook/useValidation';

import {generate} from 'shortid';
import {formatISO} from 'date-fns';

const CalendarModal = ({
  id,
  isNew,
  isEdit,
  getRef,
  isOpen,
  setOpen,
  events,
  setEvents,
  eventData,
  isDeletable,
}) => {
  const {t} = useLanguage();
  const {getWeekDays} = useWeekDays();
  const weekDays = getWeekDays();
  const [selectedWeekDay, setWeekSelectedDay] = useState();

  const {validateOnEventCreate} = useValidation();

  const [crews, setCrew] = useState([
    {key: '9GRE', value: '9GRE'},
    {key: '9ASD', value: '9ASD'},
    {key: 'MGRE', value: 'MGRE'},
    {key: 'ZXCV', value: 'ZXCV'}
  ]);

  const [selectedCrew, setSelectedCrew] = useState();

  const [errorMessage, setErrorMessage] = useState();

  const [selectedTimeTo, setTimeTo] = useState();
  const [selectedTimeFrom, setTimeFrom] = useState();

  const deleteEvent = useCallback(() => {
    setEvents(events.filter(event => event.id !== id))
  }, [events]);

  const editEvent = useCallback(() => {
    const eve = events.find(event => {
      if (event.id === id) {
        const weekDay = formatISO(new Date(selectedWeekDay));

        const timeFrom = formatISO(new Date(selectedTimeFrom));
        const timeTo = formatISO(new Date(selectedTimeTo));

        const startTime = new Date(weekDay.split('T')[0] + 'T' + timeFrom.split('T')[1]);
        const endTime = new Date(weekDay.split('T')[0] + 'T' + timeTo.split('T')[1]);

        const startTimeRef = getRef(String(startTime));
        const endTimeRef = getRef(String(endTime));

        const position = {
          top: startTimeRef.top,
          left: startTimeRef.left,
          width: endTimeRef.left - startTimeRef.left,
        };

        const editedEvent = {
          id: id,
          crew: selectedCrew,
          weekDay: selectedWeekDay,
          startTime,
          endTime,
          position
        };

        const evs = events.filter(event => event.id !== id);

        validateOnEventCreate(evs, editedEvent, endTime, startTime, setEvents, setErrorMessage, setOpen);
      }
    })
  }, [selectedCrew, selectedWeekDay, selectedTimeFrom, selectedTimeTo, errorMessage, events])

  const createEvent = useCallback(() => {
    if (selectedCrew, selectedWeekDay && selectedTimeTo && selectedTimeFrom) {
      const weekDay = formatISO(new Date(selectedWeekDay));

      const timeFrom = formatISO(new Date(selectedTimeFrom));
      const timeTo = formatISO(new Date(selectedTimeTo));

      const startTime = new Date(weekDay.split('T')[0] + 'T' + timeFrom.split('T')[1]);
      const endTime = new Date(weekDay.split('T')[0] + 'T' + timeTo.split('T')[1]);

      const startTimeRef = getRef(String(startTime));
      const endTimeRef = getRef(String(endTime));

      const position = {
        top: startTimeRef.top,
        left: startTimeRef.left,
        width: endTimeRef.left - startTimeRef.left,
      };

      const newEvent = {
        id: generate(),
        crew: selectedCrew,
        weekDay: selectedWeekDay,
        startTime,
        endTime,
        position
      };

      validateOnEventCreate(events, newEvent, endTime, startTime, setEvents, setErrorMessage, setOpen);
    }
  }, [selectedCrew, selectedWeekDay, selectedTimeFrom, selectedTimeTo, errorMessage, events]);

  return (
    isOpen && (
      <Modal
        setOpen={setOpen}
        title={t('eurocash.addDislocationArea')}
      >
        <Selectbox
          title={t('eurocash.dislocationZone')}
          value={crews}
          setValue={setSelectedCrew}
          selectedValue={selectedCrew || eventData?.crew}
        />
        <div className={'grid grid-cols-3 pt-4 pb-8'}>
          <Selectbox
            twSelect={'mr-6'}
            title={t('eurocash.day')}
            value={weekDays}
            setValue={setWeekSelectedDay}
            selectedValue={selectedWeekDay || eventData?.weekDay}
          />
          <TimePicker
            twTimePicker={'mr-6'}
            title={t('eurocash.from')}
            setValue={setTimeFrom}
            selectedValue={selectedTimeFrom || eventData?.startTime}
          />
          <TimePicker
            title={t('eurocash.to')}
            value={selectedTimeTo}
            setValue={setTimeTo}
            selectedValue={selectedTimeTo || eventData?.endTime}
          />
        </div>
        {errorMessage && (
          <div className={'text-red-500'}> {errorMessage} </div>
        )}
        <div className={'mt-4'}>
          <div className={'flex justify-between'}>
            {isDeletable && (
              <button
                className={'mr-4 text-gray-500'}
                onClick={deleteEvent}
              >
                {t('eurocash.delete')}
              </button>
            )}
            <div className={'ml-auto'}>
              <button
                className={'mr-4 text-gray-500'}
                onClick={setOpen}>
                {t('eurocash.cancel')}
              </button>
              {isNew && (
                <button
                  className={'px-10 text-gray-500 bg-gray-600 text-white font-light rounded-sm'}
                  onClick={createEvent}>
                {t('eurocash.save')}
              </button>
              )}
              {isEdit && (
                <button
                  className={'px-10 text-gray-500 bg-gray-600 text-white font-light rounded-sm'}
                  onClick={editEvent}>
                  {t('eurocash.save')}
                </button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};

export default CalendarModal;
