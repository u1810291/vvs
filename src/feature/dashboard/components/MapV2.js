import React from 'react';
import Nullable from 'components/atom/Nullable';
import Map from 'feature/map/component/Map';
import Polygon from 'feature/map/component/Polygon';


export default function MapV2({zonePaths, crewId, zoneCoordinates}) {
  return (
      <Nullable on={zonePaths}>
        <Map
          zoom={12}
          path={zonePaths && zonePaths[0]}
          id={`crew-map-${crewId}`}
          coordinates={zoneCoordinates && zoneCoordinates[4]}
        >
          {zonePaths?.map((el)=>(
            <Polygon key={el.lat} path={el} />
          ))}
        </Map>
      </Nullable>
  )
}
