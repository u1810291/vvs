import React, {useEffect, useState} from 'react';
import Timecode from 'react-timecode';
import Timer from 'react-timer-wrapper';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Polygon, Marker} from '@react-google-maps/api';

import Card from 'components/atom/Card';
import Nullable from 'components/atom/Nullable';

import Map from 'feature/map/component/Map';
// import DynamicIcon from 'feature/crew/component/CrewIcon';
import {useBreach} from 'feature/breach/api/breachEditApi';

import {POLYGON_OPTIONS_DISPLAY} from '../../map/polygon';
import {useGoogleApiContext} from '../../../context/google';

import {generate} from 'shortid';
import {map} from 'crocks/pointfree';
import {format, formatDuration, intervalToDuration} from 'date-fns';
import {getZonePath, getFlatNodes, transformNodeContract} from 'feature/breach/utils';

const BREACH_PATH_ICON = {
  path: 'M 1, 1 1, 1',
  scale: 10,
  strokeColor: '#404B5F'
};

const BreachEditForm = () => {
  const {id: breachId} = useParams();
  const {data} = useBreach(breachId);
  const [routes, setRoutes] = useState();
  const {t} = useTranslation('breach', {keyPrefix: 'edit'});
  const {googleMap, bounds, isLoaded} = useGoogleApiContext();
  const [breach, setBreach] = useState();

  useEffect(() => {
    setBreach(data);
  }, [data]);

  const zonePath = getZonePath(breach?.crew);
  const zoneCoordinates = getFlatNodes(breach?.crew);
  const breachPath = transformNodeContract(breach?.nodes.flat());

  console.log(breach?.nodes.flat())

  return (
    <section className={'md:flex md:flex-row flex-1'}>
      <div className={'md:w-7/12 xl:w-9/12'}>
        <Map
          zoom={14}
          path={breachPath}
          coordinates={zoneCoordinates}
          id={`breach-map-${breach?.id}`}
        >
          <Nullable on={zonePath}>
            {map(nodes =>
              <Polygon
                key={generate()}
                paths={nodes}
                options={POLYGON_OPTIONS_DISPLAY}
              />,
              zonePath
            )}
          </Nullable>
          <Nullable on={breachPath}>
            {map(nodes => {
                console.log(nodes)
                return <Marker
                  key={generate()}
                  icon={BREACH_PATH_ICON}
                  position={nodes[0]}
                />
              },
              breachPath
            )}
          </Nullable>
        </Map>
      </div>
      <div className={'flex flex-col w-full md:w-5/12 xl:w-3/12'}>
        <Card.Xs className={'shadow-none'}>
          <div className={'flex flex-row items-start w-full border-b border-border py-4 px-6'}>
            <div className={'flex flex-col mr-6'}>
              <p className={'text-regent mb-2'}>{t('field.time_outside_the_zone')}</p>
              <p className={'text-regent'}>{t('field.received_at')}</p>
            </div>
            <div className={'flex flex-col'}>
              <Nullable on={breach?.start_time && breach?.end_time}>
                <p className={'text-bluewood mb-2'}>
                  {
                    breach?.start_time && breach?.end_time &&
                    formatDuration(
                      intervalToDuration({
                        start: new Date(breach?.start_time),
                        end: new Date(breach?.end_time)
                      })
                    )
                  }
                </p>
                <p className={'text-bluewood'}>
                  {
                    breach?.start_time &&
                    format(new Date(breach?.start_time), 'Y-MM-d HH:mm')
                  }
                </p>
              </Nullable>
            </div>
          </div>
          <div className='flex flex-row items-center w-full border-b border-border py-4 px-6'>
            {/*<DynamicIcon*/}
            {/*  className={'mr-4'}*/}
            {/*  status={ctrl('crew').value?.status}*/}
            {/*  name={ctrl('crew').value?.name}*/}
            {/*/>*/}
            {/*<div className={'flex flex-col'}>*/}
            {/*  <p className='text-bluewood'>*/}
            {/*    {ctrl('crew').value?.name}*/}
            {/*  </p>*/}
            {/*  <p className='text-regent'>*/}
            {/*    {ctrl('crew').value?.driver_name}*/}
            {/*  </p>*/}
            {/*</div>*/}
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
