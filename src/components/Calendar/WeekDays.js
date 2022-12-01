import {useCalendar} from './Context';

const WeekDays = () => {
  const {weekDayNames} = useCalendar();

  return weekDayNames.map(d => (
    <p key={d.full} className='inline-block px-3 py-2 text-center'>
      {d.short}
    </p>
  ));
};

export default WeekDays;
