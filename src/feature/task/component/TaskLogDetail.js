import {format, isPast, isToday} from 'date-fns';
import {useTranslation} from 'react-i18next';
import {
  pipe,
  find,
  propEq,
  getProp,
  getPath,
  map,
  chain,
  safe,
  option,
  branch,
  merge,
  ifElse,
  Maybe,
  isObject,
  constant,
} from 'crocks';
import {always} from 'util/func';
import {interpolateTextToComponent, renderWithChildren, renderWithProps} from 'util/react';
import Detail from 'components/Disclosure/AsideDisclosure';
import TaskStatusTag from './TaskStatusTag';
import useAsyncSwr from 'hook/useAsyncSwr';
import {useAuth} from 'context/auth';
import maybeToAsync from 'crocks/Async/maybeToAsync';

const LogDate = pipe(
  getProp('created_at'),
  map(dt => new Date(dt)),
  chain(safe(isPast)),
  map(pipe(
    branch,
    map(ifElse(isToday, always('HH:mm:ss'), always('Y-MM-dd HH:mm:ss'))),
    merge((dt, fmt) => format(dt, fmt)),
  )),
  map(renderWithChildren(<p className='whitespace-nowrap text-steel'/>)),
  option(null),
);

const textAsterisksToSpan = interpolateTextToComponent(
  /(\*\*.*?\*\*)/giu,
  /\*\*(.*?)\*\*/,
  pipe(
    getProp(1),
    map(children => <span key={`textAsterisksToSpan-${children}`} className='font-semibold'>{children}</span>),
    option(null)
  ),
)

const crewIdToCrewName = crews => interpolateTextToComponent(
  /(crew_id_to_name\(.*?\))/giu,
  /crew_id_to_name\((.*?)\)/,
  pipe(
    getProp(1),
    chain(id => find(propEq('id', id), crews)),
    chain(getProp('name')),
    option(null),
  ),
)

const userIdToName = t => interpolateTextToComponent(
  /(user_id_to_name\(.*?\))/giu,
  /user_id_to_name\((.*?)\)/,
  pipe(
    getProp(1),
    option(null),
    constant(t`somebody`)
  ),
)

const LogContent = pipe(
  getProp('content'),
  chain(r => {
    const {t: tt} = useTranslation('task', );
    const {t} = useTranslation('task', {keyPrefix: 'eventLogMessage'});
    const {api, apiQuery} = useAuth();
    const {data: crews = []} = useAsyncSwr('allCrewIdAndNames', () => (
      apiQuery('query { crew { id name } }')
      .chain(maybeToAsync('crew key not found', getProp('crew'))))
    )

    /**
     * @TODO:
     *
     * 1. fill in the column changed_by_user_id
     * 2. search the user service for user_id_to_name
     * 3. display the name in the userIdToName function
     *
     *  const user = useAsyncSwr(['userSearch', r?.event?.changed_by_user_id], () => (
     *    api({id: r?.event?.changed_by_user_id}, 'query ($id: uuid!) { userById (id: $id) { user {id firstName lastName fullName middleName username} } }')
     *    .chain(maybeToAsync('crew key not found', getProp('crew'))))
     *  )
     */

    return (
      Maybe.of(message => params => pipe(
        userIdToName(tt),
        crewIdToCrewName(crews),
        textAsterisksToSpan,
      )(t(message, params)))
      .ap(getProp('message', r))
      .ap(safe(isObject, r))
      .map(renderWithChildren(<p className='text-black' />))
    )
  }),
  option(null)
);

const LogTag = pipe(
  getPath(['content', 'event']),
  map(renderWithProps(<TaskStatusTag.Xs className='whitespace-nowrap' />)),
  option(null)
);

const TaskLog = log => (
  <Detail.Item className='mx-4 py-4 flex justify-start items-center border-t border-gray-200 space-x-4'>
    {renderWithProps([LogDate, LogContent, LogTag], log)}
  </Detail.Item>
);

const TaskLogs = pipe(
  getProp('logs'),
  map(map(renderWithProps(TaskLog))),
  option(null),
);

export default TaskLogs;
