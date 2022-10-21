import React from 'react';
import AsideDisclosure from 'components/Disclosure/AsideDisclosure'
import {curry, pipe, safe, map, chain, not, isEmpty, isArray, getPath} from 'crocks';
import {useTranslation} from 'react-i18next';
import {crewStatus} from 'constants/statuses';
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

export default function SidebarRight({crews}) {
  const {t} = useTranslation('dashboard');
  const activeCrew = (crew) => [crewStatus.CREW_READY, crewStatus.CREW_BREAK, crewStatus.CREW_DRIVE_BACK].includes(crew?.status);
  return (
    <>
      <div>
        {getPath(['data'], crews)
          .chain(detailsOf({title: t`right.active`, className: 'text-gray-400', isStatic: true}, (crew) => activeCrew(crew) && (
            <AsideDisclosure.Item key={crew?.id} className='bg-white'>
              <CrewDetail crew={crew} />
            </AsideDisclosure.Item>
          )))
          .option()
        }
        {getPath(['data'], crews)
          .chain(detailsOf({title: t`right.in_task`, className: 'text-gray-400', isStatic: true}, (crew) => crew.status === crewStatus.CREW_BUSY && (
            <AsideDisclosure.Item key={crew?.id} className='bg-white'>
              <CrewDetail crew={crew} />
            </AsideDisclosure.Item>
          )))
          .option(null)
        }
        {getPath(['data'], crews)
          .chain(detailsOf({title: t`right.offline`, className: 'text-gray-400'}, (crew) => crew.status === null && (
            <AsideDisclosure.Item key={crew?.id} className='bg-white'>
              <CrewDetail crew={crew} />
            </AsideDisclosure.Item>
          )))
          .option(null)
        }
      </div>
    </>
  )
}
