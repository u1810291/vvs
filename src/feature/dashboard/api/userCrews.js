import {createUseList} from 'api/buildApiHook';
import {pipe, maybeToAsync, getProp, map, safe} from 'crocks';
import raw from 'raw.macro';

function findMaxDate(arr) {
  if (!arr.length) return {};
  const maxDate = Math.max(...arr?.map((e) => new Date(e.updated_at)));
  return arr?.find((el) => Math.max(new Date(el.updated_at)) === maxDate)
}
export const useCrews = createUseList({
  graphQl: raw('./graphql/GetCrews.graphql'),
  asyncMapFromApi: pipe(
    maybeToAsync('prop "crew" expected but not found.', getProp('crew')),
    map(pipe(
      safe(isArray)),
      map(map(a => ({
        id: a?.id,
        crew: a.abbreviation,
        name: `${a.name} ${a.abbreviation}`,
        status: a.status,
        dislocation: !!a.breaches?.length,
        breakStatus: findMaxDate(a?.permissions).status,
        distance: '13km',
        connection: a.user_settings
      }))),
      maybeToAsync('crews expected to be an array', ),
    ))
});