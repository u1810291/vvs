import React from 'react';
import {useParams} from 'react-router-dom';
import Nullable from 'components/atom/Nullable';
import Map from 'feature/map/component/Map';
import {useBreach} from 'feature/breach/api/breachEditApi';
import BreachInfoCard from 'feature/breach/components/BreachInfoCard';
import {getZoneItems, getFlatNodes} from 'feature/breach/utils';
import Marker from '../../map/component/Marker';
import Polygon from '../../map/component/Polygon';

const BREACH_PATH_ICON = {
  path: 'M 1, 1 1, 1',
  scale: 10,
  strokeColor: '#404B5F'
};

const BreachEditForm = () => {
  const {id: breachId} = useParams();
  const {data} = useBreach({id: breachId});

  const zonePath = getZoneItems(data?.crew);
  const zoneCoordinates = getFlatNodes(data?.crew);
  const breachPath = data?.nodes?.map(a => ({
    lat: a.latitude,
    lng: a.longitude,
  }));

  return (
    <section className={'md:flex md:flex-row flex-1'}>
      <div className={'md:w-7/12 xl:w-9/12'}>
        <Map
          path={breachPath}
          coordinates={zoneCoordinates}
          id={`breach-map-${breachId}`}
        >
          <Nullable on={breachPath}>
            <Marker path={breachPath} icon={BREACH_PATH_ICON} />
          </Nullable>
          <Nullable on={zonePath}>
            <Polygon path={zonePath} />
          </Nullable>
        </Map>
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
