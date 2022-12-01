import {Translation, useTranslation} from 'react-i18next';
import Detail from 'components/Disclosure/AsideDisclosure';
import CrewIcon from 'feature/crew/component/CrewIcon';
import {
  Maybe,
  Result,
  and,
  bimap,
  branch,
  chain,
  constant,
  getProp,
  isSame,
  isString,
  isTruthy,
  map,
  merge,
  option,
  or,
  pipe,
  propSatisfies,
  safe,
  isFalsy,
} from 'crocks';
import {titleCase} from '@s-e/frontend/transformer/string';
import {renderWithChildren, RenderWithProps, withMergedClassName} from 'util/react';
import {CLASS_NAME_PRIMARY, CLASS_NAME_SECONDARY} from 'components/Button';
import {generatePath, Link} from 'react-router-dom';
import {TaskEditRoute} from 'feature/task/routes';
import {useCyclicalTransformation} from 'hook/useCyclicalTransformation';
import Tag from 'components/atom/Tag';
import {formatDuration} from 'util/datetime';
import useTask from 'feature/task/api/useTask';
import {STATUS} from 'feature/task/consts';
import ErrorNotification from 'feature/ui-notifications/components/ErrorNotification';
import SuccessNotification from 'feature/ui-notifications/components/SuccessNotification';
import {useNotification} from 'feature/ui-notifications/context';

const BTN_CLASS = 'px-2 pt-1.5 pb-1 text-sm leading-none';
const CLASS_NAME = {
  BTN_PRIMARY: `${CLASS_NAME_PRIMARY} ${BTN_CLASS}`,
  BTN_SECONDARY: `${CLASS_NAME_SECONDARY} ${BTN_CLASS}`,
};

const DashboardTaskDetail = task => (
  <Detail.Item title={task?.description}>
    <div className='flex items-start space-x-4 w-full bg-white'>
      <CrewIcon {...task?.crew} />
      <div className='flex-1'>
        <RenderWithProps props={task}>
          <Title />
          <Subtitle/>
        </RenderWithProps>
      </div>
      <div className='flex flex-col justify-end space-y-1'>
        <RenderWithProps props={task}>
          <AssignButton />
          <FinishButton />
          <ConfirmCancelButton />
          <Timer />
        </RenderWithProps>
      </div>
    </div>
  </Detail.Item>
);

const Title = pipe(
  branch,
  bimap(
    pipe(
      getProp('event_type'),
      chain(safe(isTruthy)),
      map(titleCase),
    ),
    pipe(
      getProp('name'),
      chain(safe(isTruthy)),
    ),
  ),
  merge((mType, mName) => (
    Maybe.of(type => name => `${type}: ${name}`)
    .ap(mType)
    .ap(mName)
    .alt(mName)
    .map(renderWithChildren(<span className='block font-semibold'/>))
    .option(null)
  )),
);

const Subtitle = pipe(
  getProp('address'),
  chain(safe(and(isString, isTruthy))),
  map(renderWithChildren(<span className='block text-sm'/>)),
  option(null),
);

const AssignButton = pipe(
  safe(and(
    propSatisfies('status', isSame(STATUS.NEW)),
    propSatisfies('crew', isFalsy)
  )),
  chain(getProp('id')),
  chain(safe(isTruthy)),
  map(id => (
    <Link className={CLASS_NAME.BTN_PRIMARY} to={generatePath(TaskEditRoute.props.path, {id})}>
      <Translation ns='dashboard' keyPrefix='left'>
        {t => t`assign`}
      </Translation>
    </Link>
  )),
  option(null),
);

const FinishButton = task => {
  const {update} = useTask({id: task?.id})
  const {notify} = useNotification();
  const {t} = useTranslation('dashboard', {keyPrefix: 'left'});

  const onClick = () => (
    update(Result.of({id: task?.id, status: STATUS.FINISHED, crew_id: task?.crew?.id}))
    .fork(
      e => notify(
        <ErrorNotification>
          {errorToText(identity, e)}
        </ErrorNotification>
      ),
      () => notify(<SuccessNotification />),
    )
  );

  return pipe(
    safe(propSatisfies('status', isSame(STATUS.INSPECTION_DONE))),
    map(() => <button className={CLASS_NAME.BTN_PRIMARY} onClick={onClick}>{t`return`}</button>),
    option(null),
  )(task);
};

const ConfirmCancelButton = task => {
  const {update} = useTask({id: task?.id})
  const {notify} = useNotification();
  const {t} = useTranslation('dashboard', {keyPrefix: 'left'});

  const onClick = () => (
    update(Result.of({id: task?.id, status: STATUS.CANCELLED_BY_CLIENT_CONFIRMED}))
    .fork(
      e => notify(
        <ErrorNotification>
          {errorToText(identity, e)}
        </ErrorNotification>
      ),
      () => notify(<SuccessNotification />),
    )
  );

  return pipe(
    safe(propSatisfies('status', or(
      isSame(STATUS.CANCELLED),
      isSame(STATUS.CANCELLED_BY_CLIENT_CONFIRMED),
    ))),
    map(() => <button className={CLASS_NAME.BTN_PRIMARY} onClick={onClick}>{t`close`}</button>),
    option(null),
  )(task);
};

const Timer = ({className, prop = 'updated_at', ...task}) => (
  useCyclicalTransformation(1000, getProp(prop, task), safe(constant(true)))
  .map(pipe(
    formatDuration,
    renderWithChildren(<Tag_ className={className}/>)
  ))
  .option('')
);

const Tag_ = withMergedClassName('bg-gray-200 text-black whitespace-nowrap', Tag.Sm);

export default DashboardTaskDetail;

