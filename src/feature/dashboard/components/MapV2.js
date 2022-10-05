import React from 'react';
import Nullable from 'components/atom/Nullable';
import Map from 'feature/map/component/Map';
import Polygon from 'feature/map/component/Polygon';
import {OverlayView} from '@react-google-maps/api';
import MarkerTag from 'components/atom/icon/MarkerTag';

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
              <MarkerTag
                label={'some object'}
                labelBodyTw={'bg-red-600'}
              />
            </OverlayView>
          ))}
        </Map>
      </Nullable>
  )
}
