import React from 'react';
import AsideDisclosure from 'components/Disclosure/AsideDisclosure'
import Item from './Item';
import {curry, pipe, safe, map, chain, not, isEmpty, isArray, getPath, option} from 'crocks';
import {useTranslation} from 'react-i18next';
import {crewStatus} from 'constants/statuses';
import {renderWithProps} from 'util/react';
import CrewDetail from 'feature/crew/component/CrewDetail';

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

export default function SidebarRight({crews, tasks}) {
  const {t} = useTranslation('dashboard');
  const activeCrew = (crew) => crew.status === crewStatus.CREW_READY || crew.status === crewStatus.CREW_BREAK;
  const events = pipe(
      getPath(['data', 'events']),
      chain(safe(isArray)),
      map(map((task) => task.status === 'NEW'? task : null)),
      option(null),
    )(tasks)
  console.log(events)
  return (
    <>
      <div>
      {
        pipe(
          getPath(['data']),
          chain(safe(isArray)),
          map(map(pipe(
            (crew) => ({
              key: crew.id,
              crew,
              crews,
              title: JSON.stringify(crew, null, '  '), 
            }),
            renderWithProps(CrewDetail),
          ))),
          map(list => ({
            title: t`right.active`,
            children: list
          })),
          map(renderWithProps(AsideDisclosure)),
          option(null),
        )(crews)
      }
        {/* {getPath(['data'], crews)
          .chain(detailsOf({title: t`right.active`, className: 'text-gray-400'}, (crew) => activeCrew(crew) && (
            <AsideDisclosure.Item key={crew?.id} className='bg-white p-4 border-b'>
              <Item
                name={crew.abbreviation}
                title={`${crew.abbreviation} ${crew.name}`}
                description={crew.permissions[0]?.request_id || crew.permissions[0]?.comment}
                isOnline={crew.user_settings?.some((el) => el.is_online === true)}
                connectionLost={crew.connectionLost}
                status={crew.status}
              />
            </AsideDisclosure.Item>
          )))
          .option()
        } */}
        {getPath(['data'], crews)
          .chain(detailsOf({title: t`right.in_task`, className: 'text-gray-400'}, (crew) => crew.status === crewStatus.CREW_BUSY && (
            <AsideDisclosure.Item key={crew?.id} className='bg-white p-4 border-b'>
              <Item
                name={crew.abbreviation}
                title={`${crew.abbreviation} ${crew.name}`}
                description={crew.permissions[0]?.request_id || crew.permissions[0]?.comment}
                isOnline={crew.user_settings?.some((el) => el.is_online === true)}
                connectionLost={new Date() - new Date(crew.user_settings[0]?.last_ping) > 60000}
                status={crew.status}
              />
            </AsideDisclosure.Item>
          )))
          .option(null)
        }
        {getPath(['data'], crews)
          .chain(detailsOf({title: t`right.offline`, className: 'text-gray-400'}, (crew) => crew.status === crewStatus.CREW_OFFLINE && (
            <AsideDisclosure.Item key={crew?.id} className='bg-white p-4 border-b'>
              <Item
                name={crew.abbreviation}
                title={`${crew.abbreviation} ${crew.name}`}
                description={crew.permissions[0]?.request_id || crew.permissions[0]?.comment}
                isOnline={crew.user_settings?.some((el) => el.is_online === true)}
                connectionLost={new Date() - new Date(crew.user_settings[0]?.last_ping) > 60000}
                status={crew.status}
              />
            </AsideDisclosure.Item>
          )))
          .option(null)
        }
      </div>
    </>
  )
}
