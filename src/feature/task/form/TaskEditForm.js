import {KeyIcon} from '@heroicons/react/solid';
import {augmentsToUsers} from 'api/buildUserQuery';
import Tag from 'components/atom/Tag';
import Button from 'components/Button';
import Detail from 'components/Disclosure/AsideDisclosure';
import {useAuth} from 'context/auth';
import {getPath, getProp, merge, pipe, branch, map, chain, safe, isTruthy, option, isArray, bimap, setProp, reduce, getPathOr, getPropOr, flip} from 'crocks';
import {GQL} from 'feature/crew/api/useCrewsForEvent';
import {getAddress, getObjectName} from 'feature/object/utils';
import {getEmail, getName, getPhone} from 'feature/user/utils';
import useAsyncSwr from 'hook/useAsyncSwr';
import useSubscription from 'hook/useSubscription';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {renderWithProps} from 'util/react';
import useTask from '../api/useTask';
import Map from 'feature/dashboard/components/Map';

/**
 * @TODO: Use the crews subscription to draw the right panel
 */
export const CrewName = ({crew}) => (
  getProp('name', crew)
  .map(value => <p key={value} className='text-black'>{value}</p>)
  .option(null)
)

export const CrewDriverName = ({crew, driverUsers}) => (
  getProp('driver_user_id', crew)
  .chain(safe(isTruthy))
  .chain(flip(getProp)(getPropOr({}, 'data', driverUsers)))
  .chain(getName)
  .map(value => <p key={value} className='text-steel'>{value}</p>)
  .option(null)
)

const TaskEditForm = () => {
  const {id} = useParams();
  const {t: to} = useTranslation('object');
  const task = useTask({id});
  const auth = useAuth();
  const {t} = useTranslation();
  const query = useMemo(() => GQL, []);
  const crews = useSubscription(query);
  const driverUsers = useAsyncSwr(crews, params => 
    augmentsToUsers(auth, getProp('driver_user_id'), getPathOr([], ['data', 'crew'], params))
    .map(reduce((carry, item) => setProp(item.id, item, carry), {}))
  );

  return (
    <section className='min-h-screen h-full flex w-screen'>
      <aside className='border-r border-gray-border h-full'>
        <div className='p-5 border-b border-gray-300 space-y-2'>
          <ObjectName {...task} />
          <Address {...task} />
        </div>
        <Detail title={to`edit.responsiblePeople`}>
          <RelatedUsers {...task} />
        </Detail>
      </aside>
      <div className='flex flex-col h-screen justify-between w-2/4 bg-gray-100'>
        <Map {...task} {...crews} />
      </div>
      <aside className='border-r border-gray-border h-full'>
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
                    {crew?.abbreviation || crew?.name || '?'}
                  </div>
                  <div className='flex-1'>
                    <CrewName crew={crew}/>
                    <CrewDriverName crew={crew} driverUsers={driverUsers}/>
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

/**
 * RelatedUsers :: useTask() -> Array<Detal.Item>
 */
const RelatedUsers = useTask => (
  getPath(['data', 'object', 'users'], useTask)
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
