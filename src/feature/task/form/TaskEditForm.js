import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';

import Map from '../../map/component/Map';
import TaskEditSideLeft from '../../../components/obsolete/sides/taskLeftSide';
import TaskEditSideRight from '../../../components/obsolete/sides/taskRightSide';


import useLanguage from '../../../hook/useLanguage';
import {Marker, OverlayView, Polygon, Polyline} from '@react-google-maps/api';

import {generate} from 'shortid';
import {and, isArray, map, pipe, safe, getPathOr} from 'crocks';
import MarkerTag from '../../../components/atom/icon/MarkerTag';
import {useGoogleApiContext} from '../../../context/google';
import {ATAPI} from 'mocks/tasks';

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
  title: '',
  path: 'M20.325 22.1125C20.325 22.6093 19.9218 23.0125 19.425 23.0125C18.9282 23.0125 18.525 22.6093 18.525 22.1125C18.525 21.6157 18.9282 21.2125 19.425 21.2125C19.9218 21.2125 20.325 21.6157 20.325 22.1125ZM24.6 29.2H17.4V15.7C17.4 15.2032 17.8032 14.8 18.3 14.8H23.7C24.1968 14.8 24.6 15.2032 24.6 15.7V29.2ZM29.1 29.2H26.4V14.8C26.4 13.8055 25.5945 13 24.6 13H17.4C16.4064 13 15.6 13.8055 15.6 14.8V29.2H12.9C12.4032 29.2 12 29.6032 12 30.1C12 30.5968 12.4032 31 12.9 31H29.1C29.5968 31 30 30.5968 30 30.1C30 29.6032 29.5968 29.2 29.1 29.2Z',
  fillColor: '#ffffff',
};

const polygonSetup = {
  strokeOpacity: 0.8,
  strokeColor: 'red',
  fillColor: 'red',
};

const polygonBlack = {
  strokeOpacity: 0.8,
  strokeColor: 'black',
  fillColor: 'black',
};

const getCrewIcons = (icons) => {
  try {
    switch (icons) {
      case 1:
        icons.crew = 'T3';
        return require('../../../assets/assets/origin.png');
        break;
      case 2:
        icons.crew = 'T3';
        return require('../../../assets/assets/origin.png');
        break;
      default:
        return require('../../../assets/assets/origin.png');
    }
  } catch (e) {
    console.log(e);
  }
};

const randomColor = () => {
  const randomize = Math.floor(Math.random() * 16777215).toString(16);
  const result = '#' + randomize;
  return result;
};

const routesOptions = {
  strokeColor: randomColor(),
  strokeOpacity: 0.8,
  strokeWeight: 5,
  clickable: true,
};

const TaskEditForm = ({data}) => {
  const {t} = useLanguage();
  const {isLoaded, onMapLoad, onMapUnmount} = useGoogleApiContext();
  const phoneNumbers = useMemo(() => data, [])
  console.log(phoneNumbers)

  const [directions, setDirections] = useState([]);
  const [clickedPos, setClickedPos] = useState({});
  const [path, setPath] = useState([
    {lat: 55.95, lng: 23.333},
    {lat: 56.0, lng: 23.433},
    {lat: 55.95, lng: 23.533},
  ]);
  const [polygon, setPolygon] = useState([
    {lat: 55.95, lng: 23.3},
    {lat: 55.9, lng: 23.35},
    {lat: 55.85, lng: 23.3},
  ]);
  const [originAndDestination, setOriginAndDestination] = useState([
    {
      crew: 'T3',
      originLat: 55.95,
      originLon: 23.33,
      destination: 'alert',
      destinationLat: 55.88,
      destinationLon: 23.4,
      routeColor: '#0000FF',
    },
    {
      crew: 'T3',
      originLat: 55.96,
      originLon: 23.34,
      destination: 'alert',
      destinationLat: 55.89,
      destinationLon: 23.41,
      routeColor: '#FF0000',
    },
    {
      crew: 'T3',
      originLat: 55.97,
      originLon: 23.35,
      destination: 'alert',
      destinationLat: 55.9,
      destinationLon: 23.42,
      routeColor: '#FFFF00',
    },
    {
      crew: 'T3',
      originLat: 55.98,
      originLon: 23.37,
      destination: 'alert',
      destinationLat: 55.92,
      destinationLon: 23.46,
      routeColor: '#006400',
    },
  ]);

  useEffect(() => {
    let results;
    if (!isLoaded) return;
    const directionService = new google.maps.DirectionsService();
    pipe(
      safe(and(isArray, a => a.length > 0)),
      map(map(item => results = directionService.route({
          origin: new google.maps.LatLng(item.originLat, item.originLon),
          destination: new google.maps.LatLng(
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
  }, [originAndDestination]);
  
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);
  
  const onEditPolygon = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return {lat: latLng.lat(), lng: latLng.lng()};
        });
      setPath(nextPath);
    }
  }, [setPath]);
  
  const onLoadPolygon = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener('set_at', onEditPolygon),
        path.addListener('insert_at', onEditPolygon),
        path.addListener('remove_at', onEditPolygon)
      );
    },
    [onEditPolygon]
  );
  
  const onUnmountPolygon = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  const google = window.google;
  return (
    <>
      <div className='flex flex-col h-screen scrollbar-gone overflow-y-auto w-1/4 bg-gray-100'>
        <TaskEditSideLeft />
      </div>
      <div className='flex flex-col h-screen justify-between w-2/4 bg-gray-100'>
      {!isLoaded ? null : (
        <Map>
          {clickedPos.lat ? (
            <Marker icon={markerIcon} position={clickedPos} />
          ) : null}
          {
            directions?.map((d, index) => (
              <Polyline
                key={generate()}
                path={getPathOr(null, ['routes',0, 'overview_path'], d)}
                geodesic={true}
                options={routesOptions}
              />
            ))
          }
          {originAndDestination?.map((marker) => (
            <Marker
              key={generate()}
              icon={getCrewIcons(marker.crew)}
              position={
                new google.maps.LatLng(
                  marker.originLat,
                  marker.originLon
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
            <MarkerTag
              label={`${t('object.alarmedZone')} 256 ${t('object.zone')}`}
              labelBodyTw={'bg-red-600'}
            />
          </OverlayView>
          <OverlayView
            position={overLayView3}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}
          >
            <MarkerTag
              label={t('icon.marker.tag.endpoint')}
              labelBodyTw={'bg-yellow-600'}
            />
          </OverlayView>
          <OverlayView
            position={overLayView2}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}
          >
            <MarkerTag
              label={'Ekipažas'}
              description={'Įvykis + Objektas + Klientas'}
              labelBodyTw={'bg-red-600'}
              descriptionTw={'text-red-600'}
            />
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
      )}
      </div>
      <div className='flex flex-col h-screen justify-between overflow-y-auto w-1/4 bg-gray-100'>
        <TaskEditSideRight tasks={ATAPI} />
      </div>
    </>
  );
};

export default TaskEditForm;
