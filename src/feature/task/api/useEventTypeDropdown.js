import {titleCase} from '@s-e/frontend/transformer/string';
import {createUseList} from 'api/buildApiHook';
import {getProp, ifElse, isEmpty, safe, not, option, pipe, maybeToAsync, map} from 'crocks';
import raw from 'raw.macro';


export default createUseList({
  graphQl: raw('./graphql/EventTypes.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "event_type" was expected', getProp('event_type')),
    map(ifElse(isEmpty, () => [], map(a => ({value: a.value, name: titleCase(a.value)})))),
    safe(not(isEmpty)),
    option([])
  ),
});
