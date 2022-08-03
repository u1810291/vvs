import React from 'react';
import Nullable from 'components/atom/Nullable';
import {DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import {directionsCallback} from 'feature/directions-service/api/directionsCallback';

const MyComponent = ({origin, destination, routes}) => {
  return (
    <div>
      <Nullable on={origin && destination}>
        <DirectionsService
          options={{
            origin: new google.maps.LatLng(...origin),
            destination: new google.maps.LatLng(...destination),
            travelMode: new google.maps.TravelMode.DRIVING,
          }}
          callback={directionsCallback}
        />
      </Nullable>
      <Nullable on={routes}>
        <DirectionsRenderer options={{
          directions: routes,
          suppressMarkers: true,
          polylineOptions: {
            icons: [
              {
                icon: {
                  path: 'M 1, 1 1, 1',
                  strokeOpacity: 100,
                  scale: 10,
                  strokeColor: '#404B5F'
                },
                repeat: '20px',
              }
            ]}}}
        />
      </Nullable>
    </div>
  );
};

export default MyComponent;
