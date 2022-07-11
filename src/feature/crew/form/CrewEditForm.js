import React from 'react';

import Map from 'feature/map/component/Map';
import DynamicIcon from '../component/CrewIcon';
import Card from '../../../components/atom/Card';
import CheckBox from 'components/atom/input/CheckBox';
import InputGroup from 'components/atom/input/InputGroup';
import CalendarTimeline from 'components/CalendarTimeline/CalendarTimeline';

import {useTranslation} from 'react-i18next';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';

import {Polygon} from '@react-google-maps/api';
import {useCrewZones} from '../api/crewEditApi';

const polygonSetup = {
  strokeOpacity: 1,
  strokeWeight: 0.8,
  strokeColor: '#C32A2F',
  fillOpacity: 0.4,
  fillColor: '#C32A2F',
  clickable: true,
  draggable: true,
};

const polygon = [
  {lat: 55.95, lng: 23.3},
  {lat: 55.9, lng: 23.35},
  {lat: 55.85, lng: 23.3},];


const CrewEditLayout = () => {
  const {t} = useTranslation('crew', {keyPrefix: 'edit'});

  const {ctrl, result, setForm} = useResultForm({
    events: FORM_FIELD.EVENTS({label: t`field.events`, validator: () => true}),
    deviceId: FORM_FIELD.TEXT({label: t`field.deviceId`, validator: () => true}),
    shortName: FORM_FIELD.TEXT({label: t`field.shortName`, validator: () => true}),
    callAfter: FORM_FIELD.TEXT({label: t`field.callAfter`, validator: () => true}),
    phoneNumber: FORM_FIELD.TEXT({label: t`field.phoneNumber`, validator: () => true}),
    assignAutomatically: FORM_FIELD.BOOL({label: t`field.assignAutomatically`, validator: () => true}),
    assignWhileInBreaks: FORM_FIELD.BOOL({label: t`field.assignWhileInBreaks`, validator: () => true}),
  });

  const crewZones = useCrewZones(true);
  const mappedZones = crewZones.map(zone => ({key: zone.name, value: zone.id}));

  return (
    <section className={'m-6 md:flex md:flex-row'}>
      <div className={'md:w-7/12 md:mr-6 xl:w-9/12'}>
        <div className={'lg:flex 2xl:w-2/3'}>
          <InputGroup className={'mt-6 lg:mt-0 lg:w-3/12'} isRequired={true} twLabel={'text-bluewood text-base'} {...ctrl('shortName')} />
          <InputGroup className={'mt-6 lg:mt-0 lg:ml-6 lg:mt-0 lg:w-4/12'} twLabel={'text-bluewood text-base'} {...ctrl('deviceId')} />
        </div>
        <div className={'mt-6 2xl:w-2/3'}>
          <h2 className={'font-bold'}>{t('title.automaticAssignment')}</h2>
          <div className={'lg:flex'}>
            <CheckBox className={'px-0 mt-6 lg:mr-6 lg:mt-4 lg:flex lg:items-end lg:w-5/12'} twLabel={'text-bluewood text-base'} {...ctrl('assignAutomatically')} />
            <InputGroup className={'mt-6 lg:mr-6 lg:mt-4 lg:w-4/12'} twLabel={'text-bluewood text-base'} {...ctrl('phoneNumber')} />
            <InputGroup className={'mt-6 lg:mt-4 lg:w-3/12'} twLabel={'text-bluewood text-base'} {...ctrl('callAfter')} />
          </div>
          <CheckBox className={'px-0 mt-6 lg:mt-4 lg:items-end'} twLabel={'text-bluewood text-base'} {...ctrl('assignWhileInBreaks')} />
        </div>
        <CalendarTimeline
          title={t('title.dislocationZoneSchedule')}
          actionButtonTitle={t('button.addZone')}
          columnsTimeInterval={4}
          {...ctrl('events')}
          crewZones={mappedZones}
        />
        <button className={'mt-6 py-4 w-full rounded-sm text-center bg-brick text-white lg:w-52 lg:mt-4'}>
          {t('button.delete')}
        </button>
      </div>
      <div className={'mt-6 flex flex-col w-full h-full aspect-square md:w-5/12 md:mt-0 md:aspect-auto md:h-screen lg:-mt-6 lg:-mr-6 lg:-mb-6 xl:w-3/12'}>
        <Card.Sm className={'shadow-none'}>
          <div className='flex flex-row items-center w-full'>
            <DynamicIcon className={'mr-4'} name={'9'} status={'READY'} />
            <div className={'flex flex-col'}>
              <p className='text-bluewood'>9 GRE</p>
              <p className='text-regent'>Virginijus Siaurukas</p>
            </div>
          </div>
        </Card.Sm>
        <Map>
          <Polygon path={polygon} options={polygonSetup} />
        </Map>
      </div>
    </section>
  );
};

export default CrewEditLayout;
