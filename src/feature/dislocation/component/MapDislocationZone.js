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

export const POLYGON_OPTIONS_DISPLAY = {
  strokeOpacity: 1,
  fillOpacity: 0.4,
  strokeWeight: 0.8,
  fillColor: '#F37E16',
  strokeColor: '#F37E16',
};

const MapDislocationZone = ({zone}) => (
  <Polygon 
    key={zone.id} 
    path={zone.nodes} 
    options={POLYGON_OPTIONS_DISPLAY}
  />
);

export default MapDislocationZone;