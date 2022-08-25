import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import SidebarLayout from 'layout/SideBarLayout';
import {getProp, identity, isFunction} from 'crocks';
import {useKeyBox} from '../api';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import {KeyBoxListRoute} from '../routes';
import KeyBoxEditForm from '../form/KeyBoxEditForm';

const KeyBoxEditLayout = () => {
  const saveRef = useRef(identity);
  const removeRef = useRef(identity);
  const assignRef = useRef(identity);
  const removeRelRef = useRef(identity);

  const {id} = useParams();
  const {data} = useKeyBox({id});
  const {t} = useTranslation('Key', {keyPrefix: 'edit'});
  const nav = useNavigate();

  const send = () => {
    isFunction(saveRef.current) && saveRef.current();
  };

  const remove = () => { 
    if (!confirm('Are you sure you want to delete?')) return;
    
    isFunction(removeRef.current) && removeRef.current([{id}]);
  }

  const breadcrumb = (
    getProp('set_name', data)
    .alt(getProp('id', data))
    .option(null)
  );

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={KeyBoxListRoute}/>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd onClick={() => nav(KeyBoxListRoute.props.path)}>{t`cancel`}</Button.Nd>
            <Button onClick={send}>{t`save`}</Button>
          </div>
        </>
      </Header>
      
      <div className='flex-1 flex-grow h-max'>
        <KeyBoxEditForm 
          saveRef={saveRef} 
          removeRef={removeRef} 
          assignRef={assignRef} 
          removeRelRef={removeRelRef}
        />
      </div>
      
      
      <Nullable on={id}>
        <section className={'flex p-6'}>
          <Button.NoBg onClick={remove} className={'bg-red-500 text-white w-min'}>{t`delete`}</Button.NoBg>
        </section>
      </Nullable>
      
    </SidebarLayout>
  )
};

export default KeyBoxEditLayout;
