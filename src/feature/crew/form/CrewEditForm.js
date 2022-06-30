import React, {useState} from 'react';

import {ActiveCard} from '../../../components/obsolete/cards/active';

import Map from 'feature/map/component/Map';
import CheckBox from 'components/atom/input/CheckBox';
import InputGroup from 'components/atom/input/InputGroup';
import CalendarTimeline from 'components/CalendarTimeline/CalendarTimeline';

import {useTranslation} from 'react-i18next';
import useResultForm from 'hook/useResultForm';

import {Polygon} from '@react-google-maps/api';

import {always} from 'util/func';
import {generate} from 'shortid';
import {isEmpty, not} from 'crocks';

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
  {lat: 55.85, lng: 23.3},
];

const CrewEditLayout = () => {
  const {t} = useTranslation('crew', {keyPrefix: 'edit'});
  const [events, setEvents] = useState([]);

  const {ctrl, result, setForm} = useResultForm({
    name: {
      initial: '',
      validator: not(isEmpty),
      props: {
        value: ({value}) => value,
        onChange: ({set}) => ({target: {value}}) => set(value),
        label: always(t`field.name`),
        type: always('text'),
      }
    },
    shortName: {
      initial: '',
      validator: not(isEmpty),
      props: {
        value: ({value}) => value,
        onChange: ({set}) => ({target: {value}}) => set(value),
        label: always(t`field.shortName`),
        type: always('text'),
      }
    },
    deviceId: {
      initial: '',
      validator: not(isEmpty),
      props: {
        value: ({value}) => value,
        onChange: ({set}) => ({target: {value}}) => set(value),
        label: always(t`field.deviceId`),
        type: always('text'),
      }
    },
    assignAutomatically: {
      initial: false,
      validator: not(isEmpty),
      props: {
        value: ({value}) => value,
        onChange: ({set}) => ({target: {value}}) => set(value),
        label: always(t`field.assignAutomatically`),
        type: always('text'),
      }
    },
    phoneNumber: {
      initial: '',
      validator: not(isEmpty),
      props: {
        value: ({value}) => value,
        onChange: ({set}) => ({target: {value}}) => set(value),
        label: always(t`field.phoneNumber`),
        type: always('text'),
      }
    },
    callAfter: {
      initial: '',
      validator: not(isEmpty),
      props: {
        value: ({value}) => value,
        onChange: ({set}) => ({target: {value}}) => set(value),
        label: always(t`field.callAfter`),
        type: always('text'),
      }
    },
    assignWhileInBreaks: {
      initial: false,
      validator: not(isEmpty),
      props: {
        value: ({value}) => value,
        onChange: ({set}) => ({target: {value}}) => set(value),
        label: always(t`field.assignWhileInBreaks`),
        type: always('text'),
      }
    }
  });

  return (
    <section className={'mx-6 my-6 flex-auto flex'}>
      <div className={'w-full mt-4 flex flex-col xl:flex-row'}>
        <div className={'flex flex-col w-full xl:w-4/5'}>
          <div className={'flex w-full items-start mb-12 xl:w-1/2'}>
            <InputGroup className={'flex flex-col justify-between w-full mr-4 xl:w-2/5'} isRequired={true} twLabel={'text-bluewood text-base'} {...ctrl('name')} />
            <InputGroup className={'flex flex-col justify-between w-full mr-4 xl:w-2/5'} isRequired={true} twLabel={'text-bluewood text-base'} {...ctrl('shortName')} />
            <InputGroup className={'flex flex-col justify-between w-full mr-4 xl:w-2/5'} twLabel={'text-bluewood text-base'} {...ctrl('deviceId')} />
          </div>
          <div className={'flex flex-col w-full xl:w-1/2'}>
            <h2 className={'font-bold mb-2'}>{t('title.automaticAssignment')}</h2>
            <div className={'flex w-full justify-end'}>
              <CheckBox className={'w-full self-end mr-4 xl:w-2/5'} twLabel={'text-bluewood text-base'} {...ctrl('assignAutomatically')} />
              <InputGroup className={'flex w-full flex-col justify-between mr-4 xl:w-2/5'} twLabel={'text-bluewood text-base'} {...ctrl('phoneNumber')} />
              <InputGroup className={'flex w-full flex-col justify-between mr-4 xl:w-2/5'} twLabel={'text-bluewood text-base'} {...ctrl('callAfter')} />
            </div>
            <div className={'mt-4'}>
              <CheckBox className={'w-full self-end lg:w-2/5'} twLabel={'text-bluewood text-base'} {...ctrl('assignWhileInBreaks')} />
            </div>
          </div>
          <CalendarTimeline
            title={t('title.dislocationZoneSchedule')}
            actionButtonTitle={t('button.addZone')}
            columnsTimeInterval={4}
            events={events}
            setEvents={setEvents}
          />
          <button className={'bg-red-700 mt-6 py-4 px-20 text-white mt-auto mb-6 w-max rounded-sm'}>
            {t('button.delete')}
          </button>
        </div>
        <div className={'flex flex-col w-full h-screen xl:w-1/5 xl:h-full'}>
          <ActiveCard
            key={generate()}
            id={generate()}
            crew={'G9'}
            name={'9 GRE'}
            status={'online'}
            inBreak={false}
            inTask={true}
            askForBreak={false}
            connection={'Prarastas rišys'}
          />
          <Map>
            <Polygon path={polygon} options={polygonSetup} />
          </Map>
        </div>
      </div>
    </section>
  );
};

export default CrewEditLayout;
