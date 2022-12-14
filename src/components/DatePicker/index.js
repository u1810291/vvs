import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon
} from '@heroicons/react/solid'
import {CalendarIcon} from '@heroicons/react/outline';
// import InputGroup from 'components/atom/input/InputGroup';
import Nullable from 'components/atom/Nullable';
import React, {useState, useMemo, useEffect} from 'react';
import {addDays, compareAsc, format, isEqual, subDays, isSameDay, isBefore, isAfter} from 'date-fns';
import Button from './Button';

const DAY = {
  SUNDAY: 0, MONDAY: 1, TUESDAY: 2, WEDNESDAY: 3, THURSDAY: 4, FRIDAY: 5, SATURDAY: 6
};

const MONTH = {
  0: 'January', 1: 'February', 2: 'March', 3: 'April',
  4: 'May', 5: 'June', 6: 'July', 7: 'August',
  8: 'September', 9: 'October', 10: 'November', 11: 'December'
}

const TURN = {
  START: 0, END: 1
};

const MONTH_MIN = 0;
const MONTH_MAX = 11;
const DAYS_IN_WEEK = 7; // sunday - 0

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
};


const getLastDayOfMonth = (year, month) => {
  return new Date(year, month + 1, 0);
}




const DatePicker = ({label, defaultValue, onChange, placeholder, range = false}) => {
  const [isPickerShown, setIsPickerShown] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const [turn, setTurn] = useState(TURN.START);

  useEffect(() => {
    if (defaultValue) {
      setSelectedDate(defaultValue);
    }
  }, [defaultValue])

  // get days for a calendar
  const days = useMemo(() => {
    const days = [];

    // first & last days of current month-year
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = getLastDayOfMonth(currentYear, currentMonth);

    // first & last days appeared on Calendar
    const daysBefore = firstDay.getDay() === DAY.SUNDAY ? subDays(firstDay, firstDay.getDay() + DAYS_IN_WEEK - 1) : subDays(firstDay, firstDay.getDay() - 1);
    const daysAfter = lastDay.getDay() === DAY.SUNDAY ? addDays(lastDay, lastDay.getDay()) : addDays(lastDay, DAYS_IN_WEEK - lastDay.getDay());

    let currentDate = daysBefore;

    while (compareAsc(currentDate, daysAfter) <= 0) {
      days.push({
        date: format(currentDate, 'Y-MM-dd'),
        isToday: isSameDay(currentDate, new Date()),
        isCurrentMonth: compareAsc(currentDate, firstDay) >= 0 && compareAsc(currentDate, lastDay) <= 0,
        isDisabled: range && selectedDate && selectedDate.length == 1 ? isBefore(currentDate, selectedDate[0]) : false,
        isSelected: range ? selectedDate && selectedDate?.find(d => isEqual(currentDate, d)) : isEqual(currentDate, selectedDate), 
        isBetweenDates: range && selectedDate && selectedDate.length == 2 && isAfter(currentDate, selectedDate[0]) && isBefore(currentDate, selectedDate[1]),
      });

      currentDate = addDays(currentDate, 1);
    }

    return days;
  }, [currentMonth, currentYear, selectedDate]);

  useEffect(() => {

  }, []);


  // date picker focused
  const onFocus = (e) => {
    // are we reseting?
    if (e.target.value !== e.currentTarget.value) {
      setSelectedDate(null);
      setIsPickerShown(false);
      onChange(null);
      return;
    }

    if (!isPickerShown) {
      if (selectedDate && !range) {
        setCurrentYear(selectedDate ? selectedDate.getFullYear() : new Date().getFullYear());
        setCurrentMonth(selectedDate ? selectedDate.getMonth() : new Date().getMonth());
      } else if (selectedDate && range) {
        setCurrentYear(selectedDate ? selectedDate[0].getFullYear() : new Date().getFullYear());
        setCurrentMonth(selectedDate ? selectedDate[0].getMonth() : new Date().getMonth());
      } else {
        setCurrentYear(new Date().getFullYear());
        setCurrentMonth(new Date().getMonth());
      }
    }

    setIsPickerShown(f => !f);
  }

  const onBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsPickerShown(false);
    }
  }

  const setPrevMonth = (e) => {
    if (currentMonth - 1 < MONTH_MIN) {
      setCurrentMonth(MONTH_MAX);
      setCurrentYear(year => year - 1);
      return;
    }

    setCurrentMonth(month => month - 1);
  }

  const setNextMonth = (e) => {
    if (currentMonth + 1 > MONTH_MAX) {
      setCurrentMonth(0);
      setCurrentYear(year => year + 1);
      return;
    }

    setCurrentMonth(month => month + 1);
  }

  const selectDay = (e) => {
    let selected = new Date(e.currentTarget.dataset.date.split('-'));

    if (!range) {
      // if we pick same day - clear selectedDate
      if (selectedDate && isEqual(selectedDate, selected)) {
        selected = null;
      }

      setSelectedDate(selected);
      setIsPickerShown(false);
    } else {
      if (turn === TURN.START) {
        setSelectedDate([selected]);
        setTurn(TURN.END);
      } else if (turn === TURN.END) {
        setSelectedDate((current) => [...current, selected]);
        setTurn(TURN.START);
        setIsPickerShown(false);
      }
    }

    // call parent's onChange
    onChange(selected);
  }

  return (
    <div className={'w-full'} onBlur={onBlur}>
      <Nullable on={label}>
        <span className='text-sm'>{label}</span>
      </Nullable>
      <div className={'mt-1 relative'}>
        <Button onClick={onFocus}>
          {!range && selectedDate && format(selectedDate, 'Y-MM-dd')}
          {range && selectedDate && selectedDate.length == 2 && `${format(selectedDate[0], 'Y-MM-dd')}, ${format(selectedDate[1], 'Y-MM-dd')}`}
          
          <Nullable on={placeholder && (!range && !selectedDate || range && (!selectedDate || (selectedDate && selectedDate.length < 2)))}>
            <span className='text-slate-700 pointer-events-none'>{placeholder}</span>
          </Nullable>
          
          <Nullable on={!range && selectedDate || range && selectedDate && selectedDate.length == 2}>
          <span className={'absolute inset-y-0 right-8 flex items-center pr-2'}>
            <XIcon className={'h-5 w-5 text-gray-400 cursor-pointer'} />
          </span>
          </Nullable>
          
          <span className={'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'}>
            <CalendarIcon className={'h-5 w-5 text-gray-400'} />
          </span>
        </Button>
        <Nullable on={isPickerShown}>
          <div className={'absolute origin-top-right mt-1 w-full left-0 z-50 bg-white'}>
            <div className='flex items-center text-gray-900'>
              <button
                type='button'
                className='-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
                onClick={setPrevMonth}
              >
                <span className='sr-only'>Previous month</span>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              </button>
              <div className='flex-auto font-semibold text-center'>{MONTH[currentMonth]}, {currentYear}</div>
              <button
                type='button'
                className='-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
                onClick={setNextMonth}
              >
                <span className='sr-only'>Next month</span>
                <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
            <div className='mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500 text-center'>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
              <div>Su</div>
            </div>
            <div className='isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200'>
              {days.map((day, dayIdx) => (
                <button
                  key={day.date}
                  type='button'
                  className={classNames(
                    'py-1.5 focus:z-10',
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                    (day.isSelected || day.isToday) && 'font-semibold',
                    (day.isSelected || day.isBetweenDates) && 'text-white',
                    !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                    !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                    day.isToday && !day.isSelected && 'text-steel',
                    !day.isDisabled ? 'hover:bg-gray-100' : 'bg-gray-50 text-gray-400 cursor-not-allowed',
                    dayIdx === 0 && 'rounded-tl-lg',
                    dayIdx === DAYS_IN_WEEK - 1 && 'rounded-tr-lg',
                    dayIdx === days.length - DAYS_IN_WEEK && 'rounded-bl-lg',
                    dayIdx === days.length - 1 && 'rounded-br-lg'
                  )}
                  data-date={day.date}
                  onClick={!day.isDisabled ? selectDay : null}
                >
                <span
                  dateTime={day.date}
                  className={classNames(
                    'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-steel',
                    day.isSelected && !day.isToday && 'bg-gray-900',
                    day.isBetweenDates && 'bg-gray-400',
                  )}
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </span>
                </button>
              ))}
            </div>
          </div>
        </Nullable>
      </div>
    </div>
  )
}


export default DatePicker;
