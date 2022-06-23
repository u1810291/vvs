import {add, parseISO} from 'date-fns';

const getTimeslots = (start, end, minuteSpan) => {
  const timeSlots = [];
  const startDate = parseISO(start);
  const endDate = parseISO(end);
  let currentDate = startDate;
  timeSlots.push(currentDate);
  while (currentDate <= endDate) {
    currentDate = add(currentDate, {minutes: minuteSpan});
    timeSlots.push(currentDate);
  }
  return timeSlots.slice(0, -1);
};

export default getTimeslots;
