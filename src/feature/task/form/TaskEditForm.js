import {KeyIcon} from '@heroicons/react/solid';
import {joinString} from '@s-e/frontend/transformer/array';
import {augmentsToUsers} from 'api/buildUserQuery';
import Tag from 'components/atom/Tag';
import Button from 'components/Button';
import Detail from 'components/Disclosure/AsideDisclosure';
import {useAuth} from 'context/auth';
import {getPath, getProp, merge, pipe, branch, map, chain, safe, and, isString, isTruthy, option, isArray, bimap, extend, curry, constant, alt, setProp, reduce, getPathOr, getPropOr, flip} from 'crocks';
import {GQL} from 'feature/crew/api/useCrewsForEvent';
import {getAddress, getObjectName} from 'feature/object/utils';
import useAsyncSwr from 'hook/useAsyncSwr';
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
  const auth = useAuth();
  const {t} = useTranslation();
  const query = useMemo(() => GQL, []);
  const crews = useSubscription(query);
  const drivers = useAsyncSwr(crews, params => 
    augmentsToUsers(auth, getProp('driver_user_id'), getPathOr([], ['data', 'crew'], params))
    .map(reduce((carry, item) => setProp(item.id, item, carry), {}))
  );

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
      {
        pipe(
          getPath(['data', 'crew']),
          chain(safe(isArray)),
          map(map(pipe(
            crew => ({
              key: crew.id,
              children: (
                <div className='flex items-start space-x-4 w-full'>
                  <div className='w-10 h-10 rounded-full border-green-700 border-4 truncate text-xs flex items-center justify-center'>
                    {crew?.abbreviation}
                  </div>
                  <div className='flex-1'>
                    {
                      getProp('name', crew)
                      .map(value => <p key={value} className='text-black'>{value}</p>)
                      .option(null)
                    }
                    {
                      getProp('driver_user_id', crew)
                      .chain(safe(isTruthy))
                      .chain(flip(getProp)(getPropOr({}, 'data', drivers)))
                      .map(getUserName)
                      .map(value => <p key={value} className='text-steel'>{value}</p>)
                      .option(null)
                    }
                  </div>
                  <div className='flex-col md:flex-row flex items-end md:items-start md:space-y-0 space-y-2 md:space-x-2'>
                    {(crew?.hasKey || true) && <KeyIcon className='w-5 h-5 text-gray-300' />}
                    {(crew?.ETA || true) && <Tag.Sm className='bg-gray-300 text-black whitespace-nowrap'>TODO {crew?.ETA || '23 min.'}</Tag.Sm>}
                    {(crew?.distanceToEvent || true) && <Tag.Sm className='bg-gray-300 text-black whitespace-nowrap'>TODO {crew?.ETA || '2.85 km'}</Tag.Sm>}
                    <Button.Sm>TODO: priskirti</Button.Sm>
                  </div>
                </div>
              ),
              title: JSON.stringify(crew, null, '  '), 
            }),
            renderWithProps(Detail.Item),
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
    </section>
  );
};

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

/**
 * RelatedUsers :: useTask() -> Array<Detal.Item>
 */
const RelatedUsers = useTask => {
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
