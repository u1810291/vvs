import maybeToAsync from 'crocks/Async/maybeToAsync';
import raw from 'raw.macro';
import {createUseListWithAuthQuery} from '../master-api/buildApiHook';
import {pipe, getProp, chain, getPath, find, propEq} from 'crocks';
import {augmentsToUsersNoMerge} from 'api/buildUserQuery';

const PROP = 'request';

export default createUseListWithAuthQuery({
  graphQl: raw('./graphql/GetRequests.graphql'),
  asyncMapFromApi: auth => pipe(
    getProp(PROP),
    maybeToAsync(`structure "${PROP}" expected but not found`),
    chain(rs => (
      augmentsToUsersNoMerge(auth, getPath(['user', 'id']), rs)
      .map(users => rs.map(r => (
        find(propEq('id', r?.user?.id), users)
        .map(u => ({...r, user: {...u, ...r?.user}}))
        .option(r)
      )))
    )),
  ),
});
