import React, {memo, useEffect} from 'react';

import {GoogleMap} from '@react-google-maps/api';

import {compareMemo} from 'util/react';

import {useGoogleApiContext} from 'context/google';

import {map} from 'crocks/pointfree';

const MAP_CONTAINER_STYLES = {
  width: '100%',
  height: '100%',
};

const Map = memo(({id, zoom, coordinates, path, children}) => {
  const {bounds, googleMap, isLoaded, onMapLoad, onMapUnmount} = useGoogleApiContext();
  if (!isLoaded) return null;
  useEffect(() => {
    if (coordinates) map(coordinate => bounds?.extend(coordinate) ,coordinates);
    if (googleMap) googleMap?.setZoom(zoom || 14);
    if (googleMap && bounds) {
      googleMap?.setCenter({
        lat: bounds?.getCenter().lat(),
        lng: bounds?.getCenter().lng(),
      })
    }
  }, [googleMap, coordinates])
  return (
    <div className='w-full h-full relative'>
      <GoogleMap
        id={id}
        onLoad={onMapLoad}
        onUnmount={onMapUnmount}
        mapContainerStyle={MAP_CONTAINER_STYLES}
      >
        {children}
      </GoogleMap>
    </div>
  );
}, compareMemo(['id'], ['coordinates'], ['path']));

Map.displayName = 'Map';

export default Map;
