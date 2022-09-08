import raw from 'raw.macro';
import {createUseWhereList} from 'api/buildApiHook';
import {maybeToAsync, pipe, getProp} from 'crocks';

export const useTasks = createUseWhereList({
  graphQl: raw('./graphql/GetTasks.graphql'),
  asyncMapFromApi: pipe(maybeToAsync('prop "event" expected but not found.', getProp('events')))
});

export const useTaskEdit = createUseWhereList({
  graphQl: raw('./graphql/GetTaskById.graphql'),
  asyncMapFromApi: pipe(maybeToAsync('prop "events_by_pk" expected but not found.', getProp('events_by_pk')))
})