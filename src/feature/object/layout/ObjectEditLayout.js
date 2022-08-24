import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import ObjectEditForm from '../form/ObjectEditForm';
import SidebarLayout from 'layout/SideBarLayout';
import {Maybe, getProp, identity, isFunction, safe} from 'crocks';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {ObjectListRoute} from '../routes';
import {hasLength} from '@s-e/frontend/pred';
import {useObject} from '../api';
import {useRef} from 'react';
import {useTranslation} from 'react-i18next';

const ObjectEditLayout = () => {
  const saveRef = useRef(identity);
  const {id} = useParams();
  const {data} = useObject({id});
  const {t} = useTranslation('object', {keyPrefix: 'edit'});
  const {t: tglobal} = useTranslation();
  const nav = useNavigate();

  const send = () => {
    isFunction(saveRef.current) && saveRef.current();
  };

  const breadcrumb = (
    getProp('name', data)
    .chain(safe(hasLength))
    .alt(getProp('id', data).chain(safe(hasLength)))
    .alt(Maybe.Just(t('new')))
    .option(null)
  );

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <Breadcrumbs.Item>
              <NavLink to={ObjectListRoute.props.path}>
                {tglobal(ObjectListRoute.props.translationKey, {ns: ObjectListRoute.props.translationNs})}
              </NavLink>
            </Breadcrumbs.Item>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item hasSlash={false}>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd onClick={() => nav(ObjectListRoute.props.path)}>{t`cancel`}</Button.Nd>
            <Button onClick={send}>{t`save`}</Button>
          </div>
        </>
      </Header>
      <ObjectEditForm saveRef={saveRef}/>
    </SidebarLayout>
  )
};

export default ObjectEditLayout;
