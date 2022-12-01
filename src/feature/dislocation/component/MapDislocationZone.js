import {Polygon} from '@react-google-maps/api';

export const POLYGON_OPTIONS = {
  strokeOpacity: 1,
  fillOpacity: 0.4,
  strokeWeight: 0.8,
  fillColor: '#F37E16',
  strokeColor: '#F37E16',
  draggable: true,
  editable: true,
};

export const POLYGON_OPTIONS_TASK_MAP = {
  strokeOpacity: 1,
  fillOpacity: 0.3,
  strokeWeight: 0.8,
  fillColor: '#92C46B',
  strokeColor: '#92C46B'
};

export const POLYGON_OPTIONS_DISPLAY = {
  strokeOpacity: 1,
  fillOpacity: 0.4,
  strokeWeight: 0.8,
  fillColor: '#F37E16',
  strokeColor: '#F37E16',
};

const MapDislocationZone = ({zone, options = POLYGON_OPTIONS_DISPLAY}) => (
  <Polygon 
    key={zone.id} 
    path={zone.nodes} 
    options={options}
  />
);

export default MapDislocationZone;