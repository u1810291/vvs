import React from 'react';
import AsideDisclosure from 'components/Disclosure/AsideDisclosure'
import Item from './Item';
import {curry, pipe, safe, map, chain, not, isEmpty, isArray, getPath} from 'crocks';
import {useTranslation} from 'react-i18next';
import {eventStatus as status} from 'constants/statuses';

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
  return (
    <>
      <div>
        {getPath(['data'], tasks)
          .chain(detailsOf({title: t`left.not_assigned`}, (task) => task.status === status.EVENT_NEW && (
            <AsideDisclosure.Item key={task.id}>
              <Item
                status={task.status}
                name={task.name}
                description={task.address || task?.object?.address}
                address={task.address}
                abbreviation={task.provider_id}
              />
            </AsideDisclosure.Item>
          )))
          .option(t`left.no_events_found`)
        }
        {getPath(['data'], tasks)
          .chain(detailsOf({title: t`left.requests`}, (task) => task.status === status.EVENT_REQUESTS && (
            <AsideDisclosure.Item key={task.id}>
              <Item
                status={task.status}
                name={task.name}
                description={task.address || task?.object?.address}
                address={task.address}
                abbreviation={task.provider_id}
              />
            </AsideDisclosure.Item>
          )))
          .option(t`left.no_events_found`)
        }
        {getPath(['data'], tasks)
          .chain(detailsOf({title: t`left.wait_confirmation`}, (task) => task.status === status.EVENT_WAIT_FOR_CREW_APPROVAL && (
            <AsideDisclosure.Item key={task.id}>
              <Item
                status={task.status}
                name={task.name}
                description={task.address || task?.object?.address}
                address={task.address}
                abbreviation={task.provider_id}
              />
            </AsideDisclosure.Item>
          )))
          .option(t`left.no_events_found`)
        }
        {getPath(['data'], tasks)
          .chain(detailsOf({title: t`left.drives_facility`}, (task) => task.status === status.EVENT_ON_THE_ROAD && (
            <AsideDisclosure.Item key={task.id}>
              <Item
                status={task.status}
                name={task.name}
                description={task.address || task?.object?.address}
                address={task.address}
                abbreviation={task.provider_id}
              />
            </AsideDisclosure.Item>
          )))
          .option(t`left.no_events_found`)
        }
        {getPath(['data'], tasks)
          .chain(detailsOf({title: t`left.object_inspect`}, (task) => task.status === status.EVENT_INSPECTION && (
            <AsideDisclosure.Item key={task.id}>
              <Item
                status={task.status}
                name={task.name}
                description={task.address || task?.object?.address}
                address={task.address}
                abbreviation={task.provider_id}
              />
            </AsideDisclosure.Item>
          )))
          .option(t`left.no_events_found`)
        }
        {getPath(['data'], tasks)
          .chain(detailsOf({title: t`left.permission_to_return`}, (task) => task.status === status.EVENT_INSPECTION_DONE && (
            <AsideDisclosure.Item key={task.id}>
              <Item
                status={task.status}
                name={task.name}
                description={task.address || task?.object?.address}
                address={task.address}
                abbreviation={task.provider_id}
              />
            </AsideDisclosure.Item>
          )))
          .option(t`left.no_events_found`)
        }
        {getPath(['data'], tasks)
          .chain(detailsOf({title: t`left.canceled_by_responsible`}, (task) => task.status === status.EVENT_CANCELLED && (
            <AsideDisclosure.Item key={task.id}>
              <Item
                status={task.status}
                name={task.name}
                description={task.address || task?.object?.address}
                address={task.address}
                abbreviation={task.provider_id}
              />
            </AsideDisclosure.Item>
          )))
          .option(t`left.no_events_found`)
        }
      </div>
    </>
  )
}
