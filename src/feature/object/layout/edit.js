import Breadcrumbs from 'components/Breadcrumbs';
import Header from 'components/atom/Header';
import SidebarLayout from 'layout/SideBarLayout';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import useAsync, {useAsyncEffect} from 'hook/useAsync';
import withPreparedProps from 'hoc/withPreparedProps';
import {Link, useParams} from 'react-router-dom';
import {ObjectListRoute} from '../routes';
import {getProp, getPath, chain, ap, map, pipe, tap, Async, objOf, constant, curry, identity, setProp, isEmpty, not} from 'crocks';
import _ from 'crocks';
import {useAuth} from 'context/auth';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {bimap, merge, option} from 'crocks/pointfree';
import {renderWithProps} from 'util/react';
import InputGroup from 'components/atom/input/InputGroup';
import useResultForm from 'hook/useResultForm';
import {always} from 'util/func';
import SelectBox from 'components/atom/input/SelectBox';
import {titleCase} from '@s-e/frontend/transformer/string';

const QUERY = `
  query ObjectById ($id: uuid!) {
    object_by_pk(id: $id) {
      id
      name
    }
    city {
      value
    }
  }
`;

const Edit = ({breadcrumbs, children,...props}) => {
  return (
    <SidebarLayout>
      <Header>{breadcrumbs}</Header>
      {children}
    </SidebarLayout>
  )
};

const {Rejected, Resolved} = Async;

export default withPreparedProps(Edit, props => {
  const {api} = useAuth();
  const params = useParams();
  const {t: tb} = useTranslation('object');
  const {t} = useTranslation('object', {keyPrefix: 'edit'});

  const variables = pipe(
    getProp('id'),
    map(objOf('id')),
    maybeToAsync('"id" param is required in URL'),
  )(params);

  const query = Resolved(QUERY);

  const {ctrl, result, setForm} = useResultForm({
    address: {
      initial: '',
      validator: not(isEmpty),
      props: {
        label: always(t`address`),
        type: always('text'),
      }
    },
    name: {
      initial: '',
      validator: not(isEmpty),
      props: {
        label: always(t`name`),
        type: always('text'),
      }
    },
  });

  const a = useAsyncEffect(
    Async.of(v => q => api(v, q))
    .ap(variables)
    .ap(query)
    .chain(identity),
    console.error,
    pipe(
      tap(console.log),
      getProp('object_by_pk'),
      map(setForm)
    ),
    [variables, query],
  )

  return {
    ...props
    ,
    breadcrumbs: (
      <Breadcrumbs>
        {
          getProp('props', ObjectListRoute)
          .map(
            ({translationKey: tk, translationNs: ns, path}) => (
              <Breadcrumbs.Item key={path}>
                <Link to={path}>
                  {tb(tk, {ns, keyPrefix: ''})}
                </Link>
              </Breadcrumbs.Item>
            )
          )
          .option(null)
        }
        {
          getPath(['data', 'name'], a)
            .alt(getPath(['data', 'id'], a))
            .map(objOf('children'))
            .map(setProp('className', 'font-semibold'))
            .map(props => (
              <Breadcrumbs.Item  key={props.children}>
                <span {...props} />
              </Breadcrumbs.Item>
            ))
            .option(null)
        }
      </Breadcrumbs>
    ),
    children: (
      <div className='p-2'>
        <InputGroup {...ctrl('name')}/>
        <InputGroup {...ctrl('address')}/>
        <SelectBox value='VILNIUS' label='city'>
          {
            pipe(
              getPath(['data', 'city']),
              map(map(pipe(
                a => a.value,
                str => (
                  <SelectBox.Option value={str} key={str}>
                    {titleCase(str)}
                  </SelectBox.Option>
                ))
              )),
              option(null),
            )(a)
          }
        </SelectBox>
      </div>
    )
  };
});
