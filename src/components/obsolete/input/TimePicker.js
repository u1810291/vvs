import React, {useState, useCallback, useEffect} from 'react';

import useLanguage from '../../../hook/useLanguage';

import {generate} from 'shortid';
import {formatISO, format} from 'date-fns';

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
    setHour(selectedValue ? format(new Date(selectedValue), 'HH') : HOURS[0]);
    setMinute(selectedValue ? format(new Date(selectedValue), 'mm') : MINUTES[0]);
  }, []);

  return (
    <div className={'grid grid-cols-2 gap-4 mt-1'}>
      <div className={'flex flex-col col-span-1'}>
        <select
          className={'p-1 border border-gray-300 text-gray-600 rounded-md focus:outline-none'}
          value={selectedValue ? format(new Date(selectedValue), 'HH') : HOURS[0]}
          onChange={setHourValue}>
          {HOURS.map(hour => (
            <option key={generate()} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <label className={'text-gray-600 text-sm'}>
          {t('eurocash.hours')}
        </label>
      </div>

      <div className={'flex flex-col col-span-1'}>
        <select
          className={'p-1 border border-gray-300 text-gray-600 rounded-md focus:outline-none'}
          value={selectedValue ? format(new Date(selectedValue), 'mm') : MINUTES[0]}
          onChange={setMinuteValue}>
          {MINUTES.map(minute => (
            <option key={generate()} value={minute}>
              {minute}
            </option>
          ))}
        </select>
        <label className={'text-gray-600 text-sm'}>
          {t('eurocash.minutes')}
        </label>
      </div>
    </div>
  );
};

const TimePicker = ({setValue, selectedValue, title, twTimePicker}) => {
  const [selectedHour, setHour] = useState('');
  const [selectedMinute, setMinute] = useState('');

  useEffect(() => {
    if (selectedHour || selectedMinute) {
      const now = new Date();
      const nowToISO = formatISO(now);
      const nowDate = nowToISO.split('T')[0];
      const hms = ':' + selectedHour + ':' + selectedMinute + ':' + '00';
      const time = new Date(nowDate + hms);
      setValue(time);
    }
  }, [selectedHour, selectedMinute]);

  return (
    <div className={`flex flex-col focus:outline-none ${twTimePicker}`}>
      <label className={'text-gray-600'}>{title}</label>
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