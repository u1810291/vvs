import React, {useState, useCallback} from 'react';

import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';

import Card from 'components/atom/Card';
import Nullable from 'components/atom/Nullable';

import BreachCrewStatus from 'feature/breach/components/BreachCrewStatus';
import BreachTimeInfo from 'feature/breach/components/BreachTimeInfo';

import {useTranslation} from 'react-i18next';

const BreachInfoCard = ({crew, start_time, end_time}) => {
  const {t} = useTranslation('breach', {keyPrefix: 'edit'});

  const [timer, setTimer] = useState({});

  const onTimerUpdate = useCallback(({time, duration}) => setTimer({time, duration}), [timer]);
  const {time, duration} = timer;

  return (
    <Card.Xs className={'shadow-none'}>
      <div className={'flex flex-row items-start w-full border-b border-border py-4 px-6'}>
        <div className={'flex flex-col mr-6'}>
          <p className={'text-regent mb-2'}>{t('field.time_outside_the_zone')}</p>
          <p className={'text-regent'}>{t('field.received_at')}</p>
        </div>
        <div className={'flex flex-col'}>
          <BreachTimeInfo start_time={start_time} end_time={end_time} />
        </div>
      </div>
      <div className='flex flex-row items-center w-full border-b border-border py-4 px-6'>
        <Nullable on={crew}>
          <BreachCrewStatus crew={crew} />
        </Nullable>
        <div className='ml-auto mt-auto flex justify-center w-16 border border-transparent rounded-sm text-xs font-normal text-bluewood bg-geyser'>
          <Timer active duration={Date.parse(end_time) - Date.parse(start_time)} onTimeUpdate={onTimerUpdate}/>
          <Timecode time={duration + time} format={'HH:mm:ss'} />
        </div>
      </div>
    </Card.Xs>
  )
};

export default BreachInfoCard;
