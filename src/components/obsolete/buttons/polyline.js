import {Polyline} from '@react-google-maps/api';

const RoutesPolyline = props => (
   <Polyline {...{
    ...props,
    geodesic: true,
    strokeColor: '#ff2343',
    strokeOpacity: 0.8,
    strokeWeight: 5,
    clickable: true,
  }}/>
);

export default RoutesPolyline;
