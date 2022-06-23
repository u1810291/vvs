import React, {createContext, useContext, useCallback, useRef} from 'react';
import env from '../env';
import {useLoadScript} from '@react-google-maps/api';
import useMergeReducer from '../hook/useMergeReducer';

const Google = createContext(null);

const GoogleContextProvider = ({children}) => {
  const [state, setValue] = useMergeReducer({
    libraries: ['drawing'],
  });

  const {isLoaded, loadError} = useLoadScript({googleMapsApiKey: env.GOOGLE_MAPS_API_KEY, libraries: state.libraries});
  const mapRef = useRef(null);
  const onMapLoad = useCallback(map => mapRef.current = map, []);
  const onMapUnmount = useCallback(() => mapRef.current = null, []);
  return (
    <Google.Provider
      value={{...state, setValue, isLoaded, loadError, mapRef, onMapLoad, onMapUnmount}}
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
