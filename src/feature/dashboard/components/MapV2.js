import React from 'react';
import Nullable from 'components/atom/Nullable';
import Map from 'feature/map/component/Map';
import Polygon from 'feature/map/component/Polygon';


export default function MapV2({zonePath, crewId, zoneCoordinates}) {
  return (
    <Map
      zoom={12}
      path={zonePath}
      id={`crew-map-${crewId}`}
      coordinates={zoneCoordinates}
    >
      <Nullable on={zonePath}>
        <Polygon path={zonePath} />
      </Nullable>
    </Map>
  )
}
