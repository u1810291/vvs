import React, {useState, useCallback, useEffect} from 'react';

import Modal from '../atom/Modal';
import SelectBox from '../atom/input/SelectBox';
import TimePicker from '../obsolete/input/TimePicker';

import useLanguage from '../../hook/useLanguage';
import useWeekDays from '../../hook/useWeekDays';
import useValidation from '../../hook/useValidation';

import {constant, isEmpty} from 'crocks';
import {format, getDay, setDay} from 'date-fns';

import {generate} from 'shortid';

const CalendarModal = ({
  id,
  isNew,
  isEdit,
  isOpen,
  setOpen,
  events,
  crewId,
  setEvents,
  eventData,
  crewZones,
  isDeletable
}) => {
  const {t} = useLanguage();
  const {weekDays, getTimeLocals} = useWeekDays();
  const {validateOnEventCreate} = useValidation();
  const [selectedDislocationZone, setSelectedDislocationZone] = useState([{}]);
  const [selectedWeekDay, setSelectedWeekDay] = useState([{}]);
  const [errorMessage, setErrorMessage] = useState();

  const [selectedTimeTo, setTimeTo] = useState();
  const [selectedTimeFrom, setTimeFrom] = useState();

  const deleteEvent = useCallback(() => {
    setEvents(events.filter(event => event.id !== id));
  }, [events]);

  useEffect(() => {
    if (isEmpty(crewZones)) return;

    const zone = crewZones.find(z => z.value === eventData?.crew?.value) || crewZones[0];
    setSelectedDislocationZone({value: zone.value, name: zone.key});
  }, [crewZones, eventData?.crew?.value]);

  useEffect(() => {
    const weekDay = {
      key: format(setDay(new Date(), eventData?.week_day !== undefined ? eventData?.week_day : 1, {locale: getTimeLocals()}), 'EEEE'),
      value: setDay(new Date(), eventData?.week_day !== undefined ? eventData?.week_day : 1, {locale: getTimeLocals()})
    };
    setSelectedWeekDay({value: weekDay.value, name: weekDay.key});
  }, [weekDays, eventData]);

  const editEvent = useCallback(() => {
    return events.find(event => {
      if (event.id === id) {
        const editedEvent = {
          id: event.id,
          crew_id: eventData?.crew_id,
          dislocation_zone_id: selectedDislocationZone?.value,
          week_day: getDay(selectedWeekDay?.value),
          start_time: selectedTimeFrom,
          end_time: selectedTimeTo,
        };

        const evs = events.filter(event => event.id !== id);

        if (validateOnEventCreate(evs, editedEvent, setEvents, setErrorMessage, setOpen)) {
          // update
        };
      }
    });
  }, [selectedDislocationZone, selectedWeekDay, selectedTimeFrom, selectedTimeTo, errorMessage, events]);

  const createEvent = useCallback(() => {
    if (selectedDislocationZone && selectedWeekDay && selectedTimeTo && selectedTimeFrom) {
      const newEvent = {
        id: generate(),
        crew_id: crewId,
        dislocation_zone_id: selectedDislocationZone?.value,
        week_day: getDay(selectedWeekDay?.value),
        start_time: selectedTimeFrom,
        end_time: selectedTimeTo,
      };

      if (validateOnEventCreate(events, newEvent, setEvents, setErrorMessage, setOpen)) {
        // create
      };
    }
  }, [selectedDislocationZone, selectedWeekDay, selectedTimeFrom, selectedTimeTo, errorMessage, events]);

  return (
    isOpen && (
      <Modal
        setOpen={setOpen}
        title={t('eurocash.addDislocationArea')}
      >
        <SelectBox
          label={t('eurocash.dislocationZone')}
          value={selectedDislocationZone?.value}
          displayValue={constant(selectedDislocationZone?.name)}
          onChange={setSelectedDislocationZone}
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
            displayValue={constant(selectedWeekDay?.name)}
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
            isFullTime={false}
            twTimePicker={'mr-6'}
            title={t('eurocash.from')}
            value={selectedTimeFrom}
            setValue={setTimeFrom}
            selectedValue={selectedTimeFrom || eventData?.startTime}
          />
          <TimePicker
            isFullTime={false}
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
