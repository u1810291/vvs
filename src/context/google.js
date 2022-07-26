import React, {createContext, useContext, useCallback, useState} from 'react';
import env from 'env';
import {useLoadScript} from '@react-google-maps/api';
import useMergeReducer from 'hook/useMergeReducer';

const Google = createContext(null);

const GoogleContextProvider = ({children}) => {
  const [googleMap, setMap] = useState();
  const [bounds, setBounds] = useState();
  const [options, setOptions] = useMergeReducer({
    libraries: ['drawing']
  });
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: env.GOOGLE_MAPS_API_KEY,
    libraries: options.libraries
  });

  const onMapLoad = useCallback(map => {
    const newBounds = new google.maps.LatLngBounds();
    setBounds(newBounds);
    map.fitBounds(newBounds);
    setMap(map);
  }, []);
  const onMapUnmount = useCallback(() => {
    setMap(null);
    setBounds(null);
  }, []);
  return (
    <Google.Provider
      value={{
        bounds,
        isLoaded,
        loadError,
        googleMap,
        onMapLoad,
        ...options,
        setOptions,
        onMapUnmount,
      }}
    >
      {children}
    </Google.Provider>
  );
};

export const useGoogleApiContext = () => {
  const context = useContext(Google);
  if (context === undefined) {
    throw new Error('useGoogleApiContext must be used within a GoogleContextProvider');
  }
  return context;
};

export default GoogleContextProvider;
