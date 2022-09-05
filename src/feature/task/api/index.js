import raw from 'raw.macro';
import {createUseWhereList} from 'api/buildApiHook';
import {maybeToAsync, pipe, getProp} from 'crocks';

export const useTasks = createUseWhereList({
  graphQl: raw('./graphql/GetTasks.graphql'),
  asyncMapFromApi: pipe(maybeToAsync('prop "event" expected but not found.', getProp('events')))
});
