import useLanguage from './useLanguage';
import {convertToFullDate} from '../components/CalendarTimeline/utils';
import {areIntervalsOverlapping, getISODay} from 'date-fns';

function useValidation() {
  const {t} = useLanguage();
  const validateOnEventCreate = (events, newEvent, setEvents, setErrorMessage, setOpen) => {
    const createEvent = () => {
      setEvents([...events, newEvent]);
      setErrorMessage('');
      setOpen(false);
      return true;
    };

    const startTime = convertToFullDate(newEvent?.week_day, newEvent?.start_time);
    const endTime = convertToFullDate(newEvent?.week_day, newEvent?.end_time);

    const isSameWeekDay = (eventDate, newEventDate) => getISODay(eventDate) === getISODay(newEventDate);
    const isStartTimeIsBiggerThanEndTime = Date.parse(endTime) < Date.parse(startTime);
    const isEventsExist = events && events.length > 0;
    const getSameWeekDayOverlappedEvent = events
      .filter(event => isSameWeekDay(convertToFullDate(event?.week_day, event?.start_time), startTime))
      .find(sameWeekDayEvent => {
        if (!isStartTimeIsBiggerThanEndTime) {
          return (
            areIntervalsOverlapping(
              {
                start: startTime,
                end: endTime
              },
              {
                start: convertToFullDate(sameWeekDayEvent?.week_day, sameWeekDayEvent?.start_time),
                end: convertToFullDate(sameWeekDayEvent?.week_day, sameWeekDayEvent?.end_time)
              }
            )
          );
        }
      });

    if (isStartTimeIsBiggerThanEndTime) {
      return setErrorMessage(t('error.startTimeIsBiggerThanEndTime'));
    }
    if (isEventsExist) {
      if (getSameWeekDayOverlappedEvent) {
        setErrorMessage(t('error.timeSlotIsTaken'));
      } else {
        return createEvent();
      }
    } else {
      return createEvent();
    }
  };

  return {validateOnEventCreate};
}

export default useValidation;
