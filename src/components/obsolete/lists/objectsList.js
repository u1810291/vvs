import React, {useContext, useState} from 'react';
// import { Orders } from '../../api/orders';
import useSort from '../../../hook/useSort';
import {objectsQuery} from '../../../mocks/queryForms/queryString/query';
import useReactQuery from '../../hook/useQuery';
import {sortToggle} from '../../../util/utils';
import GlobalContext from '../../context/globalContext';

export const ObjectsList = ({searchResponse, token, ...props}) => {
  const {filterListObjects, setFilterListObjects} = useContext(GlobalContext);
  const {selectedFilterObjects, setSelectedFilterObjects} =
    useContext(GlobalContext);
  const [orders, setOrders] = useState('');
  const {objectPageFetchData, setObjectPageFetchData} =
    useContext(GlobalContext);
  const [searchData, setSearchData] = useState(null);

  const data = useReactQuery(objectsQuery, {}, token);

  // useEffect(() => {
  //   let hasura;
  //   let monas;
  //   if (data.data) {
  //     setObjectPageFetchData(true);
  //     if (data.data.filters) {
  //       let filters = data?.data?.filters;
  //       const result = filters?.map((a) => {
  //         return a;
  //       });
  //       if (filters) {
  //         setFilterListObjects(result);
  //       }
  //     }
  //     hasura = data?.data?.monas_related;
  //     monas = data?.data?.objects;
  //     const mergeDB = monas?.map((monas) => ({
  //       ...monas,
  //       ...hasura?.find((hasura) => String(hasura.Id) === String(monas.Id)),
  //     }));
  //     setOrders({ result: mergeDB });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data.data]);

  // useEffect(() => {
  //   if (searchResponse) {
  //     let hasura = data?.data?.monas_related;
  //     let monas = searchResponse?.data?.objects;
  //     const mergeDB = monas?.map((monas) => ({
  //       ...monas,
  //       ...hasura?.find((hasura) => String(hasura.Id) === String(monas.Id)),
  //     }));
  //     setOrders({ result: mergeDB });
  //   }
  // }, [searchResponse]);

  const {
    sortedObjectsKeys,
    sortedObjectsOrder,
    sortedObjectsNames,
    sortedObjectsCity,
    sortedObjectsAddress,
    sortedObjectsObject,
    sortedObjectsSentCrew,
    sortedObjectsContract,
  } = useSort();

  const sortedObjects = sortToggle(
    orders?.result,
    sortedObjectsKeys,
    sortedObjectsOrder
  );

  return (
    <>
    todo
    </>
  );
};
