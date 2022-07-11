import React, {useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import Header from 'components/atom/Header';
import Breadcrumbs, {RouteAsBreadcrumb} from 'components/Breadcrumbs';
import SideBarLayout from 'layout/SideBarLayout';
import CrewEditForm from 'feature/crew/form/CrewEditForm';
import HeaderButtonGroup from 'components/HeaderButtonGroup';

import {CrewListRoute} from '../routes';

import {getCrewByIdQuery} from 'feature/crew/api/crewEditApi';

import {useAuth} from 'context/auth';
import {useTranslation} from 'react-i18next';
import {useAsyncEffect} from 'hook/useAsync';

import {alt} from 'crocks/pointfree';
import maybeToAsync from 'crocks/Async/maybeToAsync';
import {getProp, pipe, map, option, getPath, objOf, setProp, Async, identity} from 'crocks';

const CrewEditLayout = () => {
  const {api} = useAuth();
  const {Resolved} = Async;
  const params = useParams();
  const navigate = useNavigate();
  const {t: tb} = useTranslation('crew', {keyPrefix: 'edit.header'});

  const query = Resolved(getCrewByIdQuery);
  const queryVariables = pipe(
    getProp('id'),
    map(objOf('id')),
    maybeToAsync('"id" param is required in URL'),
  )(params);

  const a = useAsyncEffect(
    Async.of(v => q => api(v, q))
      .ap(queryVariables)
      .ap(query)
      .chain(identity),
    console.error,
    getProp('crew_by_pk'),
    [queryVariables, query],
  );

  const onCancelButton = useCallback(() => navigate('/crew'), []);
  const onSaveButton = useCallback(() => {}, []);

  return (
    <SideBarLayout>
      <div className='flex flex-col min-h-full'>
        <Header>
          <Breadcrumbs>
            <RouteAsBreadcrumb route={CrewListRoute} />
            {
              pipe(
                getPath(['data', 'crew_by_pk', 'name']),
                alt(getPath(['data', 'crew_by_pk', 'id'], a)),
                map(objOf('children')),
                map(setProp('className', 'font-semibold')),
                map(props => (
                  <Breadcrumbs.Item key={props.children}>
                    <span {...props} />
                  </Breadcrumbs.Item>
                )),
                option(null)
              )(a)
            }
          </Breadcrumbs>
          <HeaderButtonGroup
            saveButtonText={tb('button.save')}
            cancelButtonText={tb('button.cancel')}
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
