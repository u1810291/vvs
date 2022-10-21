import Button from 'components/Button';
import InputGroup from 'components/atom/input/InputGroup';
import Nullable from 'components/atom/Nullable';
import React, {useEffect, useRef, useMemo, useCallback, useState} from 'react';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {DislocationListRoute} from 'feature/dislocation/routes';
import {GoogleMap, Polygon, DrawingManager} from '@react-google-maps/api';
import {getDislocationLatLngLiteral} from 'feature/dislocation/ultis';
import {useDisclocation} from 'feature/dislocation/api/dislocationEditApi';
import {useGoogleApiContext} from 'context/google';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
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


// TODO: move to map component's folder
export const INITIAL_COORDINATES = [
  {lat: 55.82907781071856, lng: 22.14990544085954},
  {lat: 54.923659939894556, lng: 24.67197859084832}
]

const DislocationEditForm = ({saveRef, removeRef}) => {
  const {t} = useTranslation('dislocation', {keyPrefix: 'edit'});
  const {id: dislocationZoneId} = useParams();
  const {isLoaded, mGoogleMaps} = useGoogleApiContext();

  const mapRef = useRef();
  const fitBoundsCounter = useRef(0);
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);  
  const drawingManager = useRef();

  const {ctrl, result, form, setForm} = useResultForm({
    name: FORM_FIELD.TEXT({label: t`field.name`, validator: () => true}),
    nodes: FORM_FIELD.ARRAY({label: null, validator: () => true})
  });   
  const {value: nodes} = ctrl('nodes');

  const mMap = useMemo(() => (
    isLoaded ? safe(isTruthy, mapRef.current) : Maybe.Nothing()
  ), [isLoaded, mapRef.current])

  const [mode, setMode] = useState('polygon');

  useEffect(() => {
    Maybe.of(map => m => zoneNodes => {
      const bounds = new m.LatLngBounds();

      if (!polygonRef.current) {
        [...INITIAL_COORDINATES].forEach(latLng => bounds.extend(latLng));
        map.fitBounds(bounds);
        return;
      }
       
      const newBounds = [...zoneNodes];
        
      if (newBounds.length <= fitBoundsCounter.current) {
        return;
      }

      newBounds.forEach(latLng => bounds.extend(latLng));
      map.fitBounds(bounds);
      fitBoundsCounter.current = newBounds.length;
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
  }, [nodes, mGoogleMaps, mMap]);
    
  useDisclocation({
    id: dislocationZoneId,
    formResult: result,
    saveRef,
    setForm,
    removeRef,
    successRedirectPath: DislocationListRoute.props.path,
  });

  const remove = () => isFunction(removeRef.current) && removeRef.current([{id: dislocationZoneId}]);

  const onEdit = useCallback(() => {
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

  // update listeners
  useEffect(() => {
    onLoad(polygonRef.current);
  }, nodes);
  
  const onPolygonComplete = useCallback(polygon => {
    polygonRef.current = polygon;
    const path = polygonRef.current.getPath(); 

    listenersRef.current.push(
      path.addListener('set_at', onEdit),
      path.addListener('insert_at', onEdit),
      path.addListener('remove_at', onEdit)
    );

    onEdit();
    setMode(null);
  }, [polygonRef.current]);

  const onLoad = useCallback(polygon => {
    if (polygon == null) return;
  
    polygonRef.current = polygon;
    const path = polygonRef.current.getPath();

    listenersRef.current.push(
      path.addListener('set_at', onEdit),
      path.addListener('insert_at', onEdit),
      path.addListener('remove_at', onEdit)
    );
  }, [polygonRef.current])

  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

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
            <Nullable on={dislocationZoneId}>
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
                    onEdit={onLoad}
                  />),
                  option(null),                
                )(nodes)
              }
            </Nullable>
            
            <Nullable on={!dislocationZoneId}>
              <DrawingManager
                ref={drawingManager}
                drawingMode={mode}
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
            </Nullable>
          </GoogleMap>
        </Nullable>
      </div>
    </section>
  );
};

export default DislocationEditForm;
