import {withComponentFactory} from 'util/react'
import Box from './Box';
import DateCell from './DateCell';
import DatesWrapper from './DatesWrapper';
import CurrentPage from './CurrentPage';
import WeekDays from './WeekDays';

/**
 * @type {({availableDates: Date[]}) => ReactElement}
 */
export default withComponentFactory(Box, {
  DateCell,
  DatesWrapper,
  WeekDays,
  CurrentPage,
});
