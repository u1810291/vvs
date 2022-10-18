import ENV from 'env';
import {useCallback} from 'react';
import Geocode from 'react-geocode';

const useGeocode = () => {
  Geocode.setApiKey(ENV.GOOGLE_MAPS_API_KEY);
  const getCoordsByAddress = useCallback(async address => {
    const geo = await Geocode.fromAddress(address)
    return await geo.results[0].geometry.location;
  }, []);
  return {getCoordsByAddress}
};

export default useGeocode;

