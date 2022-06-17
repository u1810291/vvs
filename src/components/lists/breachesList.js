import React, { useContext } from 'react';
import useLanguage from '../../hook/useLanguage';
import GlobalContext from '../../context/globalContext';
import useSort from '../../hook/useSort';
import { sortToggle } from '../../util/utils';
import { BreachesTestApi } from '../../api/breachesTest';
const { RedWatching } = require('../buttons/redWatching');
const { RedDriving } = require('../buttons/redDriving');
const { BlueStatus } = require('../buttons/blueStatus');
const { CancelStatus } = require('../buttons/darkBlueStatus');
const { GreenStatus } = require('../buttons/greenStatus');
const { GrayStatus } = require('../buttons/grayStatus');
const { YellowWaitingStatus } = require('../buttons/yellowWaiting');
const { InspectedStatus } = require('../buttons/yellowInspected');

export const BreachesList = ({
  id,
  date,
  timeOutOfZone,
  crew,
  drivers,
  ...props
}) => {
  const { english, lithuanian, t } = useLanguage();
  const { filterListBreaches, setFilterListBreaches } =
    useContext(GlobalContext);
  const { filterEditingBreaches, setFilterEditingBreaches } =
    useContext(GlobalContext);
  const { selectedFilterBreaches, setSelectedFilterBreaches } =
    useContext(GlobalContext);

  const {
    sortedDashboardKeys,
    sortedDashboardOrder,
    sortedDashboardDate,
    sortedDashboardCrew,
    sortedDashboardDrivers,
    sortedDashboardTimeOutOfZone,
  } = useSort();

  const sortedBreachesTestApi = sortToggle(
    BreachesTestApi,
    sortedDashboardKeys,
    sortedDashboardOrder
  );

  return (
    <>
      <div className='flex pl-4 w-full border-t py-2 bg-gray-100 justify-between font-normal text-black z-1'>
        <div className='flex col-span-3 flex-row items-center'>
          <button
            onClick={sortedDashboardDate}
            className='flex flex-row items-center'
          >
            <span className='text-gray-300'>{t('eurocash.dateFrom')}</span>
            <img
              src={require('../../assets/assets/down.png')}
              className='h-2 w-4 ml-2'
            />
          </button>
        </div>
        <div className='flex col-span-6 flex-row items-center'>
          <button
            onClick={sortedDashboardTimeOutOfZone}
            className='flex flex-row items-center'
          >
            <span className='text-gray-300'>{t('eurocash.timeOutOfZone')}</span>
          </button>
        </div>
        <div className='flex col-span-1 flex-row items-center'>
          <button
            onClick={sortedDashboardCrew}
            className='flex flex-row items-center'
          >
            <span className='text-gray-300'>{t('eurocash.crew')}</span>
          </button>
        </div>
        <div className='flex col-span-2 flex-row items-center'>
          <button
            onClick={sortedDashboardDrivers}
            className='flex flex-row items-center'
          >
            <span className='text-gray-300'>{t('eurocash.drivers')}</span>
          </button>
        </div>
      </div>
      <div className='pl-4 flex-col w-full items-center scrollbar-gone overflow-y-auto'>
        {sortedBreachesTestApi.map((data) => (
          <div className='w-full' {...props} key={data.id}>
            {filterListBreaches.map((filter, index) => {
              return (
                <div key={filter.id}>
                  {selectedFilterBreaches === filter.id ? (
                    <div className='flex w-full border-t py-2 bg-white justify-between font-normal text-black z-1'>
                      <div className='flex col-span-3 flex-row items-center h-16'>
                        {filter.breachesList.includes('Data nuo') ? (
                          <span className='bg-white text-gray-400 hover:text-gray-300 truncate'>
                            {data.date}
                          </span>
                        ) : null}
                      </div>
                      <div className='flex col-span-6 flex-row items-center h-16'>
                        {filter.breachesList.includes(
                          'Laikas už zonos ribų'
                        ) ? (
                          <span className='bg-white text-gray-400 hover:text-gray-300 truncate'>
                            {data.timeOutOfZone}
                          </span>
                        ) : null}
                      </div>
                      <div className='flex col-span-1 flex-row items-center h-16'>
                        {filter.breachesList.includes('Ekipažai') ? (
                          <span className='bg-white text-gray-400 hover:text-gray-300 truncate'>
                            {data.crew}
                          </span>
                        ) : null}
                      </div>
                      <div className='flex col-span-2 flex-row items-center h-16'>
                        {filter.breachesList.includes('Vairuotojai') ? (
                          <span className='bg-white text-gray-400 hover:text-gray-300 truncate'>
                            {data.drivers}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};
