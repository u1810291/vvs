import React, {useState, useCallback, useEffect} from 'react';

import Modal from '../atom/Modal';
import SelectBox from '../atom/input/SelectBox';
import TimePicker from '../obsolete/input/TimePicker';

import useLanguage from '../../hook/useLanguage';
import useWeekDays from '../../hook/useWeekDays';
import useValidation from '../../hook/useValidation';

import {generate} from 'shortid';
import {constant} from 'crocks';
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
  crewZones,
  isDeletable,
}) => {
  const {t} = useLanguage();
  const {weekDays} = useWeekDays();
  const {validateOnEventCreate} = useValidation();
  const [selectedCrew, setSelectedCrew] = useState([{}]);
  const [selectedWeekDay, setSelectedWeekDay] = useState([{}]);

  const [errorMessage, setErrorMessage] = useState();

  const [selectedTimeTo, setTimeTo] = useState();
  const [selectedTimeFrom, setTimeFrom] = useState();

  const deleteEvent = useCallback(() => {
    setEvents(events.filter(event => event.id !== id))
  }, [events]);

  useEffect(() => {
    setSelectedCrew(eventData?.crew || crewZones[0])
  }, [crewZones, eventData?.crew]);

  useEffect(() => {
    setSelectedWeekDay(eventData?.weekDay || weekDays[0])
  }, [weekDays, eventData?.weekDay]);

  const editEvent = useCallback(() => {
    const eve = events.find(event => {
      if (event.id === id) {
        const weekDay = formatISO(new Date(selectedWeekDay.value));

        const timeFrom = formatISO(new Date(selectedTimeFrom));
        const timeTo = formatISO(new Date(selectedTimeTo));

        const startTime = new Date(weekDay.split('T')[0] + 'T' + timeFrom.split('T')[1]);
        const endTime = new Date(weekDay.split('T')[0] + 'T' + timeTo.split('T')[1]);

        const editedEvent = {
          id: id,
          crew: selectedCrew,
          weekDay: selectedWeekDay,
          startTime,
          endTime,
        };

        const evs = events.filter(event => event.id !== id);

        validateOnEventCreate(evs, editedEvent, endTime, startTime, setEvents, setErrorMessage, setOpen);
      }
    })
  }, [selectedCrew, selectedWeekDay, selectedTimeFrom, selectedTimeTo, errorMessage, events])

  const createEvent = useCallback(() => {
    if (selectedCrew && selectedWeekDay && selectedTimeTo && selectedTimeFrom) {
      const weekDay = formatISO(new Date(selectedWeekDay.value));

      const timeFrom = formatISO(new Date(selectedTimeFrom));
      const timeTo = formatISO(new Date(selectedTimeTo));

      const startTime = new Date(weekDay.split('T')[0] + 'T' + timeFrom.split('T')[1]);
      const endTime = new Date(weekDay.split('T')[0] + 'T' + timeTo.split('T')[1]);

      console.log(getRef(String(endTime))?.offsetLeft)

      const newEvent = {
        id: generate(),
        crew: selectedCrew,
        weekDay: selectedWeekDay,
        startTime,
        endTime,
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
        <SelectBox
          label={t('eurocash.dislocationZone')}
          value={selectedCrew?.value}
          displayValue={constant(selectedCrew?.key)}
          onChange={setSelectedCrew}
        >
          {crewZones.map(crewZone => (
            <SelectBox.Option key={crewZone?.key} value={crewZone?.value}>
              {crewZone?.key}
            </SelectBox.Option>
          ))}
        </SelectBox>
        <div className={'grid grid-cols-3 pt-4 pb-8'}>
          <SelectBox
            label={t('eurocash.day')}
            value={selectedWeekDay?.value}
            displayValue={constant(selectedWeekDay?.key)}
            onChange={setSelectedWeekDay}
            className={'mr-4'}
          >
            {weekDays.map(weekDay => (
              <SelectBox.Option key={weekDay?.key} value={weekDay?.value}>
                {weekDay?.key}
              </SelectBox.Option>
            ))}
          </SelectBox>
          <TimePicker
            twTimePicker={'mr-6'}
            title={t('eurocash.from')}
            value={selectedTimeFrom}
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
                  className={'px-10 bg-gray-600 text-white font-light rounded-sm'}
                  onClick={createEvent}>
                {t('eurocash.save')}
              </button>
              )}
              {isEdit && (
                <button
                  className={'px-10 bg-gray-600 text-white font-light rounded-sm'}
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
