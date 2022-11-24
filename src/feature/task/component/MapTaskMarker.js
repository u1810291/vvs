import {OverlayView} from '@react-google-maps/api';
import {useTranslation} from 'react-i18next';
import {getTaskLatLngLiteral} from '../util';
import {
  and,
  safe,
  option,
  isObject,
  pipe,
  constant,
  branch,
  merge,
  map,
  getProp,
  not,
  isEmpty,
  propSatisfies,
} from 'crocks';
import {getStatus} from './TaskStatusTag';
import {caseMap} from '@s-e/frontend/flow-control';

const taskToStyle = getStatus(
  getProp('status'),
  constant('text-white bg-curious'),
  constant('text-white bg-oxford'),
  constant('text-white bg-oxford'),
  constant('text-white bg-oxford'),
  constant('text-white bg-brick'),
  constant('text-white bg-brick'),
  constant('text-white bg-tango'),
  constant('text-white bg-mantis'),
  constant('text-white bg-tango'),
  constant('text-white bg-gray-600'),
);

const taskToSecondaryStyle = getStatus(
  getProp('status'),
  constant('bg-white text-curious'),
  constant('bg-white text-oxford'),
  constant('bg-white text-oxford'),
  constant('bg-white text-oxford'),
  constant('bg-white text-brick'),
  constant('bg-white text-brick'),
  constant('bg-white text-tango'),
  constant('bg-white text-mantis'),
  constant('bg-white text-tango'),
  constant('bg-white text-gray-600'),
);

const MapTaskMarker = pipe(
  branch,
  map(getTaskLatLngLiteral),
  merge((task, mLatLngLiteral) => {
    return (mLatLngLiteral.map(position => (
      <OverlayView
        key={`MapTaskMarker-${JSON.stringify(task)}`}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        position={position}
      >
        <div title={task?.description}>
          <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='-left-4 -top-4 relative'
          >
            <circle opacity='0.3' cx='16' cy='16' r='16' fill='#C32A2F'/>
            <circle cx='16' cy='16' r='3' fill='#C32A2F' stroke='white' strokeWidth='2'/>
          </svg>

          {caseMap(CrewlessTag, [
            [propSatisfies('crew', and(isObject, not(isEmpty))), CrewTag]
          ], task)}

        </div>
      </OverlayView>
    )).option(null)
  )}),
);

const CrewlessTag = pipe(
  safe(propSatisfies('status', not(isEmpty))),
  map(task => (
    <div className='absolute top-0 left-0 transform translate-x-3 -translate-y-1/2 flex'>
      <div role='tooltip' className={`arr-1.5 arr-brick arr-l ${taskToStyle(task)}`} />
      <span className={`px-2 py-1 rounded font-medium text-sm whitespace-nowrap ${taskToStyle(task)}`}>
        {task?.name}
      </span>
    </div>
  )),
  option(null)
);

const CrewTag = task => {
  const {t} = useTranslation('crew', {keyPrefix: 'list.status'});
  return (
    <div className='absolute top-0 left-0 transform translate-x-3 -translate-y-1/2 flex'>
      <span className={`shadow block relative px-2 py-1 rounded font-medium text-sm whitespace-nowrap z-20 ${taskToStyle(task)}`}>
        {(`${task?.crew?.name} ${t(task?.crew?.status)}`).trim()}
      </span>
      <div role='tooltip' className={`z-30 arr-1.5 arr-blue-500 arr-l ${taskToStyle(task)}`} />
      <span className={`shadow block relative -left-2 pl-4 pr-2 py-1 rounded-br rounded-tr z-10 font-medium text-sm whitespace-nowrap ${taskToSecondaryStyle(task)}`}>{task?.name}</span>
    </div>
  )
};

export default MapTaskMarker;
