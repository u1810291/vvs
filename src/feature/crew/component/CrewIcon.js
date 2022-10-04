import {caseMap} from '@s-e/frontend/flow-control';
import {withMergedClassName} from 'util/react';
import {
  chain,
  curry,
  getProp,
  isObject,
  isSame,
  isString,
  isTruthy,
  map,
  option,
  or,
  pathSatisfies,
  pipe,
  safe,
} from 'crocks';

const isStatus = curry((value, obj) => pipe(
  safe(isObject),
  chain(getProp('status')),
  chain(safe(isString)),
  map(a => isSame(a.toUpperCase(), value.toUpperCase())),
  option(false),
)(obj));

const CrewIconBase = crew => (
  <div className='w-10 h-10 rounded-full border-4 truncate text-xs flex items-center justify-center bg-red-500' {...crew}>
    {(crew?.abbreviation || crew?.name || '?').slice(0, 3)}
  </div>
);

const CLASS_NAME = 'w-10 h-10 rounded-full border-4 truncate text-xs flex items-center justify-center';

const CrewIcon = withMergedClassName(`${CLASS_NAME} border-black`, CrewIconBase);
CrewIcon.Busy = withMergedClassName(`${CLASS_NAME} border-brick`, CrewIconBase);
CrewIcon.Break = withMergedClassName(`${CLASS_NAME} border-tango`, CrewIconBase);
CrewIcon.Ready = withMergedClassName(`${CLASS_NAME} border-forest`, CrewIconBase);
CrewIcon.Offline = withMergedClassName(`${CLASS_NAME} border-brick`, CrewIconBase);
CrewIcon.DriveBack = withMergedClassName(`${CLASS_NAME} border-mantis`, CrewIconBase);

export default caseMap(CrewIcon, [
  [isStatus('BUSY'), CrewIcon.Busy],
  [
    or(
      isStatus('BREAK'),
      pathSatisfies(['permissions', 0, 'expires_at'], isTruthy),
    ),
    CrewIcon.Break
  ],
  [isStatus('READY'), CrewIcon.Ready],
  [isStatus('OFFLINE'), CrewIcon.Offline],
  [isStatus('DRIVE_BACK'), CrewIcon.DriveBack]
]);
