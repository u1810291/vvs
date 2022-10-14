import React, {useMemo, useRef} from 'react';
import {useParams} from 'react-router-dom';

import {useBreach} from 'feature/breach/api/breachEditApi';
import BreachInfoCard from 'feature/breach/components/BreachInfoCard';
import {getZoneItems, getFlatNodes} from 'feature/breach/utils';
import {useGoogleApiContext} from 'context/google';
import {GoogleMap} from '@react-google-maps/api';
// import {pipe, isArray, safe, chain, option, map, getProp} from 'crocks';
// import {MapCrewIconMarker} from 'feature/crew/component/MapCrewIconMarker';



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

  const zonePath = getZoneItems(data?.crew);
  const zoneCoordinates = getFlatNodes(data?.crew);
  const breachPath = data?.nodes?.map(a => ({
    lat: a.latitude,
    lng: a.longitude,
  }));

  console.log(data, zonePath, zoneCoordinates, breachPath);

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
              {/* {
                pipe(
                  getProp('nodes'),
                  chain(safe(isArray)),
                  map(map((node) => <MapCrewIconMarker key={node[0]} {...getProp('crew', data)} />)),
                  option(null),
                )(data)
              } */}
            </GoogleMap>
          ) : null
        }
      </div>

      <div className={'flex flex-col w-full md:w-5/12 xl:w-3/12'}>
        <BreachInfoCard
          crew={data?.crew}
          driver={data?.driver}
          start_time={data?.start_time}
          end_time={data?.end_time}
        />
      </div>
    </section>
  );
};

export default BreachEditForm;
