import BreachInfoCard from 'feature/breach/components/BreachInfoCard';
import Nullable from 'components/atom/Nullable';
import POLYGON_OPTIONS from 'feature/dislocation/constants';
import React, {useEffect, useMemo, useRef} from 'react';
import shortid from 'shortid';
import {GoogleMap, Polygon} from '@react-google-maps/api';
import {MapBreachNodeMarker} from '../components/MapBreachMarker';
import {getBreachLatLngLiteral} from 'feature/breach/utils';
import {getDislocationLatLngLiteral} from 'feature/dislocation/ultis';
import {useBreach} from 'feature/breach/api/breachEditApi';
import {useGoogleApiContext} from 'context/google';
import {useParams} from 'react-router-dom';
import {
  pipe, 
  isArray, 
  safe, 
  chain, 
  option, 
  map, 
  getProp,
  isTruthy,
  Maybe,
  reduce,
  alt, 
} from 'crocks';

const BREACH_PATH_ICON = {
  path: 'M 1, 1 1, 1',
  scale: 10,
  strokeColor: '#404B5F'
};

const BreachEditForm = () => {
  const {id: breachId} = useParams();
  const {data} = useBreach({id: breachId});
  const {isLoaded, mGoogleMaps} = useGoogleApiContext();
  const mapRef = useRef();

  const mMap = useMemo(() => (
    isLoaded ? safe(isTruthy, mapRef.current) : Maybe.Nothing()
  ), [isLoaded, mapRef.current])

  useEffect(() => {
    Maybe.of(map => m => breachLatLngs => dislocationNodes => {
      const bounds = new m.LatLngBounds();
      [...breachLatLngs, ...dislocationNodes].forEach(latLng => bounds.extend(latLng));
      map.fitBounds(bounds);
    })
    .ap(mMap)
    .ap(mGoogleMaps)
    .ap(
      pipe(
        getProp('nodes'),
        chain(safe(isArray)),
        map(reduce((carry, item) => (
          getBreachLatLngLiteral(item)
          .map(latLng => [...carry, latLng])
          .option(carry)
        ), [])),
        alt(Maybe.Just([]))
      )(data)
    )
    .ap(
      pipe(
        getProp('dislocation_nodes'),
        chain(safe(isArray)),
        map(a => a.flat()),
        map(reduce((carry, item) => (
          getDislocationLatLngLiteral(item)
          .map(latLng => [...carry, latLng])
          .option(carry)
        ), [])),
        alt(Maybe.Just([]))
      )(data)
    )
  }, [data, mGoogleMaps, mMap]);

  return (
    <section className={'md:flex md:flex-row flex-1'}>
      <div className='grow'>
        {isLoaded
          ? (
            <GoogleMap
              {...useMemo(() => ({
                mapContainerStyle: {width: '100%', height: '100%'},
                onLoad: map => {mapRef.current = map}
              }), [])}
            >
              <Nullable on={data?.nodes}>
                {
                  pipe(
                    getProp('nodes'),
                    chain(safe(isArray)),
                    map(map(node => <MapBreachNodeMarker key={shortid.generate()} {...node} />)),
                    option(null),
                  )(data)
                }
              </Nullable>

              {
                pipe(
                  getProp('dislocation_nodes'),
                  chain(safe(isArray)),
                  map(nodes => <Polygon key={data?.id} paths={nodes} options={POLYGON_OPTIONS} />),
                  option(null)
                )(data)
              }
            </GoogleMap>
          ) : null
        }
      </div>

      <div className={'flex flex-col w-full md:w-5/12 xl:w-3/12'}>
        <BreachInfoCard breach={data} />
      </div>
    </section>
  );
};

export default BreachEditForm;
