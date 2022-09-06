import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import CrewEditForm from 'feature/crew/form/CrewEditForm';
import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import React, {useRef} from 'react';
import SideBarLayout from 'layout/SideBarLayout';
import {CrewListRoute} from 'feature/crew/routes';
import {getProp, identity, isFunction} from 'crocks';
import {useCrew} from 'feature/crew/api/crewEditApi';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Button from 'components/Button';
import DynamicStatus from '../../../components/atom/Status';

const CrewEditLayout = () => {
  const saveRef = useRef(identity);
  const removeRef = useRef(identity);
  const {id} = useParams();
  const navigate = useNavigate();
  const {data} = useCrew({id});
  const {t} = useTranslation('crew', {keyPrefix: 'edit.header'});
  const send = () => { isFunction(saveRef.current) && saveRef.current(); };

  const breadcrumb = (
    getProp('name', data)
      .alt(getProp('id', data))
      .option(null)
  );

  const status = (
    getProp('status', data)
      .option(null)
  );

  return (
    <SideBarLayout>
      <div className='flex flex-col min-h-full'>
        <Header>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={CrewListRoute} />
            <Nullable on={breadcrumb}>
              <Breadcrumbs.Item>
                <span className='font-semibold'>{breadcrumb}</span>
              </Breadcrumbs.Item>
              <Nullable on={status}>
                <DynamicStatus t={'crew'} className={'w-full px-2 text-xl items-center font-thin uppercase'} status={status} />
              </Nullable>
            </Nullable>
          </Breadcrumbs>
          <div className='space-x-4'>
            <Button.Sxl onClick={() => navigate(CrewListRoute.props.path)}>
              {t`button.cancel`}
            </Button.Sxl>
            <Button.Pxl onClick={send}>
              {t`button.save`}
            </Button.Pxl>
          </div>
        </Header>
        <CrewEditForm saveRef={saveRef} removeRef={removeRef} />
      </div>
    </SideBarLayout>
  );
};

export default CrewEditLayout;
