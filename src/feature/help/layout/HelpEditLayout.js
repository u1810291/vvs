import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import Button from 'components/Button';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import SidebarLayout from 'layout/SideBarLayout';
import {getProp, identity, isFunction} from 'crocks';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';
import {HelpListRoute} from '../routes';
import useQuestion from '../api/useQuestion';
import HelpEditForm from '../form/HelpEditForm';
import DynamicStatus from 'components/atom/Status';
import {helpStatus} from 'constants/statuses';

const HelpEditLayout = () => {
  const saveRef = useRef(identity);

  const {id} = useParams();
  const {data} = useQuestion({id});
  const {t} = useTranslation('help', {keyPrefix: 'edit'});
  const nav = useNavigate();

  const send = () => {
    if (!confirm('Are you sure you want to complete?')) return;
    isFunction(saveRef.current) && saveRef.current();
  };

  const breadcrumb = (
    getProp('subject', data)
    .alt(getProp('id', data))
    .option(null)
  );

  const status = (
    getProp('status', data)
    .option(null)
  );



  return (
    <SidebarLayout>
      <Header>
        <>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={HelpListRoute}/>
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item hideSlash>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
            </Nullable>
            <Nullable on={status}>
              <DynamicStatus t={'help'} className={'w-full px-2 text-xl items-center font-thin uppercase'} status={status} />
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Nullable on={status !== helpStatus.HELP_COMPLETED}>
              <Button onClick={send}>{t`completed`}</Button>
            </Nullable>
          </div>
        </>
      </Header>      
      
      <HelpEditForm saveRef={saveRef} />
      
    </SidebarLayout>
  )
};

export default HelpEditLayout;
