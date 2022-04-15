import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  Polygon,
  Polyline,
  DirectionsRenderer,
  DrawingManager,
  OverlayView,
} from "@react-google-maps/api";
import { StandardMap } from "../../feature/mapStandard";
import useLanguage from "../../hook/useLanguage";
import { generate } from "shortid";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 55.95,
  lng: 23.33,
};

const overLayView1 = {
  lat: 55.92,
  lng: 23.46,
};

const overLayView2 = {
  lat: 55.9,
  lng: 23.42,
};

const overLayView3 = {
  lat: 55.89,
  lng: 23.41,
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

const polygonSetup = {
  strokeOpacity: 0.8,
  strokeColor: "red",
  fillColor: "red",
};

const polygonBlack = {
  strokeOpacity: 0.8,
  strokeColor: "black",
  fillColor: "black",
};

const getCrewIcons = (icons) => {
  try {
    switch (icons) {
      case 1:
        icons.crew === "T3";
        return require("../../assets/assets/origin.png");
        // eslint-disable-next-line no-unreachable
        break;
      case 2:
        icons.crew === "T3";
        return require("../../assets/assets/origin.png");
        // eslint-disable-next-line no-unreachable
        break;
      default:
        return require("../../assets/assets/origin.png");
    }
  } catch (e) {
    console.log(e);
  }
};

const getDestinationIcons = (icons) => {
  try {
    switch (icons) {
      case 1:
        icons.destination === "alert";
        return require("../../assets/assets/destination.png");
        // eslint-disable-next-line no-unreachable
        break;
      case 2:
        icons.destination === "alert";
        return require("../../assets/assets/destination.png");
        // eslint-disable-next-line no-unreachable
        break;
      default:
        return require("../../assets/assets/destination.png");
    }
  } catch (e) {
    console.log(e);
  }
};

const routesOptions = {
  strokeColor: "#ff2343",
  strokeOpacity: 0.8,
  strokeWeight: 5,
  clickable: true,
};

const DashboardMap = () => {
  const { english, lithuanian, t } = useLanguage();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [clickedPos, setClickedPos] = useState({});
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [path, setPath] = useState([
    { lat: 55.95, lng: 23.333 },
    { lat: 56.0, lng: 23.433 },
    { lat: 55.95, lng: 23.533 },
  ]);
  const [polygon, setPolygon] = useState([
    { lat: 55.95, lng: 23.3 },
    { lat: 55.9, lng: 23.35 },
    { lat: 55.85, lng: 23.3 },
  ]);
  const [originAndDestination, setOriginAndDestination] = useState([
    {
      crew: "T3",
      originLat: 55.95,
      originLon: 23.33,
      destination: "alert",
      destinationLat: 55.88,
      destinationLon: 23.4,
    },
    {
      crew: "T3",
      originLat: 55.96,
      originLon: 23.34,
      destination: "alert",
      destinationLat: 55.89,
      destinationLon: 23.41,
    },
    {
      crew: "T3",
      originLat: 55.97,
      originLon: 23.35,
      destination: "alert",
      destinationLat: 55.9,
      destinationLon: 23.42,
    },
    {
      crew: "T3",
      originLat: 55.98,
      originLon: 23.37,
      destination: "alert",
      destinationLat: 55.92,
      destinationLon: 23.46,
    },
  ]);

  const originRef = useRef();
  const destinationRef = useRef();
  originRef.current = originRef;
  destinationRef.current = destinationRef;

  // loop over here to get polyline routes
  async function calculateRoute() {
    if (originRef.current === "" || destinationRef.current === "") {
      return;
    }
    const directionService = new google.maps.DirectionsService();
    originAndDestination.map((item) => {
      const results = directionService.route(
        {
          // await
          origin: new window.google.maps.LatLng(item.originLat, item.originLon),
          destination: new window.google.maps.LatLng(
            item.destinationLat,
            item.destinationLon
          ),
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
          optimizeWaypoints: true,
        },
        function (response, status) {
          if (status === "OK") {
            const coords = response.routes[0].overview_path;
            setDirectionsResponse(coords);
          } else {
            console.log("Directions request failed due to " + status);
          }
        }
      );
    });
    // setDirectionsResponse(results);
    // setDistance(results.routes[0].legs[0].distance.text);
    // setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current = "";
    destinationRef.current = "";
  }

  const onMapClick = useCallback((e) => {
    // console.log(e);
    calculateRoute();
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
    googleMapsApiKey: "AIzaSyAva7V7oY8Hnv6bz1g8_PaWjFUWCmfHkbs",
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
console.log(directionsResponse);
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
            {/* <Marker position={center} ref={originRef} /> Do reverse geocoding instead */}
            {clickedPos.lat ? (
              <Marker icon={markerIcon} position={clickedPos} />
            ) : null}
            <></>
            {/* {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )} */}
            {directionsResponse && (
              <>
                {/* {directionsResponse.map((item, index) => { */}
                <Polyline
                  // path={{key: item, ...index}}
                  path={directionsResponse}
                  geodesic={true}
                  options={routesOptions}
                />
                ;{/* })} */}
              </>
            )}
            {originAndDestination.map((marker) => (
              <Marker
                key={generate()}
                // onMouseOver={toggle}
                // onMouseOut={toggle}
                icon={getCrewIcons(marker.crew)}
                position={
                  new window.google.maps.LatLng(
                    marker.originLat,
                    marker.originLon
                  )
                }
              />
            ))}
            {originAndDestination.map((marker) => (
              <Marker
                key={generate()}
                // onMouseOver={toggle}
                // onMouseOut={toggle}
                icon={getDestinationIcons(marker.destination)}
                position={
                  new window.google.maps.LatLng(
                    marker.destinationLat,
                    marker.destinationLon
                  )
                }
              />
            ))}
            <OverlayView
              position={overLayView1}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              getPixelPositionOffset={(width, height) => ({
                x: -(width / 2),
                y: -(height / 2),
              })}
            >
              <div
                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                className="flex text-light font-normal rounded-sm h-6 "
              >
                <div className="flex flex-row rounded-md bg-red-600 truncate items-center px-2">
                  <p className="text-white">Aliarmas 256 Zona</p>
                </div>
              </div>
            </OverlayView>
            <OverlayView
              position={overLayView3}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              getPixelPositionOffset={(width, height) => ({
                x: -(width / 2),
                y: -(height / 2),
              })}
            >
              <div
                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                className="flex text-light font-normal rounded-md text-light h-6 bg-white"
              >
                <div className="flex flex-row rounded-md bg-yellow-600 truncate items-center px-2">
                  <p className="text-white">grįžta</p>
                </div>
              </div>
            </OverlayView>
            <OverlayView
              position={overLayView2}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              getPixelPositionOffset={(width, height) => ({
                x: -(width / 2),
                y: -(height / 2),
              })}
            >
              <div
                // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                className="flex text-normal font-normal rounded-md w-52 h-6 bg-white"
              >
                <div className="flex flex-row rounded-md bg-red-600 truncate items-center px-2">
                  <p className="text-white">Ekipažas</p>
                </div>
                <div className="flex flex-row truncate items-center pl-2">
                  <p className="text-red-600">Įvykis + Objektas + Klientas</p>
                </div>
              </div>
            </OverlayView>
            <Polygon
              editable
              draggable
              options={polygonBlack}
              path={path}
              onMouseUp={onEditPolygon}
              onDragEnd={onEditPolygon}
              onLoad={onLoadPolygon}
              onUnmount={onUnmountPolygon}
            />
            <Polygon path={polygon} options={polygonSetup} />
          </GoogleMap>
        </div>
      ) : null}
    </>
  );
};

export default DashboardMap;
