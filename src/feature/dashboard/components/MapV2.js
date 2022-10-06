import React from 'react';
import Nullable from 'components/atom/Nullable';
import Map from 'feature/map/component/Map';
import Polygon from 'feature/map/component/Polygon';
import {Marker, OverlayView} from '@react-google-maps/api';

export default function MapV2({zonePaths, crewId, zoneCoordinates, destinations = []}) {
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
          {destinations.map((el)=>(
            <OverlayView
              key={el.id}
              position={el}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={(width, height) => ({
                x: -(width / 2),
                y: -(height / 2),
              })}
            >
            <Marker
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#f37e17',
                fillOpacity: 1,
                strokeWeight: 1
              }}
              position={el}
            />
            </OverlayView>
          ))}
        </Map>
      </Nullable>
  )
}
