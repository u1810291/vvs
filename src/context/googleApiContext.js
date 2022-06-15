import React, {createContext, useContext, useCallback, useRef} from "react";
import env from "../env";
import {useLoadScript} from "@react-google-maps/api";
import useMergeReducer from "../hook/useMergeReducer";

const GoogleApiContext = createContext(null);

const GoogleContextProvider = ({children}) => {
  const [state, setValue] = useMergeReducer({
    libraries: null,
  });
  const {isLoaded, loadError} = useLoadScript({googleMapsApiKey: env.GOOGLE_MAPS_API_KEY, libraries: state.libraries});
  const mapRef = useRef(null);
  const onMapLoad = useCallback(map => mapRef.current = map, []);
  const onMapUnmount = useCallback(() => mapRef.current = null, []);
  return (
    <GoogleApiContext.Provider
      /* eslint-disable-next-line react-perf/jsx-no-new-object-as-prop */
      value={{...state, setValue, isLoaded, loadError, mapRef, onMapLoad, onMapUnmount}}
    >
      {children}
    </GoogleApiContext.Provider>
  );
};

const useGoogleApiContext = () => {
  const context = useContext(GoogleApiContext);
  if (context === undefined) {
    throw new Error("useGoogleApiContext must be used within a GoogleContextProvider");
  }
  return context;
};

export {GoogleContextProvider, useGoogleApiContext};