import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import {KeyListRoute} from '../routes';
import SidebarLayout from 'layout/SideBarLayout';
import {getProp, identity, isFunction} from 'crocks';
import {useKey} from '../api';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import KeyRoute from '../routes';
import KeyEditForm from '../form/KeyEditForm';

const KeyEditLayout = () => {
  const saveRef = useRef(identity);
  const removeRef = useRef(identity);

  const {id} = useParams();
  const {data} = useKey({id});
  const {t} = useTranslation('Key', {keyPrefix: 'edit'});
  const nav = useNavigate();

  const send = () => {
    isFunction(saveRef.current) && saveRef.current();
  };

  const remove = () => { 
    if (!confirm('Are you sure you want to delete?')) return;
    
    isFunction(removeRef.current) && removeRef.current();
  }

  const breadcrumb = (
    getProp('name', data)
    .alt(getProp('id', data))
    .option(null)
  );

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={KeyRoute}/>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd onClick={() => nav(KeyListRoute.props.path)}>{t`cancel`}</Button.Nd>
            <Button onClick={send}>{t`save`}</Button>
          </div>
        </>
      </Header>
      
      <KeyEditForm saveRef={saveRef} removeRef={removeRef} />

      <Nullable on={id}>
        <section className={'flex p-6'}>
          <Button.NoBg onClick={remove} className={'bg-red-500 text-white w-min'}>{t`delete`}</Button.NoBg>
        </section>
      </Nullable>
      
    </SidebarLayout>
  )
};

export default KeyEditLayout;
