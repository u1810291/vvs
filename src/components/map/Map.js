import React, {useCallback, useRef} from "react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
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

const Map = ({isMapTools, mapToolsLibraries, marker}) => {
  const {t} = useLanguage();
  const mapRef = useRef(null);

  const onMapLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onMapUnmount = useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  const {isLoaded : isMapLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyAva7V7oY8Hnv6bz1g8_PaWjFUWCmfHkbs",
    libraries: mapToolsLibraries
  });

  if (marker && marker.coords) {
    console.log(marker.coords)
  }

  return isMapLoaded ? (
    <div className="w-full h-full relative">
      <GoogleMap
        zoom={14}
        center={marker?.coords || mapCenter}
        onLoad={onMapLoad}
        onUnmount={onMapUnmount}
        mapContainerStyle={mapContainerStyle}
      >
        {marker && marker.coords && <Marker onLoad={onMapLoad} position={marker.coords}/>}
        {isMapTools && <GoogleMapTools onMapLoad={onMapLoad}/>}
      </GoogleMap>
    </div>
  ) : <></>
};

export default Map;
