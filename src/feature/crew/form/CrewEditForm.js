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

  // flex flex-col justify-between

  return (
    <section className={'m-6 md:flex md:flex-row'}>
      <div className={'md:w-7/12 md:mr-6 xl:w-9/12'}>
        <div className={'lg:flex 2xl:w-2/3'}>
          <InputGroup className={'lg:w-5/12'} isRequired={true} twLabel={'text-bluewood text-base'} {...ctrl('name')} />
          <InputGroup className={'mt-6 lg:mt-0 lg:ml-6 lg:w-3/12'} isRequired={true} twLabel={'text-bluewood text-base'} {...ctrl('shortName')} />
          <InputGroup className={'mt-6 lg:mt-0 lg:ml-6 lg:w-4/12'} twLabel={'text-bluewood text-base'} {...ctrl('deviceId')} />
        </div>
        <div className={'mt-6 2xl:w-2/3'}>
          <h2 className={'font-bold'}>{t('title.automaticAssignment')}</h2>
          <div className={'lg:flex'}>
            <CheckBox className={'px-0 mt-6 lg:mr-6 lg:flex lg:items-center lg:w-5/12'} twLabel={'text-bluewood text-base'} {...ctrl('assignAutomatically')} />
            <InputGroup className={'mt-6 lg:mr-6 lg:w-4/12'} twLabel={'text-bluewood text-base'} {...ctrl('phoneNumber')} />
            <InputGroup className={'mt-6 lg:w-3/12'} twLabel={'text-bluewood text-base'} {...ctrl('callAfter')} />
          </div>
          <CheckBox className={'px-0 mt-6'} twLabel={'text-bluewood text-base'} {...ctrl('assignWhileInBreaks')} />
        </div>
        <CalendarTimeline
          title={t('title.dislocationZoneSchedule')}
          actionButtonTitle={t('button.addZone')}

          columnsTimeInterval={4}
          events={events}
          setEvents={setEvents}
        />
        <button className={'mt-6 py-4 w-full rounded-sm text-center bg-brick text-white'}>
          {t('button.delete')}
        </button>
      </div>
      <div className={'mt-6 flex flex-col w-full h-full aspect-square md:w-5/12 md:mt-0 md:aspect-auto md:h-screen xl:w-3/12'}>
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
    </section>
  );
};

export default CrewEditLayout;
