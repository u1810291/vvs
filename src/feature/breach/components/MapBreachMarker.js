import {OverlayView} from '@react-google-maps/api';
import {constant} from 'crocks';
import {getCrewLatLngLiteral} from '../utils';
import CrewIcon, {crewStatusAs} from './CrewIcon';

export const CREW_STATUS_BEFORE_BORDER_T_CLASSNAME = {
  'BUSY': 'before:border-t-brick',
  'BREAK': 'before:border-t-tango',
  'READY': 'before:border-t-forest',
  'OFFLINE': 'before:border-t-brick',
  'DRIVE_BACK': 'before:border-t-mantis',
  'UNKNOWN': 'before:border-t-black',
};

const beforeBorderTopColor = crewStatusAs({
  onOffline: constant(CREW_STATUS_BEFORE_BORDER_T_CLASSNAME.OFFLINE),
  onBreak: constant(CREW_STATUS_BEFORE_BORDER_T_CLASSNAME.BREAK),
  onReady: constant(CREW_STATUS_BEFORE_BORDER_T_CLASSNAME.READY),
  onBusy: constant(CREW_STATUS_BEFORE_BORDER_T_CLASSNAME.BUSY),
  onDriveBack: constant(CREW_STATUS_BEFORE_BORDER_T_CLASSNAME.DRIVE_BACK),
  onFallback: constant(CREW_STATUS_BEFORE_BORDER_T_CLASSNAME.UNKNOWN),
});

export const MapBreachMarker = crew => (
  getCrewLatLngLiteral(crew)
  .map(position => (
    <OverlayView
      key={`MapCrewMarker-${JSON.stringify(crew)}`}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      position={position}
    >
      <div className='-translate-x-1/2 -translate-y-[2.75rem] relative'>
        <CrewIcon className={[
          'before:absolute',
          'before:block',
          'before:border-[10px]',
          'before:border-t-[10px]',
          'before:border-t-brick',
          'before:border-transparent',
          beforeBorderTopColor(crew),
          'before:content-[""]',
          'before:-bottom-4',
        ].join(' ')} {...crew}
          />
      </div>
    </OverlayView>
  ))
  .option(null)
);
