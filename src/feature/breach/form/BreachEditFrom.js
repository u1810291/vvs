import React, {useEffect, useState} from 'react';

import Map from '../../map/component/Map';
import Card from '../../../components/atom/Card';
import DynamicIcon from '../../crew/component/CrewIcon';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import useResultForm, {FORM_FIELD} from '../../../hook/useResultForm';
import {pipe, map, safe, isObject, mapProps} from 'crocks';
import {useBreach} from '../api/breachEditApi';
import {format, formatDuration, intervalToDuration} from 'date-fns';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import {Polygon} from '@react-google-maps/api';

const polygonSetup = {
  strokeOpacity: 0.8,
  strokeColor: 'red',
  fillColor: 'red',
};

const BreachEditForm = () => {
  const {id} = useParams();
  const {data} = useBreach(id);
  const {t} = useTranslation('breach', {keyPrefix: 'edit'});
  const [polygon, setPolygon] = useState([
    {lat: 55.95, lng: 23.3},
    {lat: 55.9, lng: 23.35},
    {lat: 55.85, lng: 23.3},
  ]);
  const {ctrl, result, setForm} = useResultForm({
    crew: FORM_FIELD.OBJECT({label: null, validator: () => true}),
    status: FORM_FIELD.TEXT({label: null, validator: () => true}),
    end_time: FORM_FIELD.TEXT({label: null, validator: () => true}),
    start_time: FORM_FIELD.TEXT({label: null, validator: () => true})
  });

  useEffect(() => {
    pipe(
      safe(isObject),
      map(pipe(
        mapProps({
          end_time: String,
          start_time: String,
          crew: Object
        }),
        setForm,
      ))
    )(data)
  }, [data]);
  return (
    <section className={'md:flex md:flex-row'}>
      <div className={'md:w-7/12 xl:w-9/12'}>
        <Map>
          <Polygon path={polygon} options={polygonSetup} />
        </Map>
      </div>
      <div className={'flex flex-col w-full h-full aspect-square md:w-5/12 md:aspect-auto md:h-screen xl:w-3/12'}>
        <Card.Xs className={'shadow-none'}>
          <div className={'flex flex-row items-start w-full border-b border-border py-4 px-6'}>
            <div className={'flex flex-col mr-6'}>
              <p className={'text-regent mb-2'}>{t('field.time_outside_the_zone')}</p>
              <p className={'text-regent'}>{t('field.received_at')}</p>
            </div>
            <div className={'flex flex-col'}>
              <p className={'text-bluewood mb-2'}>
                {
                  ctrl('start_time').value && ctrl('end_time').value &&
                    formatDuration(
                      intervalToDuration({
                        start: new Date(ctrl('start_time').value),
                        end: new Date(ctrl('end_time').value)
                      })
                    )
                }
              </p>
              <p className={'text-bluewood'}>
                {
                  ctrl('start_time').value &&
                    format(new Date(ctrl('start_time').value), 'Y-MM-d HH:mm')
                }
              </p>
            </div>
          </div>
          <div className='flex flex-row items-center w-full border-b border-border py-4 px-6'>
            <DynamicIcon
              className={'mr-4'}
              status={ctrl('crew').value?.status}
              name={ctrl('crew').value?.crew_name}
            />
            <div className={'flex flex-col'}>
              <p className='text-bluewood'>
                {ctrl('crew').value?.crew_name}
              </p>
              <p className='text-regent'>
                {ctrl('crew').value?.driver_name}
              </p>
            </div>
            <div className='ml-auto mt-auto flex justify-center w-16 border border-transparent rounded-sm text-xs font-normal text-bluewood bg-geyser'>
              <Timer active duration={null}>
                <Timecode />
              </Timer>
            </div>
          </div>
        </Card.Xs>
      </div>
    </section>
  );
};

export default BreachEditForm;
