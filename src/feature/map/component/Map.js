import React, {memo, useEffect} from 'react';
import {compareMemo} from 'util/react';
import {GoogleMap} from '@react-google-maps/api';
import {useGoogleApiContext} from 'context/google';
import {map} from 'crocks/pointfree';

const Map = memo(({id, coordinates, path, children}) => {
  const {bounds, googleMap, isLoaded, onMapLoad, onMapUnmount} = useGoogleApiContext();
  if (!isLoaded) return null;
  useEffect(() => {
    if (coordinates) {
      map(coordinate => bounds?.extend(coordinate) ,coordinates);
    }
    googleMap?.setCenter({
      lat: bounds?.getCenter().lat(),
      lng: bounds?.getCenter().lng(),
    })
    googleMap?.setZoom(14);
  }, [googleMap, coordinates])
  return (
    <div className='w-full h-full relative'>
      <GoogleMap
        id={id}
        onLoad={onMapLoad}
        onUnmount={onMapUnmount}
        mapContainerStyle={{
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </GoogleMap>
    </div>
  );
}, compareMemo(['id'], ['coordinates'], ['path']));

Map.displayName = 'Map';

export default Map;
