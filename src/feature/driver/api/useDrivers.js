import {createUseList} from 'api/buildApiHook';
import {pipe, getProp} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import raw from 'raw.macro';

const LIST_PROP = '';

export default createUseList({
  graphQl: raw('./graphql/GetDrivers.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync(`expected prop "${LIST_PROP}" to exist`, getProp(LIST_PROP))
  ),
});
