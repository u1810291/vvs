import React from 'react';
import AsideDisclosure from 'components/Disclosure/AsideDisclosure'
import {curry, pipe, safe, map, chain, not, isEmpty, isArray, getPath, option} from 'crocks';
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
  map(data => <div {...detailsProps}>{data}</div>),
)(items));

export default function SidebarRight({crews, offlineCrews}) {
  const {t} = useTranslation('dashboard');
  const activeCrew = (crew) => [crewStatus.CREW_READY, crewStatus.CREW_BREAK, crewStatus.CREW_DRIVE_BACK].includes(crew?.status);

  console.log({offlineCrews});

  return (
    <>
      <div>
        {/* ACTIVE */}
        <AsideDisclosure title={t`right.active`} className='text-gray-400' isStatic={true}>
          {
            getPath(['data'], crews)
            .chain(detailsOf({}, (crew) => (
              <AsideDisclosure.Item key={crew?.id} className='bg-white'>
                {activeCrew(crew) && <CrewDetail crew={crew} />}
              </AsideDisclosure.Item>
            )))
            .option()
          }
        </AsideDisclosure>
        
        {/* IN TASK */}
        <AsideDisclosure title={t`right.in_task`} className='text-gray-400' isStatic={true}>
          {
            getPath(['data'], crews)
            .chain(detailsOf({}, (crew) => (
              <AsideDisclosure.Item key={crew?.id} className='bg-white'>
                {crew.status === crewStatus.CREW_BUSY && <CrewDetail crew={crew} />}
              </AsideDisclosure.Item>
            )))
            .option()
          }
        </AsideDisclosure>

        {/* OFFLINE crew */}
        <AsideDisclosure title={t`right.offline`} className='text-gray-400'>
          {
            pipe(
              safe(isArray),
              chain(detailsOf({}, (crew) => (
                <AsideDisclosure.Item key={crew?.id} className='bg-white'>
                  <CrewDetail crew={crew} />
                </AsideDisclosure.Item>
              ))),
              option(null)
            )(offlineCrews)
          }
        </AsideDisclosure>
      </div>
    </>
  )
}
