import React, {useState, useRef, useCallback} from 'react';
import {Polygon} from '@react-google-maps/api';
import Map from 'feature/map/component/Map';

function _Map() {
  const [path, setPath] = useState([
    {lat: 55.95800510073128, lng: 23.329684891587142},
    {lat: 55.957470022686266, lng: 23.33251414995183},
    {lat: 55.957063358425174, lng: 23.334961076105078}
  ]);
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return {lat: latLng.lat(), lng: latLng.lng()};
        });
      setPath(nextPath);
    }
  }, [setPath]);
  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener('set_at', onEdit),
        path.addListener('insert_at', onEdit),
        path.addListener('remove_at', onEdit)
      );
    },
    [onEdit]
  );
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);
  console.log('The path state is', path);
  return (
    <Map coordinates={{lat: 52.52047739093263, lng: 13.36653284549709}} zoom={12}>
      <Polygon
        // Make the Polygon editable / draggable
        editable
        draggable
        path={path}
        // Event used when manipulating and adding points
        onMouseUp={onEdit}
        // Event used when dragging the whole Polygon
        onDragEnd={onEdit}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    </Map>
  );
}
export default _Map;
