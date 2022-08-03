import React, {useCallback, useEffect, useState} from 'react';
import Timecode from 'react-timecode';
import Timer from 'react-timer-wrapper';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Polygon, Marker} from '@react-google-maps/api';

import Card from 'components/atom/Card';
import Nullable from 'components/atom/Nullable';

import Map from 'feature/map/component/Map';
import DynamicIcon from 'feature/crew/component/CrewIcon';
import {useBreach} from 'feature/breach/api/breachEditApi';

import useResultForm, {FORM_FIELD} from 'hook/useResultForm';

import {POLYGON_OPTIONS_DISPLAY} from '../../map/polygon';
import {useGoogleApiContext} from '../../../context/google';

import {generate} from 'shortid';
import {and, ifElse, not} from 'crocks/logic';
import {constant} from 'crocks/combinators';
import {chain, option, map, reduce} from 'crocks/pointfree';
import {isObject, isEmpty, isArray, hasProps} from 'crocks/predicates';
import {pipe, safe, mapProps, getPath, getProp} from 'crocks';
import {format, formatDuration, intervalToDuration} from 'date-fns';

const BreachEditForm = () => {
  const {id} = useParams();
  const {data} = useBreach(id);
  const [routes, setRoutes] = useState();
  const {t} = useTranslation('breach', {keyPrefix: 'edit'});
  const {googleMap, bounds, isLoaded} = useGoogleApiContext();
  const {ctrl, result, setForm} = useResultForm({
    crew: FORM_FIELD.OBJECT({label: null, validator: () => true}),
    status: FORM_FIELD.TEXT({label: null, validator: () => true}),
    end_time: FORM_FIELD.TEXT({label: null, validator: () => true}),
    start_time: FORM_FIELD.TEXT({label: null, validator: () => true}),
    nodes: FORM_FIELD.ARRAY({label: null, validator: () => true})
  });

  useEffect(() => {
    pipe(
      safe(isObject),
      map(pipe(
        mapProps({
          end_time: String,
          start_time: String,
          crew: Object,
          nodes: Array
        }),
        setForm,
      ))
    )(data)
  }, [data]);

  let coods = []

  pipe(
    safe(and(not(isEmpty), isObject)),
    chain(getPath(['zone'])),
    option([]),
    safe(constant(isLoaded)),
    map(map(map(map(map(coords => {
      coods.push(coords)
      bounds?.extend(coords);
    })))))
  )(ctrl('crew').value);

  const directionsCallback = useCallback((response) =>
    pipe(
      safe(not(isEmpty)),
      chain(getProp('status')),
      map(status => status === 'OK'
        ? setRoutes(() => (response))
        : console.warn('response: ', response)
      ),
    )(response), []);

  const polygons =
    pipe(
      safe(and(not(isEmpty), isObject)),
      chain(getPath(['zone'])),
      option([]),
      map(({nodes}) => nodes),
    )(ctrl('crew').value);

  const isNodeArrayValid = and(isArray, a => a.every(hasProps(['latitude', 'longitude'])));

  const transformNode = map(({latitude, longitude}) => ({
    lat: latitude,
    lng: longitude
  }));

  const transformNodes = pipe(
    safe(isArray),
    map(reduce((carry, b) => ifElse(
      isNodeArrayValid,
      item => [...carry, transformNode(item)],
      constant(carry),
      b
    ), [])),
  );

  const transformNodeContract = pipe(
    safe(isArray),
    map(reduce((carry, a) => [
      ...carry,
      ...transformNodes(a).option([]),
    ], [])),
    option([]),
  );

  const breachPath = transformNodeContract(ctrl('nodes').value.flat());

  const origin = [55.96180703337066, 23.32430656345794];
  const destination = [55.95347994389237, 23.28757917959692];

  return (
    <section className={'md:flex md:flex-row flex-1'}>
      <div className={'md:w-7/12 xl:w-9/12'}>
        <Map
          id='breach-map'
          zoom={14}
          coods={coods}
          breachPath={breachPath}
        >
          <Nullable on={polygons}>
            {map(nodes => <Polygon key={generate()} paths={nodes} options={POLYGON_OPTIONS_DISPLAY} />, polygons)}
          </Nullable>
          <Nullable on={breachPath}>
            {map(nodes => <Marker key={generate()} position={nodes[0]} />, breachPath)}
          </Nullable>
          {/*<Nullable on={origin && destination}>*/}
          {/*  <DirectionsService*/}
          {/*    options={{*/}
          {/*      origin: new google.maps.LatLng(...origin),*/}
          {/*      destination: new google.maps.LatLng(...destination),*/}
          {/*      travelMode: google.maps.TravelMode.DRIVING,*/}
          {/*    }}*/}
          {/*    callback={directionsCallback}*/}
          {/*  />*/}
          {/*</Nullable>*/}
          {/*<Nullable on={routes}>*/}
          {/*  <DirectionsRenderer options={{*/}
          {/*    directions: routes,*/}
          {/*    suppressMarkers: true,*/}
          {/*    polylineOptions: {*/}
          {/*      icons: [*/}
          {/*        {*/}
          {/*          icon: {*/}
          {/*            path: 'M 1, 1 1, 1',*/}
          {/*            strokeOpacity: 100,*/}
          {/*            scale: 8,*/}
          {/*            strokeColor: '#404B5F'*/}
          {/*          },*/}
          {/*          repeat: '20px',*/}
          {/*        }*/}
          {/*      ]}}}*/}
          {/*  />*/}
          {/*</Nullable>*/}
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
              name={ctrl('crew').value?.name}
            />
            <div className={'flex flex-col'}>
              <p className='text-bluewood'>
                {ctrl('crew').value?.name}
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
