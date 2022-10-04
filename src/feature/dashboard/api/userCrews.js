import {createUseList} from 'api/buildApiHook';
import {pipe, maybeToAsync, getProp} from 'crocks';
import raw from 'raw.macro';

export const useCrews = createUseList({
  graphQl: raw('./graphql/GetCrews.graphql'),
  asyncMapFromApi: pipe(maybeToAsync('prop "crew" expected but not found.', getProp('crew')))
});