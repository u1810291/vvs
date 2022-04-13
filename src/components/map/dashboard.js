import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  Polygon,
  DirectionsRenderer,
  DrawingManager,
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

const center2 = {
  lat: 56.00,
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
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [path, setPath] = useState([
    { lat: 55.95000000000000, lng: 23.33300000000000 },
    { lat: 56.00000000000000, lng: 23.43300000000000 },
    { lat: 55.95000000000000, lng: 23.53300000000000 },
  ]);

  const originRef = useRef();
  const destinationRef = useRef();

async function calculateRoute() { // sez undefined
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
  }
  const directionService = new google.maps.DirectionsService();
  const results = await directionService.route({
    origin: originRef.current.value,
    destination: destinationRef.current.value,
    travelMode: google.maps.TravelMode.DRIVING,
  })
  setDirectionsResponse(results);
  setDistance(results.routes[0].legs[0].distance.text);
  setDuration(results.routes[0].legs[0].duration.text);
}

function clearRoute() {
  setDirectionsResponse(null);
  setDistance('');
  setDuration('');
  originRef.current.value = ""
  destinationRef.current.value = ""
}

  const onMapClick = useCallback((e) => {
    // console.log(e);
    calculateRoute();
    // calculateRoute is for routes service. ClearRoute() to clear
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

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEditPolygon = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoadPolygon = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEditPolygon),
        path.addListener("insert_at", onEditPolygon),
        path.addListener("remove_at", onEditPolygon)
      );
    },
    [onEditPolygon]
  );

  // Clean up refs
  const onUnmountPolygon = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

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
            <Marker position={center} ref={originRef}/>
            <Marker position={center2} ref={destinationRef}/>
            {clickedPos.lat ? (
              <Marker icon={markerIcon} position={clickedPos} />
            ) : null}
            <></>
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
            <Polygon
              // Make the Polygon editable / draggable
              editable
              draggable
              path={path}
              // Event used when manipulating and adding points
              onMouseUp={onEditPolygon}
              // Event used when dragging the whole Polygon
              onDragEnd={onEditPolygon}
              onLoad={onLoadPolygon}
              onUnmount={onUnmountPolygon}
            />
          </GoogleMap>
        </div>
      ) : null}
    </>
  );
};

export default DashboardMap;
