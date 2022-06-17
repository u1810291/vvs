import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useSort from '../../hook/useSort';
import { sortToggle } from '../../util/utils';
import { Disconnected } from '../../components/buttons/disconnected';
import { Connected } from '../../components/buttons/connected';
import useReactQuery from '../../hook/useQuery';
import { objectPage } from '../../api/queryForms/queryString/query';
import GlobalContext from '../../context/globalContext';
import { generate } from 'shortid';

export const ModemsList = ({ token, ...props }) => {
  const { filterListModems, setFilterListModems } = useContext(GlobalContext);
  const { selectedFilterModems, setSelectedFilterModems } =
    useContext(GlobalContext);
  const [initData, setInitData] = useState('');
  const [ modem, setModem ] = useState('');


  const data = useReactQuery(objectPage, {}, token);

  // useEffect(() => {
  //   let hasura;
  //   let monas;
  //   if (data.data) {
  //   hasura = data?.data?.monas_related;
  //   monas = data?.data?.objects;
  //   const mergeDB = monas.map((monas) => ({
  //     ...monas, ...hasura.find(hasura => String(hasura.Id) === String(monas.Id))
  //   }))
  //   setModem({result:mergeDB});
  //   setInitData(data.data);
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data.data]);

  const {
    sortedModemsKeys,
    sortedModemsOrder,
    sortedModemsNumber,
    sortedModemsObjectName,
    sortedModemsObjectNo,
    sortedModemsContractNo,
    sortedModemsStatus,
  } = useSort();

  const sortedModems = sortToggle(modem?.result, sortedModemsKeys, sortedModemsOrder);

  return (
    <>
      {filterListModems.map((filter, index) => {
        return (
          <div key={filter.id}>
            {selectedFilterModems === filter.id ? (
              <div className='flex pl-4 w-full border-t py-2 bg-gray-100 justify-between font-normal text-black z-1'>
                {filter.dashboardList.includes('Numeris') ? (
                  <div className='flex justify-start flex-row items-center w-40'>
                    <button
                      onClick={sortedModemsNumber}
                      className='flex justify-start flex-row items-center'
                    >
                      <span className='text-gray-300 text-sm hover:text-gray-400'>Numeris</span>
                      <img
                        src={require('../../assets/assets/down.png')}
                        className='h-2 w-4 ml-2'
                      />
                    </button>
                  </div>
                ) : null}
                {filter.dashboardList.includes('Objekto Pavadinimas') ? (
                  <button
                    onClick={sortedModemsObjectName}
                    className='flex justify-start flex-row items-center w-40'
                  >
                    <span className='text-gray-300 text-sm hover:text-gray-400'>
                      Objekto Pavadinimas
                    </span>
                  </button>
                ) : null}
                {filter.dashboardList.includes('Objekto nr.') ? (
                  <button
                    onClick={sortedModemsObjectNo}
                    className='flex justify-start flex-row items-center w-20'
                  >
                    <span className='text-gray-300 text-sm hover:text-gray-400'>Objekto nr.</span>
                  </button>
                ) : null}
                {filter.dashboardList.includes('Sutarties nr.') ? (
                  <button
                    onClick={sortedModemsContractNo}
                    className='flex justify-start flex-row items-center w-20'
                  >
                    <span className='text-gray-300 text-sm hover:text-gray-400'>Sutarties nr.</span>
                  </button>
                ) : null}
                {filter.dashboardList.includes('Būsena') ? (
                  <button
                    onClick={sortedModemsStatus}
                    className='flex justify-start flex-row items-center w-40'
                  >
                    <span className='text-gray-300 text-sm hover:text-gray-400'>Būsena</span>
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}

      <div className='pl-4 flex-col w-full items-center'>
        {sortedModems?.map((data) => (
          <div className='w-full' key={generate()}>
            {filterListModems.map((filter, index) => {
              return (
                <div key={filter.id}>
                  {selectedFilterModems === filter.id ? (
                    <div className='flex w-full border-t py-2 bg-white justify-between font-normal text-black z-1'>
                      {filter.dashboardList.includes('Numeris') ? (
                        <div className='flex flex-row items-center h-12 w-40'>
                          <Link
                            to={{ pathname: `/modem/${data.Id}` }}
                            className='bg-white text-gray-500 truncate text-sm hover:text-gray-400'
                          >
                            {data.modem}
                          </Link>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes('Objekto Pavadinimas') ? (
                        <div className='flex flex-row items-center h-12 w-40'>
                          <Link
                            to={{ pathname: `/modem/${data.Id}` }}
                            className='bg-white text-gray-400 truncate text-sm hover:text-gray-500'
                          >
                            {data.name}
                          </Link>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes('Objekto nr.') ? (
                        <div className='flex flex-row items-center h-12 w-20'>
                          <Link
                            to={{ pathname: `/modem/${data.Id}` }}
                            className='bg-white text-gray-500 truncate text-sm hover:text-gray-400'
                          >
                            {data.objectid}
                          </Link>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes('Sutarties nr.') ? (
                        <div className='flex flex-row items-center h-12 w-20'>
                          <Link
                            to={{ pathname: `/modem/${data.Id}` }}
                            className='bg-white text-gray-400 truncate text-sm hover:text-gray-500'
                          >
                            {data.contract}
                          </Link>
                        </div>
                      ) : null}
                      {filter.dashboardList.includes('Būsena') ? (
                        <div className='flex flex-row items-center h-12 w-40'>
                          <Link
                            to={{ pathname: `/modem/${data.Id}` }}
                            className='bg-white text-gray-400 truncate text-sm hover:text-gray-500'
                          >
                            {data.objectstatus === 2 ? (
                            <Disconnected />) : data.objectstatus === 1 (<Connected/>)}
                          </Link>
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
