import React, {useEffect, useRef, useMemo, useCallback} from 'react';

import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {useGoogleApiContext} from 'context/google';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';

import Button from 'components/Button';
import Nullable from 'components/atom/Nullable';
import InputGroup from 'components/atom/input/InputGroup';

// import Map, {LITHUANIA_COORDINATES} from 'feature/map/component/Map';
import {DislocationListRoute} from 'feature/dislocation/routes';
// import GoogleMapTools from 'feature/map/component/GoogleMapTools';
import {getZoneItems} from 'feature/dislocation/ultis';
import {useDisclocation} from 'feature/dislocation/api/dislocationEditApi';
import {
  isFunction, 
  isTruthy, 
  safe, 
  Maybe, 
  map, 
  pipe, 
  and, 
  not, 
  isEmpty, 
  option,
  isArray, 
  chain, 
  getPath, 
  reduce,
  alt,
} from 'crocks';
import {GoogleMap, Polygon} from '@react-google-maps/api';
import {getDislocationLatLngLiteral} from 'feature/dislocation/ultis';

const POLYGON_OPTIONS = {
  strokeOpacity: 1,
  fillOpacity: 0.4,
  strokeWeight: 0.8,
  fillColor: '#F37E16',
  strokeColor: '#F37E16',
  draggable: true,
  editable: true,
};

const INITIAL_COORDINATES = [
  {lat: 55.82907781071856, lng: 22.14990544085954},
  {lat: 54.923659939894556, lng: 24.67197859084832}
]

const DislocationEditForm = ({saveRef, removeRef}) => {
  const {t} = useTranslation('dislocation', {keyPrefix: 'edit'});
  
  const {id: dislocationZoneId} = useParams();
  const {isLoaded, mGoogleMaps} = useGoogleApiContext();
  const mapRef = useRef();
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);  

  const {ctrl, result, form, setForm} = useResultForm({
    name: FORM_FIELD.TEXT({label: t`field.name`, validator: () => true}),
    nodes: FORM_FIELD.ARRAY({label: null, validator: () => true})
  });   

  const {value: nodes} = ctrl('nodes');
  const zonePath = getZoneItems(nodes);


  const mMap = useMemo(() => (
    isLoaded ? safe(isTruthy, mapRef.current) : Maybe.Nothing()
  ), [isLoaded, mapRef.current])

  useEffect(() => {
    Maybe.of(map => m => zoneNodes => {
      const bounds = new m.LatLngBounds();
      
      if (dislocationZoneId) {
        [...zoneNodes].forEach(latLng => bounds.extend(latLng));
      } else {
        [...INITIAL_COORDINATES].forEach(latLng => bounds.extend(latLng));
      }

      map.fitBounds(bounds);
    })
    .ap(mMap) 
    .ap(mGoogleMaps)
    .ap(
      pipe(
        getPath([0]),
        chain(safe(isArray)),
        map(a => a.flat()),
        map(reduce((carry, item) => (
          getDislocationLatLngLiteral(item)
          .map(latLng => [...carry, latLng])
          .option(carry)
        ), [])),
        alt(Maybe.Just([]))
      )(nodes)
    )
  }, [form['nodes'], mGoogleMaps, mMap]);
    

  useDisclocation({
    id: dislocationZoneId,
    formResult: result,
    saveRef,
    setForm,
    removeRef,
    successRedirectPath: DislocationListRoute.props.path,
  });

  const remove = () => isFunction(removeRef.current) && removeRef.current([{id: dislocationZoneId}]);


  // // Call setPath with new edited path
  const onEdit = useCallback(() => {
    console.log('on edit');

    if (polygonRef.current) {
      const newPath = polygonRef.current
        .getPath()        
        .getArray()
        .map(latLng => {
          return {lat: latLng.lat(), lng: latLng.lng()};
        });
      setForm({nodes: newPath});
    }
  }, [nodes]);

  // // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      console.log('path', path);

      listenersRef.current.push(
        path.addListener('set_at', onEdit),
        path.addListener('insert_at', onEdit),
        path.addListener('remove_at', onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  console.log('nodes', nodes);

  return (
    <section className={'m-6 h-full flex md:flex-col lg:flex-row'}>
      <div className={'md:w-5/12 lg:w-3/12 mr-6 flex flex-col justify-between items-start'}>
        <InputGroup className={'w-2/3'} isRequired={true} {...ctrl('name')} />
        <Button.Dxl onClick={remove}>{t('button.delete')}</Button.Dxl>
      </div>
      <div className={'md:w-7/12 lg:w-9/12 -my-6 -mr-6'}>
        <Nullable on={isLoaded}>
          <GoogleMap
            {...useMemo(() => ({
              mapContainerStyle: {width: '100%', height: '100%'},
              onLoad: map => {mapRef.current = map}
            }), [])}
          >
            {
              pipe(
                safe(and(not(isEmpty), isArray)),
                chain(getPath([0])),
                map(coordinates => <Polygon 
                  key={dislocationZoneId} 
                  path={coordinates} 
                  options={POLYGON_OPTIONS} 
                  onDragEnd={onEdit} 
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  onEdit={onEdit}
                />),
                option(null),                
              )(nodes)
            }

            {/* draw polygons on create */}
            {/* <DrawingManager
              ref={drawingManager}
              drawingMode={'polygon'}
              options={{
                drawingControl: true,
                drawingControlOptions: {
                  drawingModes: [],
                  position: 3.0
                },
                polygonOptions: polygonsOptions
              }}
              onPolygonComplete={onPolygonComplete}
            /> */}
          </GoogleMap>
        </Nullable>
      </div>
    </section>
  );
};

export default DislocationEditForm;
