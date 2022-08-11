import React, {useState, useCallback, useEffect} from 'react';

import useLanguage from '../../../hook/useLanguage';

import {generate} from 'shortid';

const TimePickerOptions = ({
  setHour,
  setMinute,
  selectedValue,
  selectedHour,
  selectedMinute,
}) => {
  const {t} = useLanguage();
  const HOURS = Object.freeze([
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
  ]);
  const MINUTES = Object.freeze([
    '00', '05', '10', '15', '20', '25', '30', '35',
    '40', '45', '50', '55'
  ]);
  const setHourValue = useCallback((event) => {
    setHour(event.currentTarget.value);
  }, []);
  const setMinuteValue = useCallback((event) => {
    setMinute(event.currentTarget.value);
  }, []);
  useEffect(() => {
    setHour(selectedValue ? selectedValue?.split(':')[0] : HOURS[0]);
    setMinute(selectedValue ? selectedValue?.split(':')[1] : MINUTES[0]);
  }, []);

  return (
    <div className={'grid grid-cols-2 gap-4 mt-1'}>
      <div className={'flex flex-col col-span-1'}>
        <select
          className={'p-1 border border-gray-border text-bluewood rounded-sm focus:border-gray-border focus:ring-0 focus:ring-offset-0'}
          value={selectedValue ? selectedValue?.split(':')[0] : HOURS[0]}
          onChange={setHourValue}>
          {HOURS.map(hour => (
            <option key={generate()} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <label className={'text-bluewood text-sm'}>
          {t('eurocash.hours')}
        </label>
      </div>

      <div className={'flex flex-col col-span-1'}>
        <select
          className={'p-1 border border-gray-border text-bluewood rounded-sm focus:border-gray-border focus:ring-0 focus:ring-offset-0'}
          value={selectedValue ? selectedValue?.split(':')[1] : MINUTES[0]}
          onChange={setMinuteValue}>
          {MINUTES.map(minute => (
            <option key={generate()} value={minute}>
              {minute}
            </option>
          ))}
        </select>
        <label className={'text-bluewood text-sm'}>
          {t('eurocash.minutes')}
        </label>
      </div>
    </div>
  );
};

const TimePicker = ({setValue, selectedValue, title, twTimePicker, isFullTime}) => {
  const [selectedHour, setHour] = useState('');
  const [selectedMinute, setMinute] = useState('');
  useEffect(() => {
    if (selectedHour || selectedMinute) setValue(`${selectedHour}:${selectedMinute}:00`);
  }, [selectedHour, selectedMinute]);

  return (
    <div className={`flex flex-col focus:outline-none ${twTimePicker}`}>
      <label className={'text-bluewood'}>{title}</label>
      <TimePickerOptions
        setHour={setHour}
        setMinute={setMinute}
        selectedHour={selectedHour}
        selectedMinute={selectedMinute}
        setValue={setValue}
        selectedValue={selectedValue}
      />
    </div>
  );
};

export default TimePicker;
