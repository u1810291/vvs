import React from 'react';
import Nullable from 'components/atom/Nullable';
import {format, formatDuration, intervalToDuration} from 'date-fns';

const BreachTimeInfo = ({start_time, end_time}) => (
  <Nullable on={start_time && end_time}>
    <p className={'text-bluewood mb-2'}>
      {
        start_time && end_time &&
        formatDuration(
          intervalToDuration({
            start: new Date(start_time),
            end: new Date(end_time)
          })
        )
      }
    </p>
    <p className={'text-bluewood'}>
      {
        start_time && format(new Date(start_time), 'Y-MM-d HH:mm')
      }
    </p>
  </Nullable>
);

export default BreachTimeInfo;
