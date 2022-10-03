import {augmentsToUsers} from 'api/buildUserQuery';
import {useAuth} from 'context/auth';
import {getProp, getPropOr, safe, flip, isTruthy, setProp, reduce} from 'crocks';
import {getName} from 'feature/user/utils';
import useAsyncSwr from 'hook/useAsyncSwr';

const CrewDriverName = ({crews = {crewDriverName: 'use crews prop to get specific users-data'}, ...crew}) => {
  const auth = useAuth();
  const driverUsers = useAsyncSwr(crews, params => 
    augmentsToUsers(auth, getProp('driver_user_id'), getPathOr([], ['data', 'crew'], params))
    .map(reduce((carry, item) => setProp(item.id, item, carry), {}))
  );

  return (
    getProp('driver_user_id', crew)
    .chain(safe(isTruthy))
    .chain(flip(getProp)(getPropOr({}, 'data', driverUsers)))
    .chain(getName)
    .map(value => <p key={value} className='text-steel'>{value}</p>)
    .option(null)
  );
};

export default CrewDriverName;
