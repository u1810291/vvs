import Breadcrumbs from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import {TaskTypeListRoute} from '../routes';
import SidebarLayout from 'layout/SideBarLayout';
import {getProp, identity, isFunction} from 'crocks';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import TaskTypeEditForm from '../form/TaskTypeEditForm';
import {useTaskType} from '../api';
import {Link} from 'react-router-dom';




const TaskTypeEditLayout = () => {
  const saveRef = useRef(identity);
  const removeRef = useRef(identity);

  const {id} = useParams();
  const {data} = useTaskType({id});

  const {t} = useTranslation('classifier', {keyPrefix: 'edit'});
  const nav = useNavigate();

  const send = () => {
    isFunction(saveRef.current) && saveRef.current();
  };

  const remove = () => {
    if (!confirm('Are you sure you want to delete?')) return;

    isFunction(removeRef.current) && removeRef.current([{id}]);
  };

  const breadcrumb = (
    getProp('value', data)
    .alt(getProp('id', data))
    .option(null)
  );

  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            {/* <RouteAsBreadcrumb route={TaskTypeListRoute}/> */}
            <Breadcrumbs.Item>
              <Link to={TaskTypeListRoute.props.path}>
                {t('classifiers')}
              </Link>
            </Breadcrumbs.Item>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Nd onClick={() => nav(TaskTypeListRoute.props.path)}>{t`cancel`}</Button.Nd>
            <Button onClick={send}>{t`save`}</Button>
          </div>
        </>
      </Header>
      

      <div className='flex-1 flex-grow h-max'>
        <TaskTypeEditForm saveRef={saveRef} removeRef={removeRef} />
      </div>
      
      
      <Nullable on={id}>
        <section className={'flex p-6'}>
          <Button.NoBg onClick={remove} className={'bg-red-500 text-white w-min'}>{t`delete`}</Button.NoBg>
        </section>
      </Nullable>

    </SidebarLayout>
  )
};

export default TaskTypeEditLayout;
