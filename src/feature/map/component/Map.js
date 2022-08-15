import React, {memo, useEffect} from 'react';

import {GoogleMap} from '@react-google-maps/api';

import {compareMemo} from 'util/react';

import {useGoogleApiContext} from 'context/google';

import {map} from 'crocks/pointfree';

const LITHUANIA_COORDINATES = {
  lat: 55.437229,
  lng: 23.907873
};

const MAP_CONTAINER_STYLES = {
  width: '100%',
  height: '100%',
};

const Map = memo(({id, zoom, coordinates, path, children}) => {
  const {bounds, googleMap, isLoaded, onMapLoad, onMapUnmount, setBounds} = useGoogleApiContext();
  if (!isLoaded) return null;
  useEffect(() => {
    if (googleMap && bounds) {
      if (coordinates?.length) map(coordinate => bounds.extend(coordinate), coordinates);
      else if (!coordinates?.length) bounds.extend(LITHUANIA_COORDINATES);
      googleMap.setZoom(zoom || 7);
      setBounds(new google.maps.LatLngBounds());
      googleMap.setCenter({lat: bounds.getCenter().lat(), lng: bounds.getCenter().lng()});
    }
  }, [googleMap, coordinates, zoom]);

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
