import React from 'react';
import {GoogleMap} from '@react-google-maps/api';
import {useGoogleApiContext} from '../../../context/google';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapCenter = {
  lat: 55.95,
  lng: 23.33,
};

const Map = ({singleMarkerCoords, children}) => {
  const {isLoaded, onMapLoad, onMapUnmount} = useGoogleApiContext();
  if (!isLoaded) return null;
  return (
    <div className='w-full h-full relative'>
      <GoogleMap
        zoom={14}
        center={singleMarkerCoords || mapCenter}
        onLoad={onMapLoad}
        onUnmount={onMapUnmount}
        mapContainerStyle={mapContainerStyle}
      >
        {children}
      </GoogleMap>
    </div>
  );
};

export default Map;
