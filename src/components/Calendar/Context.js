import {createContext, useContext, useMemo, useState} from 'react'
import {
  add,
  eachDayOfInterval,
  endOfDay,
  endOfISOWeek,
  endOfMonth,
  format,
  formatISO,
  isFuture,
  isSameDay,
  isToday,
  isWithinInterval,
  startOfDay,
  startOfISOWeek,
  startOfMonth,
  sub,
} from 'date-fns'

const CalendarContext = createContext();

const CalendarContextProvider = ({
  onSelect = () => {},
  ranged = false,
  lookBack = false,
  fromToday = false,
  selectedDates = [],
  availableDates = [],
  dateFnsLocale,
  children
}) => {
  const currentDate = new Date();
  const [showMonthOf, onShowMonthOf] = useState(selectedDates.length ? selectedDates[selectedDates.length - 1] : currentDate);
  const [_selectedDates, onSelectedDates] = useState(selectedDates);
  const currentMonthDate = startOfMonth(currentDate);
  const prevMonthDate = startOfMonth(sub(startOfMonth(showMonthOf), {days: 1}));
  const nextMonthDate = startOfMonth(add(endOfMonth(showMonthOf), {days: 1}));
  const canGoBack = lookBack ? true : +currentMonthDate <= +prevMonthDate;
  const canGoFwd = lookBack ? +currentMonthDate >= +nextMonthDate : true;
  const monthName = dateFnsLocale.localize.month(showMonthOf.getMonth());
  const weekDayNames = [1, 2, 3, 4, 5, 6, 0].map((d) => {
    const day = dateFnsLocale.localize.day(d)
    return {full: day, short: day[0].toUpperCase()}
  });

  const goPrevMonth = () => (canGoBack ? onShowMonthOf(prevMonthDate) : null);
  const goNextMonth = () => (canGoFwd ? onShowMonthOf(nextMonthDate) : null);

  const _onSelect = (day) => {
    const newValue =
      ranged && _selectedDates.length < 2
        ? [..._selectedDates, day.date].sort((a, b) => a - b).map((d, i) => i === 0 ? startOfDay(d) : endOfDay(d))
        : [day.date]

    onSelectedDates(newValue)
    onSelect(newValue)
  };

  const availableIsoDates = useMemo(
    () =>
      availableDates.length
        ? [
            ...new Set(
              availableDates.map((d) => format(new Date(d), 'yyyy-MM-dd')),
            ),
          ]
        : [],
    [availableDates],
  );

  const days = [
    ...eachDayOfInterval({
      start: startOfISOWeek(startOfMonth(showMonthOf)),
      end: endOfISOWeek(endOfMonth(showMonthOf)),
    }).map((date) => {
      date = startOfDay(date)
      const isoDate = format(date, 'yyyy-MM-dd')
      const isAvailable = availableIsoDates.length
        ? availableIsoDates.includes(isoDate)
        : fromToday
        ? isFuture(add(date, {days: 1}))
        : lookBack
        ? !isFuture(date)
        : true
      const isNow = isToday(date)
      const isoFormatted = formatISO(date)
      const isRangeEdge =
        (_selectedDates.length && isSameDay(_selectedDates[0], date)) ||
        isSameDay(_selectedDates[_selectedDates.length - 1], date)
      const isSelected =
        _selectedDates.length &&
        isWithinInterval(date, {
          start: startOfDay(_selectedDates[0]),
          end: endOfDay(_selectedDates[_selectedDates.length - 1]),
        })

      return {
        date,
        formatted: format(date, 'dd'),
        isAvailable,
        isNow,
        isRangeEdge,
        isSelected,
        isoFormatted,
      }
    }),
  ];

  return (
    <CalendarContext.Provider value={{
      _onSelect,
      _selectedDates,
      availableDates,
      availableIsoDates,
      canGoBack,
      canGoFwd,
      currentDate,
      currentMonthDate,
      dateFnsLocale,
      days,
      fromToday,
      goNextMonth,
      goPrevMonth,
      lookBack,
      monthName,
      nextMonthDate,
      onSelect,
      onSelectedDates, 
      prevMonthDate,
      ranged,
      selectedDates,
      showMonthOf,
      weekDayNames,
    }}>
      {children}
    </CalendarContext.Provider>
  );
};

/**
 * @typedef {object} CalendarDay
 *
 * @property {Date} date
 * @property {string} formatted
 * @property {bool} isAvailable
 * @property {bool} isNow
 * @property {bool} isRangeEdge
 * @property {bool} isSelected
 * @property {string} isoFormatted
 */

/**
 * @typedef {object} CalendarContextValue
 *
 * @property {() => void} _onSelect
 * @property {() => void} _selectedDates
 * @property {Date[]} availableDates
 * @property {string[]} availableIsoDates
 * @property {bool} canGoBack
 * @property {bool} canGoFwd
 * @property {Date} currentDate
 * @property {Date} currentMonthDate
 * @property {Locale} dateFnsLocale
 * @property {CalendarDay[]} days
 * @property {bool} fromToday
 * @property {() => void} goNextMonth
 * @property {() => void} goPrevMonth
 * @property {bool} lookBack
 * @property {string} monthName
 * @property {Date} nextMonthDate
 * @property {() => void} onSelect
 * @property {() => void} onSelectedDates,
 * @property {Date} prevMonthDate
 * @property {bool} ranged
 * @property {Date[]} selectedDates
 * @property {string[]} weekDayNames
 */

/**
 * @type {(any) => CalendarContextValue}
 * @throws {Error}
 */
const useCalendar = () => {
  /**
   * @type {CalendarContextValue}
   */
  const context = useContext(CalendarContext);
  if (context === undefined) throw new Error('useCalendar must be used within a CalendarProvider');
  return context;
};

export {
  CalendarContextProvider,
  useCalendar,
};
