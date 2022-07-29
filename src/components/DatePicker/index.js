import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid'
// import InputGroup from 'components/atom/input/InputGroup';
import Nullable from 'components/atom/Nullable';
import {useState, useMemo} from 'react';
import {format} from 'date-fns';

const months = [
  {
    name: 'January',
    days: [
      {date: '2021-12-27'},
      {date: '2021-12-28'},
      {date: '2021-12-29'},
      {date: '2021-12-30'},
      {date: '2021-12-31'},
      {date: '2022-01-01', isCurrentMonth: true},
      {date: '2022-01-02', isCurrentMonth: true},
      {date: '2022-01-03', isCurrentMonth: true},
      {date: '2022-01-04', isCurrentMonth: true},
      {date: '2022-01-05', isCurrentMonth: true},
      {date: '2022-01-06', isCurrentMonth: true},
      {date: '2022-01-07', isCurrentMonth: true},
      {date: '2022-01-08', isCurrentMonth: true},
      {date: '2022-01-09', isCurrentMonth: true},
      {date: '2022-01-10', isCurrentMonth: true},
      {date: '2022-01-11', isCurrentMonth: true},
      {date: '2022-01-12', isCurrentMonth: true, isToday: true},
      {date: '2022-01-13', isCurrentMonth: true},
      {date: '2022-01-14', isCurrentMonth: true},
      {date: '2022-01-15', isCurrentMonth: true},
      {date: '2022-01-16', isCurrentMonth: true},
      {date: '2022-01-17', isCurrentMonth: true},
      {date: '2022-01-18', isCurrentMonth: true},
      {date: '2022-01-19', isCurrentMonth: true},
      {date: '2022-01-20', isCurrentMonth: true},
      {date: '2022-01-21', isCurrentMonth: true},
      {date: '2022-01-22', isCurrentMonth: true},
      {date: '2022-01-23', isCurrentMonth: true},
      {date: '2022-01-24', isCurrentMonth: true},
      {date: '2022-01-25', isCurrentMonth: true},
      {date: '2022-01-26', isCurrentMonth: true},
      {date: '2022-01-27', isCurrentMonth: true},
      {date: '2022-01-28', isCurrentMonth: true},
      {date: '2022-01-29', isCurrentMonth: true},
      {date: '2022-01-30', isCurrentMonth: true},
      {date: '2022-01-31', isCurrentMonth: true},
      {date: '2022-02-01'},
      {date: '2022-02-02'},
      {date: '2022-02-03'},
      {date: '2022-02-04'},
      {date: '2022-02-05'},
      {date: '2022-02-06'},
    ],
},
  {
    name: 'February',
    days: [
      {date: '2022-01-31'},
      {date: '2022-02-01', isCurrentMonth: true},
      {date: '2022-02-02', isCurrentMonth: true},
      {date: '2022-02-03', isCurrentMonth: true},
      {date: '2022-02-04', isCurrentMonth: true},
      {date: '2022-02-05', isCurrentMonth: true},
      {date: '2022-02-06', isCurrentMonth: true},
      {date: '2022-02-07', isCurrentMonth: true},
      {date: '2022-02-08', isCurrentMonth: true},
      {date: '2022-02-09', isCurrentMonth: true},
      {date: '2022-02-10', isCurrentMonth: true},
      {date: '2022-02-11', isCurrentMonth: true},
      {date: '2022-02-12', isCurrentMonth: true},
      {date: '2022-02-13', isCurrentMonth: true},
      {date: '2022-02-14', isCurrentMonth: true},
      {date: '2022-02-15', isCurrentMonth: true},
      {date: '2022-02-16', isCurrentMonth: true},
      {date: '2022-02-17', isCurrentMonth: true},
      {date: '2022-02-18', isCurrentMonth: true},
      {date: '2022-02-19', isCurrentMonth: true},
      {date: '2022-02-20', isCurrentMonth: true},
      {date: '2022-02-21', isCurrentMonth: true},
      {date: '2022-02-22', isCurrentMonth: true},
      {date: '2022-02-23', isCurrentMonth: true},
      {date: '2022-02-24', isCurrentMonth: true},
      {date: '2022-02-25', isCurrentMonth: true},
      {date: '2022-02-26', isCurrentMonth: true},
      {date: '2022-02-27', isCurrentMonth: true},
      {date: '2022-02-28', isCurrentMonth: true},
      {date: '2022-03-01'},
      {date: '2022-03-02'},
      {date: '2022-03-03'},
      {date: '2022-03-04'},
      {date: '2022-03-05'},
      {date: '2022-03-06'},
      {date: '2022-03-07'},
      {date: '2022-03-08'},
      {date: '2022-03-09'},
      {date: '2022-03-10'},
      {date: '2022-03-11'},
      {date: '2022-03-12'},
      {date: '2022-03-13'},
    ],
},
]

const DAY = {
  SUNDAY: 0, MONDAY: 1, TUESDAY: 2, WEDNESDAY: 3, THURSDAY: 4, FRIDAY: 5, SATURDAY: 6
}

const MONTH = {
  0: 'January', 1: 'February', 2: 'March', 3: 'April', 
  4: 'May', 5: 'June', 6: 'July', 7: 'August', 
  8: 'September', 9: 'October', 10: 'November', 11: 'December'
}

