import React, {useContext, useEffect, useState, useCallback, useRef} from "react";

import AuthContext from "../../../context/authContext";
import GlobalContext from "../../../context/globalContext";

import Map from "../../map/component/Map";
import Details from "../../../components/atom/Details";

import {OffCard} from "../../../components/cards/off";
import {DDAPI} from "../../../api/dashboardDispatchApi";

import useLanguage from "../../../hook/useLanguage";
import {Marker, OverlayView, Polygon, Polyline} from '@react-google-maps/api';
import getPathOr from 'crocks/helpers/getPathOr';
import {generate} from 'shortid';
import {and, isArray, map, pipe, safe} from 'crocks';
import DashboardSideLeft from '../../../components/sides/dashboardLeft';
import DashboardSideRight from '../../../components/sides/dashboardRight';
import CirclePointer from '../../../components/atom/CirclePointer';

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
        icons.crew = "T3";
        return require("../../../assets/assets/origin.png");
        // eslint-disable-next-line no-unreachable
        break;
      case 2:
        icons.crew = "T3";
        return require("../../../assets/assets/origin.png");
        // eslint-disable-next-line no-unreachable
        break;
      default:
        return require("../../../assets/assets/origin.png");
    }
  } catch (e) {
    console.log(e);
  }
};

const getDestinationIcons = (icons) => {
  try {
    switch (icons) {
      case 1:
        icons.destination = "alert";
        return require("../../../assets/assets/destination.png");
        // eslint-disable-next-line no-unreachable
        break;
      case 2:
        icons.destination = "alert";
        return require("../../../assets/assets/destination.png");
        // eslint-disable-next-line no-unreachable
        break;
      default:
        return require("../../../assets/assets/destination.png");
    }
  } catch (e) {
    console.log(e);
  }
};

const randomColor = () => {
  const randomize = Math.floor(Math.random() * 16777215).toString(16);
  const result = "#" + randomize;
  return result;
};

const routesOptions = {
  strokeColor: randomColor(),
  strokeOpacity: 0.8,
  strokeWeight: 5,
  clickable: true,
};

const DashboardForm = () => {
  const {t} = useLanguage();
  const {accessToken} = useContext(AuthContext);
  const {setGlobalToken} = useContext(GlobalContext);

  useEffect(() => {
    if (accessToken) {
      setGlobalToken(accessToken);
    }
  }, [accessToken]);

  const [directions, setDirections] = useState([]);
  const mapRef = useRef(null);
  const [_map, setMap] = useState(null);
  const [clickedPos, setClickedPos] = useState({});
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [singleDirectionsResponse, setSingleDirectionsResponse] = useState(null);
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
      routeColor: "#0000FF",
    },
    {
      crew: "T3",
      originLat: 55.96,
      originLon: 23.34,
      destination: "alert",
      destinationLat: 55.89,
      destinationLon: 23.41,
      routeColor: "#FF0000",
    },
    {
      crew: "T3",
      originLat: 55.97,
      originLon: 23.35,
      destination: "alert",
      destinationLat: 55.9,
      destinationLon: 23.42,
      routeColor: "#FFFF00",
    },
    {
      crew: "T3",
      originLat: 55.98,
      originLon: 23.37,
      destination: "alert",
      destinationLat: 55.92,
      destinationLon: 23.46,
      routeColor: "#006400",
    },
  ]);

  useEffect(() => {
    let results;
    const directionService = new google.maps.DirectionsService();
    pipe(
      safe(and(isArray, a => a.length > 0)),
      map(map(item => results = directionService.route({
          origin: new window.google.maps.LatLng(item.originLat, item.originLon),
          destination: new window.google.maps.LatLng(
            item.destinationLat,
            item.destinationLon
          ),
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
          optimizeWaypoints: true,
        }),
      )),
      map(ps => Promise.all(ps).then(setDirections)),
    )(originAndDestination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originAndDestination]);

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

  // bind refs to current Polygon and listeners
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

  // clean up refs
  const onUnmountPolygon = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  const google = window.google;
  return (
    <>
      <div className="flex min-h-full overflow-y-auto scrollbar-gone flex-col w-1/4 bg-gray-100">
        <DashboardSideLeft />
      </div>
      <div className="flex flex-col h-screen justify-between w-2/4 bg-gray-100">
        <Map>
          {clickedPos.lat ? (
            <Marker icon={markerIcon} position={clickedPos} />
          ) : null}
          <></>
          { // show first route from all directions
            directions?.map((d, index) => (
              <Polyline
                key={index}
                path={getPathOr(null, ['routes',0, 'overview_path'], d)}
                geodesic={true}
                options={routesOptions}
              />
            ))
          }
          {originAndDestination?.map((marker) => (
            <>
              <Marker
                key={generate()}
                icon={getCrewIcons(marker.crew)}
                position={
                  new window.google.maps.LatLng(
                    marker.originLat,
                    marker.originLon
                  )
                }
              />
              {/*<OverlayView*/}
              {/*  key={generate()}*/}
              {/*  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}*/}
              {/*  position={*/}
              {/*    new window.google.maps.LatLng(*/}
              {/*      marker.originLat,*/}
              {/*      marker.originLon*/}
              {/*    )*/}
              {/*  }*/}
              {/*>*/}
              {/*  <CirclePointer title={marker.crew}/>*/}
              {/*</OverlayView>*/}
            </>
          ))}
          {originAndDestination?.map((marker) => (
            <Marker
              key={generate()}
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
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}
          >
            <div
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
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}
          >
            <div
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
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}
          >
            <div className="flex text-normal font-normal rounded-md w-52 h-6 bg-white">
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
        </Map>
      </div>
      <div className="flex flex-col h-screen justify-between overflow-y-auto w-1/4 bg-gray-100">
        <DashboardSideRight title={t("eurocash.crew")} />
        <Details title={t("crew.status.offline")}>
          {DDAPI?.map((data) => (
            <OffCard
              id={data.id}
              key={data.id}
              crew={data.crew}
              name={data.name}
              event={data.event}
              status={data.status}
              inTask={data.inTask}
              inBreak={data.inBreak}
              askForBreak={data.askForBreak}
              connection={data.connection}
            />
          ))}
        </Details>
      </div>
    </>
  );
};

export default DashboardForm;