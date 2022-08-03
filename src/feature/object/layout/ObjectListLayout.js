import Breadcrumbs from 'components/Breadcrumbs';
import Listing from 'layout/ListingLayout';
import withPreparedProps from 'hoc/withPreparedProps';
import {ObjectEditRoute} from '../routes';
import {alt} from 'crocks/pointfree';
import {generatePath, Link} from 'react-router-dom';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useMemo} from 'react';
import {useObjects} from '../api';
import {useTranslation} from 'react-i18next';
import {
  Maybe,
  and,
  chain,
  curry,
  getProp,
  getPropOr,
  identity,
  isArray,
  isEmpty,
  isNil,
  map,
  not,
  objOf,
  pipe,
  safe,
} from 'crocks';

const getColumn = curry((t, Component, key, pred, mapper) => ({
  Component,
  headerText: t(key),
  key,
  itemToProps: item => pipe(
    getProp(key),
    chain(safe(pred)),
    map(mapper),
    map(objOf('children')),
    map(a => ({...item, ...a})),
    alt(Maybe.Just(item)),
  )(item),
}));

const nnil = not(isNil);
const ne = not(isEmpty);

const ObjectList = withPreparedProps(Listing, () => {
  const {t: tb} = useTranslation('object', {keyPrefix: 'breadcrumbs'});
  const {t} = useTranslation('object', {keyPrefix: 'list.column'});
  const swr = useObjects();

  const c = useMemo(() => getColumn(t, props => (
    <Link to={generatePath(ObjectEditRoute.props.path, {id: props?.id})}>
      {props?.children}
    </Link>
  )), [t]);

  return {
    list: safe(isArray, swr.data).option([]),
    rowKeyLens: getPropOr(0, 'id'),
    breadcrumbs: (
      <Breadcrumbs>
        <Breadcrumbs.Item><span className='font-semibold'>{tb`objects`}</span></Breadcrumbs.Item>
        <Breadcrumbs.Item>{tb`allData`}</Breadcrumbs.Item>
      </Breadcrumbs>
    ),
    tableColumns: [
      c('id', ne, identity),
      c('name', ne, identity),
      c('city', ne, titleCase),
      c('address', ne, identity),
      c('phone', ne, identity),
      c('longitude', nnil, identity),
      c('latitude', nnil, identity),
      c('contract_no', ne, identity),
      c('contract_object_no', ne, identity),
      c('provider_name', ne, titleCase),
      c('provider_id', isFinite, identity),
      c('navision_id',and(not(isEmpty), isFinite) , identity),
      c('is_atm', ne, bool => bool ? t('bool.yes') : t('bool.yes')),
    ],
  }
});

export default ObjectList;
