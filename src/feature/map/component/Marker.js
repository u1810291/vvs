import {Marker as GoogleMarker} from '@react-google-maps/api';

const Marker = ({path, icon}) => path.map((node, i) => <GoogleMarker key={i} position={node} icon={icon} />);

export default Marker;