const MONTH_MIN = 0;
const MONTH_MAX = 11;
const DAYS_IN_WEEK = 7; // sunday - 0

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const getCurrentMonth = () => {
  return new Date().getMonth();
}

const getCurrentYear = () => {
  return new Date().getFullYear();
}

const getLastDayOfMonth = (year, month) => {
  return new Date(year, month + 1, 0);
}

const formatDate = (year, month, day) => {
  return `${year}-${month}-${day}`;
}

const DatePicker = ({key, label, defaultValue, onChange}) => {
  const getCurrentDays = () => {
    const days = [];

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = getLastDayOfMonth(currentYear, currentMonth); 

    // for caledar starting with sunday as 1st day
    const prevDaysCount = firstDay.getDay() === DAY.SUNDAY ? firstDay.getDay() + DAYS_IN_WEEK - 1  : firstDay.getDay() - 1;
    const afterDaysCount = lastDay.getDay() === DAY.SUNDAY ? lastDay.getDay() : DAYS_IN_WEEK - lastDay.getDay();

    const prevLastDay = getLastDayOfMonth(firstDay.getFullYear(), firstDay.getMonth() - 1);
    const afterFirstDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 1);

    // TOO MUCH REPEATED CODE !!!
    for (let d = prevLastDay.getDate() - prevDaysCount + 1; d <= prevLastDay.getDate(); d++) {
      const date = formatDate(prevLastDay.getFullYear(), prevLastDay.getMonth() + 1, d);
      days.push({date});
    }

    for (let d = firstDay.getDate(); d <= lastDay.getDate(); d++) {
      const date = formatDate(firstDay.getFullYear(), firstDay.getMonth() + 1, d);
      const today = new Date();
      const isToday = date === formatDate(today.getFullYear(), today.getMonth() + 1, today.getDate());

      days.push({date, isCurrentMonth: true, isToday});
    }

    for (let d = afterFirstDay.getDate(); d < afterFirstDay.getDate() + afterDaysCount; d++) {
      const date = formatDate(afterFirstDay.getFullYear(), afterFirstDay.getMonth() + 1, d);
      days.push({date});
    }

    if (selectedDate) {
      // console.log(selectedDate);
      for (const day of days) {
        day.isSelected = formatDate(selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate()) === day.date;
      }
    }

    // console.log(days);

    return days;
  }

  const [isPickerShown, setIsPickerShown] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  const [selectedDate, setSelectedDate] = useState(defaultValue);
  const days = useMemo(() => getCurrentDays(), [currentMonth, currentYear, selectedDate]);

  
  // date picker focused
  const onFocus = (e) => {
    if (!isPickerShown) {
      setCurrentYear(selectedDate ? selectedDate.getFullYear() : new Date().getFullYear());
      setCurrentMonth(selectedDate ? selectedDate.getMonth() : new Date().getMonth());
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
    const [year, month, day] = e.currentTarget.dataset.date.split('-');
    let selected = new Date(year, month - 1, day);  

    if (selectedDate) {
      if (formatDate(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()) === formatDate(year, month - 1, day)) {
        selected = null;
      }
    }

    setSelectedDate(selected);
    setIsPickerShown(false);

    // call onChange 
    onChange(selected);
  }

  // const reset = () => {
  //   setSelectedDate(null);
  //   setTimeout(() => setIsPickerShown(false));
  // }

  return (
    <div className={'relative '} onBlur={onBlur}>
      <Nullable on={label}>
        <span>{label}</span>
      </Nullable>
      <button onClick={onFocus} id={key} className={'bg-white h-[38px] relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'}>
        {selectedDate && format(selectedDate, 'Y-MM-dd')}
        
        {/* <Nullable on={selectedDate}>
          <span onClick={reset} className={'absolute inset-y-0 right-8 flex items-center pr-2'}>
            <XIcon className={'h-5 w-5 text-gray-400'} />  
          </span>
        </Nullable> */}
        <span className={'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'}>
          <CalendarIcon className={'h-5 w-5 text-gray-400'} />  
        </span>
      </button>

      <Nullable on={isPickerShown}>
        <div>
          <div className={'absolute top-[38px] w-full left-0 z-50 bg-white'}>
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
                    'py-1.5 hover:bg-gray-100 focus:z-10',
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                    (day.isSelected || day.isToday) && 'font-semibold',
                    day.isSelected && 'text-white',
                    !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                    !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                    day.isToday && !day.isSelected && 'text-indigo-600',
                    dayIdx === 0 && 'rounded-tl-lg',
                    dayIdx === 6 && 'rounded-tr-lg',
                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                    dayIdx === days.length - 1 && 'rounded-br-lg'
                  )}
                  data-date={day.date}
                  onClick={selectDay}
                >
                  <span
                    dateTime={day.date}
                    className={classNames(
                      'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                      day.isSelected && day.isToday && 'bg-indigo-600',
                      day.isSelected && !day.isToday && 'bg-gray-900'
                    )}
                  >
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div> 
      </Nullable>
    
    </div>
  )
}


export default DatePicker;