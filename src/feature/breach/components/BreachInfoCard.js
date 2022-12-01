import React from 'react';
import Card from 'components/atom/Card';
import Nullable from 'components/atom/Nullable';
import BreachCrewStatus from 'feature/breach/components/BreachCrewStatus';
import BreachTimeInfo from 'feature/breach/components/BreachTimeInfo';
import {useTranslation} from 'react-i18next';
import BreachTimer from './BreachTimer';

const BreachInfoCard = ({breach}) => {
  const {t} = useTranslation('breach', {keyPrefix: 'edit'});

  return (
    <Card.Xs className={'shadow-none'}>
      <div className={'flex flex-row items-start w-full border-b border-border py-4 px-6'}>
        <div className={'flex flex-col mr-6'}>
          <p className={'text-regent text-[13px] mb-2'}>{t('field.time_outside_the_zone')}</p>
          <p className={'text-regent text-[13px]'}>{t('field.received_at')}</p>
        </div>
        <div className={'flex flex-col'}>
          <BreachTimeInfo breach={breach} />
        </div>
      </div>
      <div className='flex flex-row items-start justify-between w-full border-b border-border py-4 px-6'>
        <Nullable on={breach?.crew && breach?.driver}>
          <BreachCrewStatus breach={breach} />
        </Nullable>
        
        <Nullable on={!breach?.end_time}>
          <BreachTimer breach={breach} />
        </Nullable>
      </div>
    </Card.Xs>
  )
};

export default BreachInfoCard;
