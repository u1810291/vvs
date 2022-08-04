import React from 'react';
import {useParams} from 'react-router-dom';

import {useGoogleApiContext} from 'context/google';

import Nullable from 'components/atom/Nullable';

import Map from 'feature/map/component/Map';
import {useBreach} from 'feature/breach/api/breachEditApi';
import BreachMarker from 'feature/breach/components/BreachMarker';
import BreachPolygon from 'feature/breach/components/BreachPolygon';
import BreachInfoCard from 'feature/breach/components/BreachInfoCard';
import {getZoneItems, getFlatNodes, transformNodeContract} from 'feature/breach/utils';

const BreachEditForm = () => {
  const {id: breachId} = useParams();
  const {googleMap, bounds, isLoaded} = useGoogleApiContext();
  const {crew, nodes, start_time, end_time} = useBreach(breachId);

  const zonePath = getZoneItems(crew);
  const zoneCoordinates = getFlatNodes(crew);
  const breachPath = transformNodeContract([nodes]);

  return (
    <section className={'md:flex md:flex-row flex-1'}>
      <div className={'md:w-7/12 xl:w-9/12'}>
        <Map
          path={breachPath}
          coordinates={zoneCoordinates}
          id={`breach-map-${breachId}`}
        >
          <Nullable on={breachPath}>
            <BreachMarker breachPath={breachPath} />
          </Nullable>
          <Nullable on={zonePath}>
            <BreachPolygon zonePath={zonePath} />
          </Nullable>
        </Map>
      </div>
      <div className={'flex flex-col w-full md:w-5/12 xl:w-3/12'}>
        <BreachInfoCard crew={crew} start_time={start_time} end_time={end_time} />
      </div>
    </section>
  );
};

export default BreachEditForm;
