import {format, isPast, isToday} from 'date-fns';
import {useTranslation} from 'react-i18next';
import {
  pipe,
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
} from 'crocks';
import {always} from 'util/func';
import {renderWithChildren, renderWithProps} from 'util/react';
import Detail from 'components/Disclosure/AsideDisclosure';
import TaskStatusTag from './TaskStatusTag';

const LogDate = pipe(
  getProp('created_at'),
  map(dt => new Date(dt)),
  chain(safe(isPast)),
  map(pipe(
    branch,
    map(ifElse(isToday, always('HH:mm:ss'), always('Y-MM-dd HH:mm:ss'))),
    merge((dt, fmt) => format(dt, fmt)),
  )),
  map(renderWithChildren(<p className='text-steel'/>)),
  option(null),
);

const LogContent = pipe(
  getProp('content'),
  chain(r => {
    const {t} = useTranslation();
    return (
      Maybe.of(message => params => t(message, params))
      .ap(getProp('message', r))
      .ap(safe(isObject, r))
      .map(renderWithChildren(<p className='text-black' />))
    )
  }),
  option(null)
);

const LogTag = pipe(
  getPath(['content', 'event']),
  map(renderWithProps(TaskStatusTag.Xs)),
  option(null)
);

const TaskLog = log => (
  <Detail.ExtItem className='space-x-2'>
    {renderWithProps([LogDate, LogContent, LogTag], log)}
  </Detail.ExtItem>
);

const TaskLogs = pipe(
  getProp('logs'),
  map(map(renderWithProps(TaskLog))),
  option(null),
);

export default TaskLogs;
