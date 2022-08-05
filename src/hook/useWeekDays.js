import {useCallback, useMemo} from 'react';
import {enGB, lt} from 'date-fns/locale';
import useLanguage from './useLanguage';
import {eachDayOfInterval, endOfWeek, format, startOfWeek} from 'date-fns';

const useWeekDays = (callback) => {
  const {getLanguage} = useLanguage();
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getTimeLocals = useCallback(() => {
    const currentLanguage = getLanguage();
    return currentLanguage === 'lt' ? lt : enGB;
  }, []);

  const getWeekDays = useCallback(locale => {
    const now = new Date();
    const weekDays = [];
    const start = startOfWeek(now, {locale: locale || getTimeLocals()});
    const end = endOfWeek(now, {locale: locale || getTimeLocals()});
    eachDayOfInterval({start, end}).forEach(day => {
      weekDays.push(
        {
          key: capitalize(format(day, 'EEEE', {locale: locale || getTimeLocals()})),
          value: day
        }
      );
    });

    return weekDays;
    }, [getLanguage]);


  const weekDays = useMemo(() => {
    return getWeekDays(getTimeLocals())
  }, [getWeekDays, getTimeLocals])

  return {getWeekDays, getTimeLocals, weekDays};
};

export default useWeekDays;
