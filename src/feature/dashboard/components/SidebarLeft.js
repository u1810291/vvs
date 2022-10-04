import React from 'react';
import AsideDisclosure from 'components/Disclosure/AsideDisclosure'
import Item from './Item';
import {curry, pipe, safe, map, chain, not, isEmpty, isArray, getPath} from 'crocks';
import {useTranslation} from 'react-i18next';
import {eventStatus as status} from 'constants/statuses';
import Button from 'components/Button';
import {useNavigate} from 'react-router-dom';

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

export default function SidebarRight({tasks}) {
  const {t} = useTranslation('dashboard');
  const nav = useNavigate();
  return (
    <>
      {getPath(['data','events'], tasks)
        .chain(detailsOf({title: t`left.not_assigned`, className: 'text-gray-400'}, (task) => task.status === status.EVENT_NEW && (
          <AsideDisclosure.Item key={task.id} className='bg-white p-4 border-b'>
            <Item
              title={task.name}
              description={task.address || task.object?.address}
              name={task.name}
              status={task.status}
              component={<Button.Sm className='max-h-1' onClick={() => nav(`/task/edit/${task.id}`)}>{t`left.assign`}</Button.Sm>}
            />
          </AsideDisclosure.Item>
        )))
        .option(null)}
      {getPath(['data','events'], tasks)
        .chain(detailsOf({title: t`left.requests`, className: 'text-gray-400'}, (task) => task.status === status.EVENT_REQUESTS && (
          <AsideDisclosure.Item key={task.id} className='bg-white p-4 border-b'>
            <Item
              title={task.name}
              description={task.address || task.object?.address}
              name={task.name}
              status={task.status}
              component={
                <div>
                  <Button.Sm className='max-h-1 bg-gray-200 mr-1 text-gray-600'>Some</Button.Sm>
                  <Button.Sm className='max-h-1' onClick={assignTask(task?.id)}>{t`left.assign`}</Button.Sm>
                </div>
              }
            />
          </AsideDisclosure.Item>
        )))
        .option(null)}
      {getPath(['data','events'], tasks)
        .chain(detailsOf({title: t`left.wait_confirmation`, className: 'text-gray-400'}, (task) => task.status === status.EVENT_WAIT_FOR_APPROVAL && (
          <AsideDisclosure.Item key={task.id} className='bg-white p-4 border-b'>
            <Item
              title={task.name}
              description={task.address || task.object?.address}
              name={task.name}
              status={task.status}
              waiting={12000}
            />
          </AsideDisclosure.Item>
        )))
        .option(null)}
      {getPath(['data','events'], tasks)
        .chain(detailsOf({title: t`left.drives_facility`, className: 'text-gray-400'}, (task) => task.status === status.EVENT_ON_THE_ROAD && (
          <AsideDisclosure.Item key={task.id} className='bg-white p-4 border-b'>
            <Item
              title={task.name}
              description={task.address || task.object?.address}
              name={task.name}
              status={task.status}
              distance='2.4 km'
            />
          </AsideDisclosure.Item>
        )))
        .option(null)}
      {getPath(['data','events'], tasks)
        .chain(detailsOf({title: t`left.object_inspect`, className: 'text-gray-400'}, (task) => task.status === status.EVENT_INSPECTION && (
          <AsideDisclosure.Item key={task.id} className='bg-white p-4 border-b'>
            <Item
              title={task.name}
              description={task.address || task.object?.address}
              name={task.name}
              status={task.status}
              waiting={36000}
            />
          </AsideDisclosure.Item>
        )))
        .option(null)}
      {getPath(['data','events'], tasks)
        .chain(detailsOf({title: t`left.permission_to_return`, className: 'text-gray-400'}, (task) => task.status === status.EVENT_INSPECTION_DONE && (
          <AsideDisclosure.Item key={task.id} className='bg-white p-4 border-b'>
            <Item
              title={task.name}
              description={task.address || task.object?.address}
              name={task.name}
              status={task.status}
              waiting={1200}
              component={<Button.Sm className='max-h-1' onClick={() => console.log('logged')}>{t`left.return`}</Button.Sm>}
            />
          </AsideDisclosure.Item>
        )))
        .option(null)}
      {getPath(['data','events'], tasks)
        .chain(detailsOf({title: t`left.canceled_by_responsible`, className: 'text-gray-400'}, (task) => task.status === status.EVENT_CANCELLED && (
          <AsideDisclosure.Item key={task.id} className='bg-white p-4 border-b'>
            <Item
              title={task.name}
              description={task.address || task.object?.address}
              name={task.name}
              status={task.status}
              component={<Button.Sm className='max-h-1' onClick={() => console.log('logged')}>{t`left.close`}</Button.Sm>}
            />
          </AsideDisclosure.Item>
        )))
        .option(null)}
    </>
  )
}
