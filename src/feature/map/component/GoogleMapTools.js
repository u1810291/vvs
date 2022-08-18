import React, {useCallback, useState, useRef, useEffect} from 'react';

import {useTranslation} from 'react-i18next';
import {DrawingManager} from '@react-google-maps/api';

import {useGoogleApiContext} from 'context/google';

import {getZoneItems} from 'feature/dislocation/ultis';

import _ from 'lodash';

const GoogleMapTools = ({
  value,
  setValue,
  onMapLoad,
  polygonsOptions = {}
}) => {
  const {t} = useTranslation();
  const drawingManager = useRef();
  const {googleMap} = useGoogleApiContext();

  const [rawPolygons, setRawPolygons] = useState([]);

  const isArrayEqual = (x, y) => _(x).xorWith(y, _.isEqual).isEmpty();

  const deleteVertexHandler = (polygon) => {
    polygon.addListener('rightclick', event => {
      deleteVertex(polygon, event.vertex);
    });
  };

  const getLastOrExcludeLast = (list, isOnlyLast) => {
    // returning only the last one or excludes last item from the list
    const lastItem = list[list.length -1];
    return list.filter(item => {
      if (isOnlyLast) {
        return item === lastItem;
      } else {
        return item !== lastItem;
      }
    });
  };

  const getCoordinates = useCallback((rawPolygons) => {
    if (rawPolygons?.length) {
      const polygonsBounds = rawPolygons.map(polygon => polygon.getPath().getArray());
      const polygonsCoordinates = polygonsBounds.map(polygonBound => {
        return polygonBound.map(polygonCoordinate => ({
          lat: polygonCoordinate.lat(),
          lng: polygonCoordinate.lng()
        }));
      });

      return polygonsCoordinates;
    }
  }, []);

  const onPolygonComplete = useCallback(polygon => {
    rawPolygons.map(polygon => polygon.setMap(null));
    setRawPolygons([polygon]);
    polygon.setEditable(true);
    deleteVertexHandler(polygon);
  }, [rawPolygons]);

  const clearAllPolygons = useCallback(() => {
    if (rawPolygons.length) {
      rawPolygons.map(polygon => polygon.setMap(null));
      setRawPolygons([]);
    }
  }, [rawPolygons]);

  const undoPreviousPolygon = useCallback(() => {
    /*
      function to avoid direct state mutation
      e.g. to avoid pop, slice, shift, etc
      should control state only through setter
     */
    if (rawPolygons.length) {
      const veryLastPolygon = getLastOrExcludeLast(rawPolygons, true);
      const allExceptLastPolygon = getLastOrExcludeLast(rawPolygons);
      veryLastPolygon.forEach(polygon => polygon.setMap(null));
      setRawPolygons([...allExceptLastPolygon]);
    }
  }, [rawPolygons]);

  const deleteVertex = useCallback((polygon, vertex) => {
    const path = polygon.getPath();
    const mode = drawingManager.current.state.drawingManager.drawingMode;
    // mode === null means we are using an edit tool but not others like polygon, circle etc.
    if (mode === null && vertex != undefined && path.getLength() > 2) {
      path.removeAt(vertex);
    } else {
      return;
    }
  }, [drawingManager]);

  useEffect(() => {
    if (!isArrayEqual(getCoordinates(rawPolygons))) {
      setValue(getCoordinates(rawPolygons));
    }
  }, [rawPolygons]);

  useEffect(() => {
    if (value) {
      const polygonInstances = getZoneItems(value).map(zone => {
        return new google.maps.Polygon({
          paths: zone,
          strokeOpacity: 1,
          fillOpacity: 0.4,
          strokeWeight: 0.8,
          fillColor: '#F37E16',
          strokeColor: '#F37E16',
          draggable: true,
          editable: true
        });
      });
      if (!isArrayEqual(...value, getCoordinates(rawPolygons))) {
        setRawPolygons([...polygonInstances]);
        polygonInstances.map(polygon => polygon.setMap(googleMap));
        polygonInstances.map(polygon => deleteVertexHandler(polygon));
      }
    };
  }, [value]);

  useEffect(() => {
    return () => {
      rawPolygons.map(polygon => polygon.setMap(null))
    };
  }, []);

  return (
    <>
      <button
        className='absolute z-1 top-24 border text-gray-900 text-sm rounded-sm shadow-md right-3 p-2 bg-white'
        onClick={clearAllPolygons}
      >
        {t('eurocash.clear')}
      </button>
      <button
        className='absolute z-1 top-36 border text-gray-900 text-sm rounded-sm shadow-md right-3 p-2 bg-white'
        onClick={undoPreviousPolygon}
      >
        {t('eurocash.undo')}
      </button>
      {/* NOTE: React StrictMode is forcing DrawaingManager to be rendered twice */}
      <DrawingManager
        ref={drawingManager}
        options={{
          drawingControl: true,
          drawingControlOptions: {
            drawingModes: ['polygon'],
            position: 3.0
          },
          polygonOptions: polygonsOptions
        }}
        onPolygonComplete={onPolygonComplete}
      />
    </>
  );
};

GoogleMapTools.displayName = 'GoogleMapTools';

export default GoogleMapTools;
