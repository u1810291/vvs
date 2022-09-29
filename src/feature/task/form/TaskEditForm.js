import {joinString} from '@s-e/frontend/transformer/array';
import Detail from 'components/Disclosure/AsideDisclosure';
import {getPath, getProp, merge, pipe, branch, map, chain, safe, and, isString, isTruthy, option, isArray, bimap, extend, curry, constant, alt, setProp, reduce} from 'crocks';
import {GQL} from 'feature/crew/api/useCrewsForEvent';
import {getAddress, getObjectName} from 'feature/object/utils';
import useSubscription from 'hook/useSubscription';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {renderWithProps} from 'util/react';
import useTask from '../api/useTask';

/**
 * @TODO: Use the crews subscription to draw the right panel
 */
const TaskEditForm = () => {
  const {id} = useParams();
  const {t: to} = useTranslation('object');
  const task = useTask({id});
  const query = useMemo(() => GQL, []);
  const crews = useSubscription(query);
  
  console.log(crews);

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
      <aside className={'border-r border-gray-border h-full'}>
      </aside>
    </section>
  );
};

/**
 * RelatedUsers :: useTask() -> Array<Detal.Item>
 */
const RelatedUsers = useTask => {
  const appendName = curry((prop, pair) => [
    ...pair.snd(),
    pipe(
      getProp(prop),
      chain(safe(and(isString, isTruthy))),
      map(a => a.trim()),
      option(''),
    )(pair.fst())
  ]);

  const constructNameFromProvider = pipe(
    branch,
    map(constant([])),
    extend(appendName('first_name')),
    extend(appendName('last_name')),
    merge((_, r) => r),
    joinString(' '),
    a => a.trim(),
    safe(isTruthy),
  );

  const constructNameFromAuth = pipe(
    branch,
    map(constant([])),
    extend(appendName('firstName')),
    extend(appendName('lastName')),
    merge((_, r) => r),
    joinString(' '),
    a => a.trim(),
    safe(isTruthy),
  );

  const getFullNameFromAuth = pipe(
    getProp('fullName'),
    chain(safe(isString)),
    map(a => a.trim()),
    chain(safe(isTruthy)),
  );

  const getUserName = user => pipe(
    constructNameFromProvider,
    alt(getFullNameFromAuth(user)),
    alt(constructNameFromAuth(user)),
    option(''),
  )(user);

  const getUserPhone = user => pipe(
    getProp('phone'),
    chain(safe(isString)),
    map(a => a.replace(/ /, '')),
    alt(getProp('email', user)),
    option('')
  )(user);

  const uniqueContacts = pipe(
    reduce((carry, item) => pipe(
      branch,
      bimap(getUserName, getUserPhone),
      merge((name, phone) => ({
        key: `${name}${phone}`,
        left: name,
        right: phone
      })),
      a => setProp(a.key, a, carry),
    )(item), {}),
    Object.values,
  )

  return (
    getPath(['data', 'object', 'users'], useTask)
    .chain(safe(isArray))
    .map(pipe(
      uniqueContacts,
      map(renderWithProps(Detail.Item)),
    ))
    .option(null)
  );
};

const Address = useTask => (
  getPath(['data', 'object'], useTask)
  .chain(getAddress)
  .alt(getProp('data', useTask).chain(getAddress))
  .map(str => <p key={str} className='text-steel'>{str}</p>)
  .option(null)
);

const ObjectName = useTask => (
  getPath(['data', 'object'], useTask)
  .chain(getObjectName)
  .map(str => <p key={str} className='text-lg text-black'>{str}</p>)
  .option(null)
);

export default TaskEditForm;
