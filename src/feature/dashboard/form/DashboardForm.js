import React, {useEffect} from 'react';

import Map from '../components/Map';
import {useTasks} from '../api/useTasks';
import {useCrews} from '../api/userCrews';
import AsideDisclosure from 'components/Disclosure/AsideDisclosure';
import {curry, pipe, safe, map, chain, not, isEmpty, isArray, getPath} from 'crocks';
import {useTranslation} from 'react-i18next';
import DynamicIcon from 'feature/crew/component/CrewIcon';
import Item from '../components/Item';
// import useSubscription from 'hook/useSubscription';

const detailsOf = curry((
  detailsProps,
  itemToProps,
  items
) => pipe(
  safe(isArray),
  map(map(itemToProps)),
  chain(safe(not(isEmpty))),
  map(listOfContacts => <AsideDisclosure {...detailsProps}>{listOfContacts}</AsideDisclosure>),
)(items));

const DashboardForm = () => {
  const {t} = useTranslation('dashboard');

  const tasks = useTasks();
  const crews = useCrews(); 
  // const dashboardSubscription = useSubscription()
  // console.log(dashboardSubscription);
  useEffect(() => {
    console.log(tasks.data, crews.data);
  }, [tasks?.data, crews?.data])
 
  return (
    <>
      <div className='flex flex-col h-screen justify-between scrollbar-gone overflow-y-auto w-1/4 bg-gray-100'>
        <aside className='border-l border-gray-border min-w-fit'>
          <AsideDisclosure title={t`right.title`}>
          {getPath(['data'], crews)
            .chain(detailsOf({title: t``}, crew => crew.status !== 'OFFLINE' && (
              <AsideDisclosure.Item
                key={crew?.id}
                left={<DynamicIcon status={crew.status} name={crew.name} />}
                right={<span>{crew?.phone_number || crew?.email || '—'}</span>}
              />
            )))
            .option(null)
          }
          </AsideDisclosure>
        </aside>
      </div>
      <div className='flex flex-col h-screen justify-between w-2/4 bg-gray-100'>
        <Map />
      </div>
      <div className='flex flex-col h-screen justify-between overflow-y-auto w-1/4 bg-gray-100'>
        <aside className='border-l border-gray-border min-w-fit'>
          <AsideDisclosure title={t`right.title`}>
          {getPath(['data'], crews)
            .chain(detailsOf({title: t``}, crew => crew.status !== 'OFFLINE' && (
              <AsideDisclosure.Item key={crew?.id}>
                <Item 
                  status={crew.status}
                  name={crew.name}
                  description={`${crew.abbreviation} ${crew.name}`}
                  isOnline={crew.user_settings?.some((el) => el.is_online === true)}
                  duration={crew}
                />
              </AsideDisclosure.Item>
            )))
            .option(null)
          }
          </AsideDisclosure>
        </aside>
      </div>
    </>
  );
};

export default DashboardForm;
