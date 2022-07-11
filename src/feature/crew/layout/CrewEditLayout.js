import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate, useParams} from 'react-router-dom';

import SideBarLayout from 'layout/SideBarLayout';

import Header from 'components/atom/Header';
import Nullable from 'components/atom/Nullable';
import HeaderButtonGroup from 'components/HeaderButtonGroup';
import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';

import {CrewListRoute} from 'feature/crew/routes';
import {useCrew} from 'feature/crew/api/crewEditApi';
import CrewEditForm from 'feature/crew/form/CrewEditForm';

import {getProp} from 'crocks';

const CrewEditLayout = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {data} = useCrew(params?.id);
  const {t} = useTranslation('crew', {keyPrefix: 'edit.header'});

  const onCancelButton = useCallback(() => navigate('/crew'), []);
  const onSaveButton = useCallback(() => {}, []);

  const breadcrumb = (
    getProp('abbreviation', data)
      .alt(getProp('id', data))
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
            </Nullable>
          </Breadcrumbs>
          <HeaderButtonGroup
            saveButtonText={t`button.save`}
            cancelButtonText={t`button.cancel`}
            onSaveButton={onSaveButton}
            onCancelButton={onCancelButton}
            twSaveButton={'text-white bg-slate-600'}
            twCancelButton={'mr-4 bg-gray-200 text-gray-500'}
          />
        </Header>
        <CrewEditForm />
      </div>
    </SideBarLayout>
  );
};

export default CrewEditLayout;
