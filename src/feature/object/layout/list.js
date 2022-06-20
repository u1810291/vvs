import Listing from 'layout/Listing';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import {titleCase} from '@s-e/frontend/transformer/string';
import {
  and,
  chain,
  curry,
  getProp,
  getPropOr,
  identity,
  isEmpty,
  map,
  not,
  objOf,
  pipe,
  safe,
} from 'crocks';
import {withAuthorizedHook} from 'hoc/withAuthorizedHook';

const Span = props => <span {...props}/>;

const QUERY = `
  query {
    object {
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
`;

const extractObject = maybeToAsync(
  '"object" prop is expected in the response',
  getProp('object')
);

const ObjectList = () => withAuthorizedHook(
  Listing,
  ({apiQuery}) => ({
    asyncGetter: apiQuery(QUERY).chain(extractObject)
  }),
  {
    rowKeyLens: getPropOr(0, 'id'),
    tableColumns: [
      {
        key: 'id',
        headerText: 'ID',
        itemToProps: pipe(
          getProp('id'),
          chain(safe(not(isEmpty))),
          map(objOf('children')),
        ),
        Component: Span,
      },
      {
        key: 'address',
        headerText: 'Adresas',
        itemToProps: pipe(
          getProp('address'),
          chain(safe(not(isEmpty))),
          map(objOf('children')),
        ),
        Component: Span,
      },
      {
        key: 'city',
        headerText: 'Miestas',
        itemToProps: pipe(
          getProp('city'),
          chain(safe(not(isEmpty))),
          map(titleCase),
          map(objOf('children')),
        ),
        Component: Span,
      },
      {
        key: 'contract_no',
        headerText: 'Nr.',
        itemToProps: pipe(
          getProp('contract_no'),
          chain(safe(not(isEmpty))),
          map(objOf('children')),
        ),
        Component: Span,
      },
      {
        key: 'contract_object_no',
        headerText: 'Sutarties Nr.',
        itemToProps: pipe(
          getProp('contract_object_no'),
          chain(safe(not(isEmpty))),
          map(objOf('children')),
        ),
        Component: Span,
      },
      {
        key: 'is_atm',
        headerText: 'ATM',
        itemToProps: pipe(
          getProp('is_atm'),
          map(t => t ? 'Taip' : 'Ne'),
          map(objOf('children')),
        ),
        Component: Span,
      },
      {
        key: 'longitude',
        headerText: 'Ilguma',
        itemToProps: pipe(
          getProp('longitude'),
          chain(safe(not(isEmpty))),
          map(objOf('children')),
        ),
        Component: Span,
      },
      {
        key: 'latitude',
        headerText: 'Platuma',
        itemToProps: pipe(
          getProp('latitude'),
          chain(safe(not(isEmpty))),
          map(objOf('children')),
        ),
        Component: Span,
      },
      {
        key: 'name',
        headerText: 'Pavadinimas',
        itemToProps: pipe(
          getProp('name'),
          chain(safe(not(isEmpty))),
          map(objOf('children')),
        ),
        Component: Span,
      },
      {
        key: 'provider_name',
        headerText: 'Tiekėjas',
        itemToProps: pipe(
          getProp('provider_name'),
          chain(safe(not(isEmpty))),
          map(titleCase),
          map(objOf('children')),
        ),
        Component: Span,
      },
      {
        key: 'provider_id',
        headerText: 'Tiekėjo ID',
        itemToProps: pipe(
          getProp('provider_id'),
          chain(safe(isFinite)),
          map(objOf('children')),
        ),
        Component: Span,
      },
      {
        key: 'phone',
        headerText: 'Telefonas',
        itemToProps: pipe(
          getProp('phone'),
          chain(safe(not(isEmpty))),
          map(objOf('children')),
        ),
        Component: Span,
      },
      {
        key: 'navision_id',
        headerText: 'Navision ID',
        itemToProps: pipe(
          getProp('navision_id'),
          chain(safe(and(not(isEmpty), isFinite))),
          map(objOf('children')),
        ),
        Component: Span,
      },
    ],
  }
);

export default ObjectList;
