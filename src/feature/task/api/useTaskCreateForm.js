import {createUseList} from 'api/buildApiHook';
import raw from 'raw.macro';
import {
  Async,
  map,
  mapProps,
  pipe,
} from 'crocks';

export const useCreateTask = createUseList({
  graphQl: raw('./graphql/GetTaskCreateForm.graphql'),
  asyncMapFromApi: pipe(
    mapProps({
      crews: map(({id, name}) => ({value: id, text: name})),
      types: map(({value}) => value)
    }),
    Async.Resolved,
  ),
});
