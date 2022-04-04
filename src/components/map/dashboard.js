import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { StandardMap } from "../../feature/mapStandard";
import useLanguage from "../../hook/useLanguage";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 55.95,
  lng: 23.33,
};

const option = {
  styles: StandardMap,
  disableDefaultUI: true,
  zoomControl: true,
};

const markerIcon = {
  title: "",
  path: "M20.325 22.1125C20.325 22.6093 19.9218 23.0125 19.425 23.0125C18.9282 23.0125 18.525 22.6093 18.525 22.1125C18.525 21.6157 18.9282 21.2125 19.425 21.2125C19.9218 21.2125 20.325 21.6157 20.325 22.1125ZM24.6 29.2H17.4V15.7C17.4 15.2032 17.8032 14.8 18.3 14.8H23.7C24.1968 14.8 24.6 15.2032 24.6 15.7V29.2ZM29.1 29.2H26.4V14.8C26.4 13.8055 25.5945 13 24.6 13H17.4C16.4064 13 15.6 13.8055 15.6 14.8V29.2H12.9C12.4032 29.2 12 29.6032 12 30.1C12 30.5968 12.4032 31 12.9 31H29.1C29.5968 31 30 30.5968 30 30.1C30 29.6032 29.5968 29.2 29.1 29.2Z",
  fillColor: "#ffffff",
};

const DashboardMap = () => {
  const { english, lithuanian, t } = useLanguage();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [clickedPos, setClickedPos] = useState({});

  const onMapClick = useCallback((e) => {
    // console.log(e);
    setClickedPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  }, []);

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback(map) {
    mapRef.current = null;
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCM9HFBcLjd0qeL0dgtFwOpeqUWy-aAB5M",
  });

  return (
    <>
      {isLoaded ? (
        <div className="w-6/12 h-full">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={onMapClick}
          >
            {clickedPos.lat ? (
              <Marker icon={markerIcon} position={clickedPos} />
            ) : null}
            <></>
          </GoogleMap>
        </div>
      ) : null}
    </>
  );
};

export default DashboardMap;
