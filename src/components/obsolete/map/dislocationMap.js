import React, {useCallback, useRef, useState, useContext, useEffect} from 'react';
import {GoogleMap, useLoadScript, Polygon} from '@react-google-maps/api';
import useLanguage from '../../../hook/useLanguage';
import GoogleMapTools from '../../../feature/map/component/GoogleMapTools';
import GlobalContext from '../../context/globalContext';
import {crewZonesQuery} from '../../../mocks/queryForms/queryString/query';
import {generate} from 'shortid';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapCenter = {
  lat: 55.95,
  lng: 23.33,
};

const options = {
  fillColor: 'lightblue',
  fillOpacity: 1,
  strokeColor: 'red',
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

const lib = ['drawing'];

const DislocationMap = ({mapTools}) => {
  const {accessToken} = useContext(GlobalContext);
  const mapRef = useRef(null);
  const {english, lithuanian, t} = useLanguage();
  const [error, setError] = useState('');
  const {removeZone, setRemoveZone} = useContext(GlobalContext);
  const {polygonsData, setPolygonsData} = useContext(GlobalContext);
  const {individualPolygonsData, setIndividualPolygonsData} = useContext(GlobalContext);
  const {polygonsVisible, setPolygonsVisible} = useContext(GlobalContext);
  const polygonDataRef = useRef([]);

  const data = useReactQuery(crewZonesQuery, {}, accessToken);

  useEffect(() => {
    if (data.data) {
      setPolygonsData(data?.data?.crew_zone);
    }
  },[data.data])

  useEffect(() => {
    polygonDataRef.current = individualPolygonsData
  },[individualPolygonsData])

  const onMapLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onMapUnmount = useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  const {isLoaded: isMapLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: lib,
  });

    // Bind refs to current Polygon and listeners
    const onLoad = useCallback(
      polygon => {
        polygonDataRef.current = polygon;
      },
      []
    );

  return isMapLoaded ? (
    <div className='w-full h-full relative'>
      <GoogleMap
        zoom={14}
        center={mapCenter}
        onLoad={onMapLoad}
        onUnmount={onMapUnmount}
        mapContainerStyle={mapContainerStyle}
      >
        <GoogleMapTools onMapLoad={onMapLoad} />
        {polygonsData.map((polygon, index) => (
          <Polygon
            onLoad={onLoad}
            paths={polygon.nodes}
            options={options}
            key={generate()}
          />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(DislocationMap);
