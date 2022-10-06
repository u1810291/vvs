import {caseMap} from '@s-e/frontend/flow-control';
import CrewDetail from 'feature/crew/component/CrewDetail';
import {errorToText} from 'api/buildApiHook';
import Button from 'components/Button';
import Detail from 'components/Disclosure/AsideDisclosure';
import {getPath, getProp, merge, pipe, branch, map, chain, safe, isTruthy, option, isArray, bimap, setProp, reduce, getPathOr, objOf, propSatisfies, identity, Result, tap} from 'crocks';
import {equals} from 'crocks/pointfree';
import {GQL} from 'feature/crew/api/useCrewsForEvent';
import {getObjectName} from 'feature/object/utils';
import ErrorNotification from 'feature/ui-notifications/components/ErrorNotification';
import SuccessNotification from 'feature/ui-notifications/components/SuccessNotification';
import {useNotification} from 'feature/ui-notifications/context';
import {getEmail, getName, getPhone} from 'feature/user/utils';
import useSubscription from 'hook/useSubscription';
import raw from 'raw.macro';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';
import {renderWithProps} from 'util/react';
import useTask from '../api/useTask';
import {TaskListRoute} from '../routes';
import {getTaskAddress} from '../util';
import TaskLogDetail from '../component/TaskLogDetail';

const TASK_GQL = raw('../api/graphql/GetTaskById.graphql');

const TaskEditForm = () => {
  const UNINITIALIZED_SUBSCRIPTION = 'uninitialized';
  const {id} = useParams();
  const {t: to} = useTranslation('object');
  const {data: task} = useTask({id});
  const taskSubscription = useSubscription(
    'query GetTaskById($id: uuid!) {events_by_pk(id: $id) {crew_id}}',
    useMemo(() => ({id}), [id])
  );

  const subscribedEvent = useMemo(() => getPathOr(UNINITIALIZED_SUBSCRIPTION, ['data', 'events_by_pk'], taskSubscription), [taskSubscription])

  return (
    <section className='min-h-screen h-full flex'>
      <aside className={'border-r border-gray-border h-full'}>
        <div className='p-5 border-b border-gray-300 space-y-2'>
          <ObjectName {...task} />
          <Address {...task} />
        </div>
        <Detail title={to`edit.responsiblePeople`}>
          <RelatedUsers {...task} />
        </Detail>
      </aside>
      {caseMap(() => <AsideSelectCrew />, [
        [equals(UNINITIALIZED_SUBSCRIPTION), () => null],
        [propSatisfies('crew_id', isTruthy), () => <AsideCancelableCrew />],
      ], subscribedEvent)}
    </section>
  );
};

const AsideCancelableCrew = () => {
  const {t} = useTranslation();
  const {id} = useParams();
  const sub = useSubscription(
    useMemo(() => TASK_GQL, []),
    useMemo(() => ({id}), [id]),
  );

  const task = useMemo(() => getPathOr(null, ['data', 'events_by_pk'], sub));

  const Crew = useMemo(() => () => pipe(
    getPath(['data', 'events_by_pk', 'crew']),
    map(crew => ({crew, task})),
    map(renderWithProps(CrewDetail)),
    option(null)
  )(sub));

  return (
    <aside className={'border-r border-gray-border h-full'}>
      <Crew />
      <TaskLogDetail {...task} />
    </aside>
  );
};

const AsideSelectCrew = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {notify} = useNotification();
  const {t} = useTranslation();
  const {data: task, update} = useTask({id});

  const assign = crewId => () => (
    update(Result.of({id: task.id, crew_id: crewId}))
    .fork(
      error => notify(
        <ErrorNotification heading={t`apiError`}>
          {errorToText(identity, error)}
        </ErrorNotification>
      ),
      pipe(
        () => notify(<SuccessNotification heading={t`success`} />),
        tap(() => navigate(TaskListRoute.props.path)),
      ),
    )
  );

  const crews = useSubscription(
    useMemo(() => GQL, []),
    useMemo(() => (
      getPath(['object', 'id'], task)
      .map(objOf('objectId'))
      .option(undefined)
    ), [task])
  );

  return (
    <aside className={'border-r border-gray-border h-full'}>
      {
        pipe(
          getPath(['data', 'crew']),
          chain(safe(isArray)),
          map(map(pipe(
            crew => ({
              key: crew.id,
              crew,
              crews,
              task,
              children: (
                <Button.Sm className='rounded-md py-1' onClick={assign(crew.id)}>
                  {t`assignTask`}
                </Button.Sm>
              ),
              title: JSON.stringify(crew, null, '  '), 
            }),
            renderWithProps(CrewDetail),
          ))),
          map(list => ({
            title: t`availableCrews`,
            children: list
          })),
          map(renderWithProps(Detail)),
          option(null),
        )(crews)
      }
    </aside>
  );
}

/**
 * RelatedUsers :: useTask() -> Array<Detal.Item>
 */
const RelatedUsers = useTask => (
  getPath(['object', 'users'], useTask)
  .chain(safe(isArray))
  .map(pipe(
    reduce((carry, item) => pipe(
      branch,
      bimap(pipe(getName, option('')), user => getPhone(user).alt(getEmail(user)).option('')),
      merge((name, phone) => ({
        key: `${name}${phone}`,
        left: name,
        right: phone
      })),
      a => setProp(a.key, a, carry),
    )(item), {}),
    Object.values,
    map(renderWithProps(Detail.Item)),
  ))
  .option(null)
);

const Address = pipe(
  getTaskAddress,
  map(str => <p key={str} className='text-steel'>{str}</p>),
  option(null),
);

const ObjectName = pipe(
  getProp('object'),
  chain(getObjectName),
  map(str => <p key={str} className='text-lg text-black'>{str}</p>),
  option(null),
);

export default TaskEditForm;
