import {caseMap} from '@s-e/frontend/flow-control';
import {withMergedClassName} from 'util/react';
import {
  chain,
  curry,
  find,
  getProp,
  isObject,
  isSame,
  isString,
  isTruthy,
  map,
  not,
  option,
  or,
  pathSatisfies,
  pipe,
  propSatisfies,
  safe,
} from 'crocks';

export const CREW_STATUS_BORDER_CLASSNAME = {
  'BUSY': 'border-brick',
  'BREAK': 'border-tango',
  'READY': 'border-forest',
  'DRIVE_BACK': 'border-mantis',
  'UNKNOWN': 'border-black',
  'OFFLINE': 'border-brick',
};

export const CREW_STATUS_BG_CLASSNAME = {
  'BUSY': 'bg-brick',
  'BREAK': 'bg-tango',
  'READY': 'bg-forest',
  'DRIVE_BACK': 'bg-mantis',
  'UNKNOWN': 'bg-black',
  'OFFLINE': 'border-brick',
};

const CLASS_NAME = 'w-10 h-10 bg-white font-semibold rounded-full border-4 truncate text-xs flex items-center justify-center';

const isStatus = curry((value, obj) => pipe(
  safe(isObject),
  chain(getProp('status')),
  chain(safe(isString)),
  map(a => isSame(a.toUpperCase(), value.toUpperCase())),
  option(false),
)(obj));

const isUserOnline = pipe(
  safe(isObject),
  chain(getProp('user_settings')),
  chain(find(propSatisfies('is_online', isTruthy))),
  map(Boolean),
  option(false),
);

const CrewIconBase = crew => (
  <div className='w-10 h-10 rounded-full border-4 truncate text-xs flex items-center justify-center bg-red-500' {...crew}>
    {(crew?.abbreviation || crew?.name || '?').slice(0, 3)}
  </div>
);

const CrewIcon = withMergedClassName(`${CLASS_NAME} ${CREW_STATUS_BORDER_CLASSNAME.UNKNOWN}`, CrewIconBase);
CrewIcon.Busy = withMergedClassName(`${CLASS_NAME} ${CREW_STATUS_BORDER_CLASSNAME.BUSY}`, CrewIconBase);
CrewIcon.Break = withMergedClassName(`${CLASS_NAME} ${CREW_STATUS_BORDER_CLASSNAME.BREAK}`, CrewIconBase);
CrewIcon.Ready = withMergedClassName(`${CLASS_NAME} ${CREW_STATUS_BORDER_CLASSNAME.READY}`, CrewIconBase);
CrewIcon.Offline = withMergedClassName(`${CLASS_NAME} ${CREW_STATUS_BORDER_CLASSNAME.OFFLINE}`, CrewIconBase);
CrewIcon.DriveBack = withMergedClassName(`${CLASS_NAME} ${CREW_STATUS_BORDER_CLASSNAME.DRIVE_BACK}`, CrewIconBase);

export const crewStatusAs = ({
  onOffline,
  onBreak,
  onReady,
  onBusy,
  onDriveBack,
  onFallback,
}) => caseMap(onFallback, [
    [isStatus('BUSY'), onBusy],
    [or(isStatus('BREAK'), pathSatisfies(['permissions', 0, 'expires_at'], isTruthy)), onBreak],
    [isStatus('READY'), onReady],
    [not(isUserOnline), onOffline],
    [isStatus('DRIVE_BACK'), onDriveBack]
  ]);

export default crewStatusAs({
  onOffline: CrewIcon.Offline,
  onBreak: CrewIcon.Break,
  onReady: CrewIcon.Ready,
  onBusy: CrewIcon.Busy,
  onDriveBack: CrewIcon.DriveBack,
  onFallback: CrewIcon,
});
