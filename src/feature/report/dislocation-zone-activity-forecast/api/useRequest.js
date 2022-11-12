import {createUseOne} from '../master-api/buildApiHook';
import {pipe, getProp, Async, pick, mapProps} from 'crocks';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import {map} from 'crocks/pointfree';
import raw from 'raw.macro';
import {getValue} from '../component/Locations';

const PROP = 'request_by_pk';

export default createUseOne({
  getGraphQl: raw('./graphql/GetRequestById.graphql'),
  createGraphQl: raw('./graphql/CreateRequest.graphql'),
  asyncMapFromApi: pipe(
    getProp(PROP),
    maybeToAsync(`prop "${PROP}" not found`),
    map(mapProps({locations: map(getValue)})),
    map(request => ({
      ...request,
      dateFromTo: [
        new Date(request.date_from),
        new Date(request.date_to)
      ]
    })),
  ),
  asyncMapToApi: pipe(
    a => ({
      ...a,
      date_from: a?.date_from || a?.dateFrom,
      date_to: a?.date_to || a?.dateTo,
    }),
    pick([
      'date_from',
      'date_to',
      'locations',
      'user_id',
    ]),
    Async.Resolved,
  )
});
