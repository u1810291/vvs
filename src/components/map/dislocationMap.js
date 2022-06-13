import React, {useCallback, useRef} from "react";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import useLanguage from "../../hook/useLanguage";
import GoogleMapTools from "./googleMapTools";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const mapCenter = {
  lat: 55.95,
  lng: 23.33,
};

const DislocationMap = ({mapTools}) => {
  const mapRef = useRef(null);
  const {english, lithuanian, t} = useLanguage();
  
  const onMapLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onMapUnmount = useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  const {isLoaded : isMapLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyAva7V7oY8Hnv6bz1g8_PaWjFUWCmfHkbs",
    libraries: ["drawing"]
  });

  return isMapLoaded ? (
    <div className="w-full h-full relative">
      <GoogleMap
        zoom={14}
        center={mapCenter}
        onLoad={onMapLoad}
        onUnmount={onMapUnmount}
        mapContainerStyle={mapContainerStyle}
      >
         {/* <GoogleMapTools onMapLoad={onMapLoad}/> */}
      </GoogleMap>
    </div>
  ) : <></>
};

export default DislocationMap;
