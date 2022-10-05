import CrewDriverName from './CrewDriverName';
import CrewIcon from './CrewIcon';
import CrewName from './CrewName';
import Detail from 'components/Disclosure/AsideDisclosure';
import Tag from 'components/atom/Tag';
import useAsyncSwr from 'hook/useAsyncSwr';
import {KeyIcon} from '@heroicons/react/solid';
import {renderWithProps} from 'util/react';
import {useGoogleApiContext} from 'context/google';
import {
  constant,
  find,
  chain,
  safe,
  getPath,
  getProp,
  identity,
  ifElse,
  isArray,
  isEmpty,
  isNil,
  isTruthy,
  map,
  not,
  objOf,
  option,
  pipe,
  propSatisfies,
} from 'crocks';

export const DirectionsTag = props => <Tag.Sm className='bg-gray-300 text-black whitespace-nowrap' {...props} />


export const CrewToEventDistance = pipe(
  getPath(['routes', 0, 'legs', 0, 'distance', 'text']),
  map(objOf('children')),
  map(renderWithProps(DirectionsTag)),
  option(null)
);
export const CrewToEventETA = pipe(
  getPath(['routes', 0, 'legs', 0, 'duration', 'text']),
  map(objOf('children')),
  map(renderWithProps(DirectionsTag)),
  option(null)
);

export const CrewDistanceDetails = ({crew, event}) => {
  const {route, mGoogleMaps} = useGoogleApiContext();
  const toLatLng = mGoogleMaps
  .map(maps => a => new maps.LatLng(a.latitude, a.longitude))
  .option(identity);

  const {data: distanceResponse} = useAsyncSwr({distanceToObject: 'yup', crew, event}, () => (
    Async.of(origin => destination => route(origin, destination))
    .ap(maybeToAsync('no crew coordinates', getCrewCoordinates(crew).map(toLatLng)))
    .ap(maybeToAsync('no task coordinates', getTaskCoordinates(event).map(toLatLng)))
    .chain(identity)
  ));

  return (
  <>
    <CrewToEventETA {...distanceResponse} />
    <CrewToEventDistance {...distanceResponse} />
  </>
  );
};

export const CrewKeyIcon = ifElse(
  propSatisfies(
    'object_key_boxes',
    not(isEmpty),
  ),
  constant(<KeyIcon className='w-5 h-5 text-gray-300' />),
  constant(null),
);

const CrewDetail = ({crew, crews, task, children}) => (
  <Detail.Item>
    <div className='flex items-start space-x-4 w-full'>
      <CrewIcon {...crew} />
      <div className='flex-1'>
        <CrewName {...crew}/>
        <CrewDriverName crew={crew} crews={crews || [crew]} />
      </div>
      <div className='flex-col md:flex-row flex items-end md:items-start md:space-y-0 space-y-2 md:space-x-2'>
        {
        (() => {
          pipe(
            getProp('permissions'),
            chain(safe(isArray)),
            chain(find(propSatisfies('expires_at', not(isNil)))),
            option(null),
          )(crew)
          console.log(crew?.permissions?.[0]?.expires_at);
        })()
        }
        {
          (isTruthy(crew) && isTruthy(task)) 
          ? (
            <>
              <CrewKeyIcon {...crew} />
              <CrewDistanceDetails crew={crew} event={task} />
            </>
          )
          : null
        }
        {children}
      </div>
    </div>
  </Detail.Item>
);

export default CrewDetail;
