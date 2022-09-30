import React from 'react';
import AsideDisclosure from 'components/Disclosure/AsideDisclosure'
import Item from './Item';
import {curry, pipe, safe, map, chain, not, isEmpty, isArray, getPath} from 'crocks';
import {useTranslation} from 'react-i18next';
import {crewStatus} from 'constants/statuses';

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

export default function SidebarRight({crews}) {
  const {t} = useTranslation('dashboard');
  return (
    <>
      <div>
        {getPath(['data'], crews)
          .chain(detailsOf({title: t`right.active`}, (crew) => crew.status === crewStatus.CREW_READY && crew.user_settings?.some((el) => el.is_online) && (
            <AsideDisclosure.Item key={crew?.id}>
              <Item
                status={crew.status}
                abbreviation={crew.abbreviation}
                name={`${crew.abbreviation} ${crew.name}`}
                description={crew.permissions[0]?.request_id || crew.permissions[0]?.comment}
                isOnline={crew.user_settings?.some((el) => el.is_online === true)}
                connectionLost={new Date(crew.user_settings[0]?.last_ping).getMinutes()}
                duration={crew}
              />
            </AsideDisclosure.Item>
          )))
          .option(null)
        }
        {getPath(['data'], crews)
            .chain(detailsOf({title: t`right.in_break`}, (crew) => crew.status === crewStatus.CREW_BREAK && (
              <AsideDisclosure.Item key={crew?.id}>
                <Item 
                  status={crew.status}
                  abbreviation={crew.abbreviation}
                  name={`${crew.abbreviation} ${crew.name}`}
                  description={crew.permissions[0]?.request_id || crew.permissions[0]?.comment}
                  isOnline={crew.user_settings?.some((el) => el.is_online === true)}
                  connectionLost={new Date(crew.user_settings[0]?.last_ping).getMinutes()}
                  duration={crew}
                />
              </AsideDisclosure.Item>
            )))
            .option(null)
        }
        {getPath(['data'], crews)
          .chain(detailsOf({title: t`right.in_task`}, (crew) => crew.status === crewStatus.CREW_BUSY && (
            <AsideDisclosure.Item key={crew?.id}>
              <Item 
                status={crew.status}
                abbreviation={crew.abbreviation}
                name={`${crew.abbreviation} ${crew.name}`}
                description={crew.permissions[0]?.request_id || crew.permissions[0]?.comment}
                isOnline={crew.user_settings?.some((el) => el.is_online === true)}
                connectionLost={new Date(crew.user_settings[0]?.last_ping).getMinutes()}
                duration={crew}
              />
            </AsideDisclosure.Item>
          )))
          .option(null)
        }
        {getPath(['data'], crews)
          .chain(detailsOf({title: t`right.offline`}, (crew) => crew.status === crewStatus.CREW_OFFLINE && (
            <AsideDisclosure.Item key={crew?.id}>
              <Item 
                status={crew.status}
                abbreviation={crew.abbreviation}
                name={`${crew.abbreviation} ${crew.name}`}
                description={crew.permissions[0]?.request_id || crew.permissions[0]?.comment}
                isOnline={crew.user_settings?.some((el) => el.is_online === true)}
                connectionLost={new Date(crew.user_settings[0]?.last_ping).getMinutes()}
                durationTime={crew.timeLeft}
              />
            </AsideDisclosure.Item>
          )))
          .option(null)
        }
      </div>
    </>
  )
}
