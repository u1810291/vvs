import Detail from 'components/Disclosure/AsideDisclosure';
import {format, isPast, isToday} from 'date-fns';
import {useTranslation} from 'react-i18next';
import {
  pipe,
  bimap,
  getProp,
  map,
  chain,
  safe,
  option,
  branch,
  merge,
  ifElse,
  Maybe,
} from 'crocks';
import {always} from 'util/func';
import {renderWithChildren, renderWithProps} from 'util/react';

const LogDate = log => pipe(
  branch,
  bimap(
    getProp('id'),
    pipe(
      getProp('created_at'),
      map(dt => new Date(dt)),
      chain(safe(isPast)),
      map(pipe(
        branch,
        map(ifElse(isToday, always('HH:mm:ss'), always('Y-MM-dd HH:mm:ss'))),
        merge((dt, fmt) => format(dt, fmt)),
      )),
      map(renderWithChildren(<p className='text-steel'/>)),
    )
  ),
  merge((mId, mChildren) => 
    Maybe.of(key => children => ({key, children}))
    .ap(mId)
    .ap(mChildren)
    .map(renderWithProps(Detail.Item))
    .option(null)
  ),
)(log);

const TaskLogDetail = task => {
  const {t} = useTranslation();

  return pipe(
    getProp('logs'),
    map(map(LogDate)),
    map(renderWithChildren(<Detail title={t`logs`} />)),
    option(null),
  )(task);
};

export default TaskLogDetail;
