import React from 'react';
import DynamicIcon from './CrewIcon';
import {useTranslation} from 'react-i18next';
import {generatePath, Link, useNavigate} from 'react-router-dom';
import Button from 'components/Button';
import {flip, identity} from 'crocks';
import {useAuth} from 'context/auth';
import raw from 'raw.macro';
import {PermissionEditRoute} from 'feature/permission/routes';

export default function DashboardPermissionDetail({permission}) {
  const {t} = useTranslation('dashboard', {keyPrefix: 'left'});
  const nav = useNavigate();

  const auth = useAuth();
  const _update = flip(auth.api)(raw('../api/graphql/UpdatePermissionStatus.graphql'));

  // allow
  const allow = (e) => {
    e.preventDefault();
    _update({id: permission?.id, status: 'ALLOWED'}).fork(console.error, identity);
  }

  // decline
  const decline = (e) => {
    e.preventDefault();
    _update({id: permission?.id, status: 'REJECTED'}).fork(console.error, identity);
  }

  return (
    <Link to={generatePath(PermissionEditRoute.props.path, {id: permission?.id})}>
      <div className='flex flex-row justify-between w-full'>
        <div className='flex'>
          <DynamicIcon status={permission?.crew?.status} name={permission?.crew?.name} />

          <div className='flex flex-col text-black font-normal text-sm ml-2'>
            {permission?.crew?.name}
            <span className='text-xs text-gray-400'>{permission?.request_id}</span>
          </div>
        </div>

        <div className='flex space-x-2'>
          <Button.Sm onClick={decline} className='py-1 px-3 rounded-md bg-gray-300'>{t`decline`}</Button.Sm>
          <Button.Sm onClick={allow} className='py-1 px-3 rounded-md'>{t`allow`}</Button.Sm>
        </div>
      </div>
    </Link>
  )
}
