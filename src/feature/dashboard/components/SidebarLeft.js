import React from 'react';
import AsideDisclosure from 'components/Disclosure/AsideDisclosure'
import {curry, pipe, safe, map, chain, not, isEmpty, isArray, getPath} from 'crocks';
import {useTranslation} from 'react-i18next';
import {eventStatus as status} from 'constants/statuses';
import {useNavigate} from 'react-router-dom';
import DashboardTaskDetail from './DashboardTaskDetail';
import DashboardPermissionDetail from './DashboardPermissionDetail';

const detailsOf = curry((
  detailsProps,
  itemToProps,
  items
) => pipe(
  safe(isArray),
  map(map(itemToProps)),
  chain(safe(not(isEmpty))),
  map(data => <AsideDisclosure {...detailsProps}>{data}</AsideDisclosure>),
)(items));

export default function SidebarRight({tasks, permissions}) {
  const {t} = useTranslation('dashboard');
  const nav = useNavigate();
  return (
    <>
      {getPath(['data', 'events'], tasks)
        .chain(detailsOf({title: t`left.not_assigned`, className: 'text-gray-400', isStatic: true}, (task) => task.status === status.EVENT_NEW && (
          <AsideDisclosure.Item key={task.id} className='bg-white p-4 border-b'>
            <DashboardTaskDetail
              task={task}
              id={task.id}
              title={task.name}
              description={task.address || task.object?.address}
              name={task.name}
              status={task.status}
            />
          </AsideDisclosure.Item>
        )))
        .option(null)}

      {getPath(['data', 'crew_permission'], permissions)
        .chain(detailsOf({title: t`left.requests`, className: 'text-gray-400', isStatic: true}, (permission) => (
          <AsideDisclosure.Item key={permission.id} className='bg-white p-4 border-b'>
            <DashboardPermissionDetail permission={permission} />
          </AsideDisclosure.Item>
        )))
        .option(null)}

      {getPath(['data', 'events'], tasks)
        .chain(detailsOf({title: t`left.wait_confirmation`, className: 'text-gray-400', isStatic: true}, (task) => task.status === status.EVENT_WAIT_FOR_APPROVAL && (
          <AsideDisclosure.Item key={task.id} className='bg-white p-4 border-b'>
            <DashboardTaskDetail
              task={task}
              id={task.id}
              title={task.name}
              description={task.address || task.object?.address}
              name={task.name}
              status={task.status}
            />
          </AsideDisclosure.Item>
        )))
        .option(null)}

      {getPath(['data', 'events'], tasks)
        .chain(detailsOf({title: t`left.drives_facility`, className: 'text-gray-400', isStatic: true}, (task) => task.status === status.EVENT_ON_THE_ROAD && (
          <AsideDisclosure.Item key={task.id} className='bg-white p-4 border-b'>
            <DashboardTaskDetail
              task={task}
              id={task.id}
              title={task.name}
              description={task.address || task.object?.address}
              name={task.name}
              status={task.status}
            />
          </AsideDisclosure.Item>
        )))
        .option(null)}

      {getPath(['data', 'events'], tasks)
        .chain(detailsOf({title: t`left.object_inspect`, className: 'text-gray-400', isStatic: true}, (task) => task.status === status.EVENT_INSPECTION && (
          <AsideDisclosure.Item key={task.id} className='bg-white p-4 border-b'>
            <DashboardTaskDetail
              task={task}
              id={task.id}
              title={task.name}
              description={task.address || task.object?.address}
              name={task.name}
              status={task.status}
            />
          </AsideDisclosure.Item>
        )))
        .option(null)}

      {getPath(['data', 'events'], tasks)
        .chain(detailsOf({title: t`left.permission_to_return`, className: 'text-gray-400', isStatic: true}, (task) => task.status === status.EVENT_INSPECTION_DONE && (
          <AsideDisclosure.Item key={task.id} className='bg-white p-4 border-b'>
            <DashboardTaskDetail
              task={task}
              id={task.id}
              title={task.name}
              description={task.address || task.object?.address}
              name={task.name}
              status={task.status}
            />
          </AsideDisclosure.Item>
        )))
        .option(null)}

      {getPath(['data', 'events'], tasks)
        .chain(detailsOf({title: t`left.canceled_by_responsible`, className: 'text-gray-400', isStatic: true}, (task) => task.status === status.EVENT_CANCELLED_BY_CLIENT && (
          <AsideDisclosure.Item key={task.id} className='bg-white p-4 border-b'>
            <DashboardTaskDetail
              task={task}
              id={task.id}
              title={task.name}
              description={task.address || task.object?.address}
              name={task.name}
              status={task.status}
            />
          </AsideDisclosure.Item>
        )))
        .option(null)}
    </>
  )
}
