import React, {useEffect, useRef, useMemo} from 'react';

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
import {DrawingManager, GoogleMap, Polygon} from '@react-google-maps/api';
// import {LITHUANIA_COORDINATES} from 'feature/map/component/Map';
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

const DislocationEditForm = ({saveRef, removeRef}) => {
  const {id: dislocationZoneId} = useParams();
  const {isLoaded, mGoogleMaps} = useGoogleApiContext();
  const mapRef = useRef();
  const {t} = useTranslation('dislocation', {keyPrefix: 'edit'});

  const {ctrl, result, form, setForm} = useResultForm({
    name: FORM_FIELD.TEXT({label: t`field.name`, validator: () => true}),
    nodes: FORM_FIELD.ARRAY({label: null, validator: () => true})
  });   

  const {value: nodes} = ctrl('nodes');
  const zonePath = getZoneItems(nodes);


  const drawingManager = useRef();
  const mMap = useMemo(() => (
    isLoaded ? safe(isTruthy, mapRef.current) : Maybe.Nothing()
  ), [isLoaded, mapRef.current])

  useEffect(() => {
    Maybe.of(map => m => zoneNodes => {
      const bounds = new m.LatLngBounds();
      [...zoneNodes].forEach(latLng => bounds.extend(latLng));
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
  }, [form, mGoogleMaps, mMap]);
  
  console.log('nodes', nodes);

  

  useDisclocation({
    id: dislocationZoneId,
    formResult: result,
    saveRef,
    setForm,
    removeRef,
    successRedirectPath: DislocationListRoute.props.path,
  });

  const remove = () => isFunction(removeRef.current) && removeRef.current([{id: dislocationZoneId}]);

  const onDragEnd = polygon => {
    console.log(polygon.latLng)
  }

  const onPolygonComplete = polygon => {
    console.log(polygon);
  }

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
                map(coordinates => <Polygon key={dislocationZoneId} paths={coordinates} options={POLYGON_OPTIONS} onDragEnd={onDragEnd} />),
                option(null),                
              )(nodes)
            }

            <DrawingManager
              ref={drawingManager}
              drawingMode={null}
              options={{
                drawingControl: true,
                drawingControlOptions: {
                  drawingModes: [],
                  position: 3.0
                },
                polygonOptions: POLYGON_OPTIONS
              }}
              onPolygonComplete={onPolygonComplete}
            />
            
          </GoogleMap>
        </Nullable>
      </div>
    </section>
  );
};

export default DislocationEditForm;
