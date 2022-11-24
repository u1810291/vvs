import {identity, pick} from 'crocks'
import NavButton from './NavButton'
import {CalendarContextProvider, useCalendar} from './Context'
import {enGB as en} from 'date-fns/locale'
import {withMergedClassName} from 'util/react'

const BoxContent = withMergedClassName('inline-block rounded-md p-2 mt-3 bg-white border border-gray-200 shadow-xl', ({
  DateCell,
  DatesWrapper,
  CurrentPage,
  WeekDays,
  ateCell,
  cellContainerProps,
  ...props
}) => {
  const {days, _onSelect} = useCalendar();
  return (
    <div {...props}>
      <div className='flex items-center justify-between'>
        <NavButton />
        <CurrentPage />
        <NavButton direction />
      </div>
      <DatesWrapper {...cellContainerProps}>
        <WeekDays />
        {days.map((d) => (
          <DateCell 
            {...pick([
              'formatted',
              'isAvailable',
              'isNow',
              'isRangeEdge',
              'isSelected',
            ], d)}
            onClick={() => _onSelect(d)}
            disabled={!d.isAvailable}
            key={d.isoFormatted}
          />
        ))}
      </DatesWrapper>
    </div>
  )
});

const Box = ({
  DateCell,
  DatesWrapper,
  CurrentPage,
  WeekDays,
  availableDates = [],
  cellContainerProps,
  className,
  fromToday = false,
  lookBack = false,
  onSelect = identity,
  ranged = false,
  selectedDates = [],
  ...props
}) => {
  return (
    <CalendarContextProvider {...{
      onSelect,
      ranged,
      lookBack,
      fromToday,
      selectedDates,
      availableDates,
      dateFnsLocale: en,
    }}>
      <BoxContent {...{
        DateCell,
        DatesWrapper,
        CurrentPage,
        WeekDays,
        cellContainerProps,
        className,
        ...props
      }}/>
    </CalendarContextProvider>
  )
}

export default Box;
