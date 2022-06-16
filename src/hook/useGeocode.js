import {useCallback} from 'react';
import Geocode from 'react-geocode';

const useGeocode = () => {
  Geocode.setApiKey('AIzaSyDrrFTkiGRVHq66b-RwB1NiJ5eCkrDHWRU');
  const getCoordsByAddress = useCallback(async address => {
    try {
      const geo = await Geocode.fromAddress(address)
      return await geo.results[0].geometry.location;
    } catch (error) {
      console.log(error);
    }
  }, []);
  return {getCoordsByAddress}
};

export default useGeocode;

