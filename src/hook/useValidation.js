import useLanguage from './useLanguage';

import {areIntervalsOverlapping, getISODay} from 'date-fns';

function useValidation() {
  const {t} = useLanguage();
  const validateOnEventCreate = (events, newEvent, endTime, startTime, setEvents, setErrorMessage, setOpen) => {
    const createEvent = () => {
      setEvents([...events, newEvent]);
      setErrorMessage('');
      setOpen(false);
    };
    const isSameWeekDay = (eventDate, newEventDate) => getISODay(eventDate) === getISODay(newEventDate);
    const isStartTimeIsBiggerThanEndTime = Date.parse(endTime) < Date.parse(startTime);
    const isEventsExist = events && events.length > 0;
    const getSameWeekDayOverlappedEvent = events
      .filter(event => isSameWeekDay(event.startTime, startTime))
      .find(sameWeekDayEvent => {
        if (!isStartTimeIsBiggerThanEndTime) {
          return (
            areIntervalsOverlapping(
              {start: startTime, end: endTime},
              {start: sameWeekDayEvent.startTime, end: sameWeekDayEvent.endTime}
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
        createEvent();
      }
    } else {
      createEvent();
    }
  };

  return {validateOnEventCreate}
}

export default useValidation;
