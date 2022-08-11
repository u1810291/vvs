import {safe} from 'crocks';
import {pipe} from 'crocks/helpers';
import {map, option} from 'crocks/pointfree';
import {isNumber, isString} from 'crocks/predicates';

import {lt} from 'date-fns/locale';
import {setDayWithOptions, setHours, setMinutes, setSeconds, formatISO} from 'date-fns/fp';

export const convertToFullDate = (weekDay, duration) => {
  const day = pipe(
    safe(isNumber),
    map(dt => setDayWithOptions({locale: lt})(dt)(new Date())),
    option(new Date())
  )(weekDay);

  const hms = pipe(
    safe(isString),
    map(dr => new Date(setHours(dr.split(':')[0])(setMinutes(dr.split(':')[1])(setSeconds(0)(new Date()))))),
    option(new Date())
  )(duration);

  return new Date(formatISO(day).split('T')[0].concat('T', formatISO(hms).split('T')[1]));
};

export const capitalize = (string) => {
  return pipe(
    safe(isString),
    map(s => s.charAt(0).toUpperCase() + s.slice(1)),
    option('-')
  )(string);
};
