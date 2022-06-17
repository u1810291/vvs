import Listing from '../Listing';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import {renderWithProps} from '../../util/react';
import {titleCase} from '@s-e/frontend/transformer/string';
import {
  Async,
  and,
  bichain,
  chain,
  curry,
  defaultProps,
  getProp,
  getPropOr,
  hasProp,
  ifElse,
  isEmpty,
  map,
  not,
  objOf,
  option,
  pipe,
  safe,
} from 'crocks';

const {Rejected, Resolved, fromPromise} = Async;

/**
 * TODO: either:
 *
 * A) integrate inside default fetcher
 * B) export as a chainable for reuse
 */
const asyncHasuraResponse = pipe(
  ifElse(
    hasProp('data'),
    Async.Resolved,
    Async.Rejected,
  ),
  bichain(
    pipe(
      getPropOr('unknown error', 'errors'),
      Rejected,
    ),
    pipe(
      getPropOr([], 'data'),
      Resolved,
    )
  ),
  chain(maybeToAsync('object property is expected', getProp('object'))),
);

/**
 * TODO:
 *
 * Cleanup fetching packages,
 * leave out only SWR.
 *
 * Create a default fetcher from this
 * that is able to have * authorization header by default.
 */
const fqgl = curry((headers, query, variables) => fromPromise(() => fetch(
    'https://ec.swarm.testavimui.eu/v1/graphql',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'secret',
        ...(headers || {}),
      },
      body: JSON.stringify({query, variables})
    }
))());

const ObjectList = pipe(
  defaultProps({
    /**
     * TODO: adjust acording the to-be fetcher
     */
    asyncGetter: (
      fqgl(
        undefined,
        `
      query ($cityEnum: city_enum) {
        object (where: {city: {_eq: $cityEnum}}) {
          address
          city
          contract_no
          contract_object_no
          id
          is_atm
          longitude
          latitude
          name
          provider_name
          provider_id
          phone
          navision_id
        }
      }
      `,
        {cityEnum: 'VILNIUS'},
      )
      .chain(fromPromise(r => r.json()))
      .chain(asyncHasuraResponse)
    ),

    rowKeyLens: getPropOr(0, 'id'),

    /**
     * TODO: Optimize itemPropMapper & Component
     */
    tableColums: [
      {
        key: 'id',
        headerText: 'ID',
        itemPropMapper: pipe(
          getProp('id'),
          chain(safe(not(isEmpty))),
          option('-'),
          objOf('children')
        ),
        Component: props => <span {...props} />,
      },
      {
        key: 'address',
        headerText: 'Adresas',
        itemPropMapper: pipe(
          getProp('address'),
          chain(safe(not(isEmpty))),
          option('-'),
          objOf('children'),
        ),
        Component: props => <span {...props}/>,
      },
      {
        key: 'city',
        headerText: 'Miestas',
        itemPropMapper: pipe(
          getProp('city'),
          chain(safe(not(isEmpty))),
          map(titleCase),
          option('-'),
          objOf('children')
        ),
        Component: props => <span {...props} />,
      },
      {
        key: 'contract_no',
        headerText: 'Nr.',
        itemPropMapper: pipe(
          getProp('contract_no'),
          chain(safe(not(isEmpty))),
          option('-'),
          objOf('children')
        ),
        Component: props => <span {...props} />,
      },
      {
        key: 'contract_object_no',
        headerText: 'Sutarties Nr.',
        itemPropMapper: pipe(
          getProp('contract_object_no'),
          chain(safe(not(isEmpty))),
          option('-'),
          objOf('children')
        ),
        Component: props => <span {...props} />,
      },
      {
        key: 'is_atm',
        headerText: 'ATM',
        itemPropMapper: pipe(
          getProp('is_atm'),
          map(t => t ? 'Taip' : 'Ne'),
          option('-'),
          objOf('children')
        ),
        Component: props => <span {...props} />,
      },
      {
        key: 'longitude',
        headerText: 'Ilguma',
        itemPropMapper: pipe(
          getProp('longitude'),
          chain(safe(not(isEmpty))),
          option('-'),
          objOf('children')
        ),
        Component: props => <span {...props} />,
      },
      {
        key: 'latitude',
        headerText: 'Platuma',
        itemPropMapper: pipe(
          getProp('latitude'),
          chain(safe(not(isEmpty))),
          option('-'),
          objOf('children')
        ),
        Component: props => <span {...props} />,
      },
      {
        key: 'name',
        headerText: 'Pavadinimas',
        itemPropMapper: pipe(
          getProp('name'),
          chain(safe(not(isEmpty))),
          option('-'),
          objOf('children')
        ),
        Component: props => <span {...props} />,
      },
      {
        key: 'provider_name',
        headerText: 'Tiekėjas',
        itemPropMapper: pipe(
          getProp('provider_name'),
          chain(safe(not(isEmpty))),
          map(titleCase),
          option('-'),
          objOf('children')
        ),
        Component: props => <span {...props} />,
      },
      {
        key: 'provider_id',
        headerText: 'Tiekėjo ID',
        itemPropMapper: pipe(
          getProp('provider_id'),
          chain(safe(isFinite)),
          option('-'),
          objOf('children')
        ),
        Component: props => <span {...props} />,
      },
      {
        key: 'phone',
        headerText: 'Telefonas',
        itemPropMapper: pipe(
          getProp('phone'),
          chain(safe(not(isEmpty))),
          option('-'),
          objOf('children')
        ),
        Component: props => <span {...props} />,
      },
      {
        key: 'navision_id',
        headerText: 'Navision ID',
        itemPropMapper: pipe(
          getProp('navision_id'),
          chain(safe(and(not(isEmpty), isFinite))),
          option('-'),
          objOf('children')
        ),
        Component: props => <span {...props} />,
      },
    ]
  }),
  renderWithProps(Listing),
);

export default ObjectList;
