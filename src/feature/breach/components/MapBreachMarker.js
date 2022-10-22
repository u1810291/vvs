import {OverlayView} from '@react-google-maps/api';
import {getBreachLatLngLiteral} from '../utils';

export const MapBreachNodeMarker = node => (
  getBreachLatLngLiteral(node)
  .map(position => (
    <OverlayView
      key={`MapBreachNodeMarker-${JSON.stringify(node)}`}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      position={position}
    >
      <div className='-translate-x-1/2 -translate-y-[2.75rem] relative'>
        <div className='w-4 h-4 bg-gray-500 rounded-full' />
      </div>
    </OverlayView>
  ))
  .option(null)
);
