import React, {createContext, useContext, useCallback, useState, useMemo} from 'react';
import env from 'env';
import {useLoadScript} from '@react-google-maps/api';
import useMergeReducer from 'hook/useMergeReducer';
import {Maybe, maybeToAsync, pipe, chain, map, Async, getProp, curry} from 'crocks';

const Google = createContext(null);

/**
 * @typedef AsyncGeocode
 * @type {(request: google.maps.GeocoderRequest) => Async}
 */

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

  const mGoogleMaps = isLoaded ? Maybe.Just(google.maps) : Maybe.Nothing();

  const route = useMemo(() => curry((origin, destination) => (
    isLoaded ? 
    Async.fromPromise(() => new google.maps.DirectionsService().route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: false,
      optimizeWaypoints: true,
    }))()
    : Async.Rejected('google not initialized yet')
  )), [isLoaded]);

  /**
   * @type {AsyncGeocode}
   */
  const geocode = request => pipe(
    maybeToAsync('Google is not loaded'),
    map(maps => new maps.Geocoder()),
    chain(geocoder => Async.fromPromise(() => geocoder.geocode(request))()),
    chain(maybeToAsync('expected a prop "results"', getProp('results'))),
  )(mGoogleMaps);

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
        setBounds,
        googleMap,
        onMapLoad,
        ...options,
        setOptions,
        onMapUnmount,

        /**
         * @type {google.maps}
         */
        mGoogleMaps,

        /**
         * route :: LatLng -> LatLng -> Async<DirectionsResult>
         *
         * @type {(origin: google.maps.LatLng, destination: google.maps.LatLng) => Async<google.maps.DirectionsResult>}
         */
        route,
        geocode,
      }}
    >
      {children}
    </Google.Provider>
  );
};

/**
 * @type {() => {geocode: AsyncGeocode}}
 */
export const useGoogleApiContext = () => {
  const context = useContext(Google);
  if (context === undefined) {
    throw new Error('useGoogleApiContext must be used within a GoogleContextProvider');
  }
  return context;
};

export default GoogleContextProvider;
