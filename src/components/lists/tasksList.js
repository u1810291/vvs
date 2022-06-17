import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import GlobalContext from '../../context/globalContext';
import { DashboardTestApi } from '../../mocks/dashboardTest';
import useSort from '../../hook/useSort';
import { sortToggle } from '../../util/utils';
const { RedWatching } = require('../buttons/redWatching');
const { RedDriving } = require('../buttons/redDriving');
const { BlueStatus } = require('../buttons/blueStatus');
const { CancelStatus } = require('../buttons/darkBlueStatus');
const { GreenStatus } = require('../buttons/greenStatus');
const { GrayStatus } = require('../buttons/grayStatus');
const { YellowWaitingStatus } = require('../buttons/yellowWaiting');
const { InspectedStatus } = require('../buttons/yellowInspected');

export const TasksList = () => {
const { filterList, setFilterList } = useContext(GlobalContext);
  const { filterEditing, setFilterEditing } = useContext(GlobalContext);
  const { selectedFilter, setSelectedFilter } = useContext(GlobalContext);

  const {
    sortedDashboardKeys,
    sortedDashboardOrder,
    sortedDashboardDate,
    sortedDashboardObject,
    sortedDashboardName,
    sortedDashboardCrew,
    sortedDashboardInTime,
    sortedDashboardReactionTime,
    sortedDashboardTimeInObject,
    sortedDashboardStatus,
    sortedDashboardReason,
  } = useSort();

  const sortedDashboardTestApi = sortToggle(
    DashboardTestApi,
    sortedDashboardKeys,
    sortedDashboardOrder
  );

  return (
    <>
      {filterList.map((filter, index) => {
        return (
          <div key={filter.id}>
            {selectedFilter === filter.id ? (
              <div className='flex pl-4 w-full border-t py-2 bg-gray-100 justify-between font-normal text-black z-1'>
                {filter.dashboardList.includes('Gauta') ? (
                  <>
                    <button
                      onClick={sortedDashboardDate}
                      className='flex flex-row items-center justify-start w-40'
                    >
                      <span className='text-gray-300 text-sm hover:text-gray-400'>
                        Gauta
                      </span>
                      <img
                        src={require('../../assets/assets/down.png')}
                        className='h-2 w-4 ml-2'
                      />
                    </button>
                  </>
                ) : null}
                {filter.dashboardList.includes('Objektas') ? (
                  <button
                    onClick={sortedDashboardObject}
                    className='flex flex-row items-center justify-start w-40'
                  >
                    <span className='text-gray-300 text-sm hover:text-gray-400'>
                      Objektas
                    </span>
                  </button>
                ) : null}
                {filter.dashboardList.includes('Pavadinimas') ? (
                  <button
                    onClick={sortedDashboardName}
                    className='flex flex-row items-center justify-start w-40'
                  >
                    <span className='text-gray-300 text-sm hover:text-gray-400'>
                      Pavadinimas
                    </span>
                  </button>
                ) : null}
                {filter.dashboardList.includes('Ekipažas') ? (
                  <button
                    onClick={sortedDashboardCrew}
                    className='flex flex-row items-center justify-start w-40'
                  >
                    <span className='text-gray-300 text-sm hover:text-gray-400'>
                      Ekipažas
                    </span>
                  </button>
                ) : null}
                {filter.dashboardList.includes('Spėjo laiku') ? (
                  <button
                    onClick={sortedDashboardInTime}
                    className='flex flex-row items-center justify-start w-40'
                  >
                    <span className='text-gray-300 text-sm hover:text-gray-400'>
                      Spėjo laiku
                    </span>
                  </button>
                ) : null}
                {filter.dashboardList.includes('Reagavimo laikas') ? (
                  <button
                    onClick={sortedDashboardReactionTime}
                    className='flex flex-row items-center justify-start w-40'
                  >
                    <span className='text-gray-300 text-sm hover:text-gray-400'>
                      Reagavimo laikas
                    </span>
                  </button>
                ) : null}
                {filter.dashboardList.includes('Laikas objekte') ? (
                  <button
                    onClick={sortedDashboardTimeInObject}
                    className='flex flex-row items-center justify-start w-40'
                  >
                    <span className='text-gray-300 text-sm hover:text-gray-400'>
                      Laikas objekte
                    </span>
                  </button>
                ) : null}
                {filter.dashboardList.includes('Būsena') ? (
                  <button
                    onClick={sortedDashboardStatus}
                    className='flex flex-row items-center justify-start w-40'
                  >
                    <span className='text-gray-300 text-sm hover:text-gray-400'>
                      Būsena
                    </span>
                  </button>
                ) : null}
                {filter.dashboardList.includes('Suveikimo priežastis') ? (
                  <button
                    onClick={sortedDashboardReason}
                    className='flex flex-row items-center justify-start w-40'
                  >
                    <span className='text-gray-300 text-sm hover:text-gray-400'>
                      Suveikimo priežastis
                    </span>
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}

      <div className='pl-4 flex-col w-full items-center'>
        {sortedDashboardTestApi.map((data) => (
          <div className='w-full' key={data.id}>
            {filterList.map((filter, index) => {
              return (
                <div key={filter.id}>
                  {selectedFilter === filter.id ? (
                    <div className='flex w-full border-t py-2 bg-white justify-between font-normal text-black z-1'>
                      {filter.dashboardList.includes('Gauta') ? (
                        <div className='flex flex-row justify-start items-center h-12 w-40 '>
                          <span className='bg-white text-sm text-gray-400 truncate hover:text-gray-500'>
                            {data.date}
                          </span>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes('Objektas') ? (
                        <div className='flex flex-row justify-start items-center h-12 w-40'>
                          <span className='bg-white text-sm text-blue-300 truncate hover:text-gray-500'>
                            {data.object}
                          </span>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes('Pavadinimas') ? (
                        <div className='flex flex-row justify-start items-center h-12 w-40'>
                          <span className='bg-white text-sm text-gray-400 truncate hover:text-gray-500'>
                            {data.name}
                          </span>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes('Ekipažas') ? (
                        <div className='flex flex-row items-center justify-start h-12 w-40'>
                          <span className='bg-white text-sm text-blue-300 truncate hover:text-gray-500'>
                            {data.crew}
                          </span>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes('Spėjo laiku') ? (
                        <div className='flex flex-row items-center justify-start h-12 w-40'>
                          <span className='bg-white text-sm text-gray-400 truncate hover:text-gray-500'>
                            {data.intime}
                          </span>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes('Reagavimo laikas') ? (
                        <div className='flex flex-row items-center justify-start h-12 w-40'>
                          <span className='bg-white text-gray-400 hover:text-gray-500'>
                            {data.reactiontime}
                          </span>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes('Laikas objekte') ? (
                        <div className='flex flex-row items-center justify-start h-12 w-40'>
                          <span className='bg-white text-gray-400 hover:text-gray-500'>
                            {data.timeinobject}
                          </span>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes('Būsena') ? (
                        <div className='flex flex-row items-center justify-start h-12 w-40'>
                          <RedWatching />
                          {/* <InspectedStatus />
                          <YellowWaitingStatus />
                          <RedDriving/>
                          <GrayStatus/>
                          <GreenStatus/>
                          <BlueStatus/>
                          <CancelStatus/> */}
                        </div>
                      ) : null}
                      {filter.dashboardList.includes('Suveikimo priežastis') ? (
                        <div className='flex flex-row items-center justify-start h-12 w-40'>
                          <span className='bg-white text-sm text-gray-500 truncate hover:text-gray-400'>
                            {data.reason}
                          </span>
                        </div>
                      ) : null}
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
