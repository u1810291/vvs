import {createUseOne, mapToNullableString} from '../../../api/buildApiHook';
import raw from 'raw.macro';
import {Async, getProp, mapProps, pick, pipe} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';

const {Resolved} = Async;

export default createUseOne({
  createGraphql: raw('./graphql/CreateDriverSettings.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('expected prop "insert_user_settings_one" does not exist', getProp('insert_user_settings_one'))
  ),
  asyncMapToApi: pipe(
    pick(['id']),
    mapProps({id: mapToNullableString}),
    Resolved
  )
});
