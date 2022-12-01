import React from 'react';
import Nullable from 'components/atom/Nullable';
import {format, formatDuration, intervalToDuration} from 'date-fns';

const BreachTimeInfo = ({breach}) => (
  <Nullable on={breach?.start_time}>
    <p className={'text-bluewood text-[13px] mb-2'}>
      {
        breach?.start_time &&
        formatDuration(
          intervalToDuration({
            start: new Date(breach?.start_time),
            end: breach?.end_time ? new Date(breach?.end_time) : new Date()
          })
        )
      }
    </p>
    <p className={'text-bluewood text-[13px]'}>
      {
        breach?.start_time && format(new Date(breach?.start_time), 'Y-MM-d HH:mm:ss')
      }
    </p>
  </Nullable>
);

export default BreachTimeInfo;
