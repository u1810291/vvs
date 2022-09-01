import React, {useState, useEffect} from 'react';

import Map from '../../map/component/Map';
import Nullable from '../../../components/atom/Nullable';
import Textarea from '../../../components/obsolete/input/Textarea';
import Selectbox from '../../../components/obsolete/input/Selectbox';
import InputGroup from 'components/atom/input/InputGroup';

import useAsync from '../../../hook/useAsync';
import useGeocode from '../../../hook/useGeocode';
import useLanguage from '../../../hook/useLanguage';
import useResultForm, {FORM_FIELD} from '../../../hook/useResultForm';
import {useGoogleApiContext} from '../../../context/google';

import {asyncCreateEvent} from '../api/taskEditApi';

import {generate} from 'shortid';
import {identity, isEmpty} from 'crocks';
import resultToAsync from 'crocks/Async/resultToAsync';
import {lengthGt} from '../../../util/pred';
import {Marker} from '@react-google-maps/api';
import SelectBox from '../../../components/atom/input/SelectBox';

const TaskEditForm = () => {
  const {t} = useLanguage();
  const {onMapLoad} = useGoogleApiContext();
  const {getCoordsByAddress} = useGeocode();

  const [taskStatus, setTaskStatus] = useState([
    {id: '123', key: null, name: 'Naujas'}
  ]);
  const [crews, setCrews] = useState([
    {id: '321', key: null, abbreviation: '9GR'},
    {id: '12113', key: null, abbreviation: '8GB'}
  ]);
  const [objects, setObjects] = useState([
    {id: '313', key: null, address: 'Gilužio g. 5, Vilnius 06229, Lithuania', coords: null},
    {id: '1313', key: null, address: 'Įsruties g. 3, Vilnius 06218, Lithuania', coords: null}
  ]);

  const [selectedCrew, setSelectedCrew] = useState([]);
  const [selectedObject, setSelectedObject] = useState({});
  const [selectedTaskStatus, setSelectedTaskStatus] = useState([]);

  const inputGroupValidationProps = {
    value: ({value}) => value,
    setValue: ({set}) => set
  };

  const {ctrl, result, setForm} = useResultForm({
    name: FORM_FIELD.TEXT({label: t`field.name`, validator: lengthGt(4)}),
    description: FORM_FIELD.TEXT({label: t`field.driver_name`, validator: () => true}),
    status: FORM_FIELD.TEXT({label: t`field.abbreviation`, validator: lengthGt(1)}),
    crewId: FORM_FIELD.TEXT({label: t`field.phone_number`, validator: () => true}),
    objectId: FORM_FIELD.TEXT({initial: '10', label: t`field.to_call_after`, validator: lengthGt(9)}),
  });

  // const [crewsResponse, forkCrews] = useAsync(asyncGetCrews(accessToken), identity);
  // const [objectsResponse, forkObjects] = useAsync(asyncGetObjects(accessToken), identity);
  const [eventResponse, forkEvent] = useAsync(resultToAsync(result).chain(asyncCreateEvent), identity);

  // useEffect(() => {
  //   forkCrews();
  //   forkObjects();
  // }, []);

  // useEffect(() => {
  //   const path = responseName => responseName.data?.data
  //   !isEmpty(path(crewsResponse))
  //     ? setCrews(path(crewsResponse).crew.map(crew => ({key: crew.id, value: crew.abbreviation})))
  //     : []
  //   !isEmpty(path(objectsResponse))
  //     ? setObjects(path(objectsResponse).object.map(object => ({key: object.id, value: object.address})))
  //     : []
  // }, [crewsResponse, objectsResponse]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    !isEmpty(crews)
      ? setCrews(crews.map(crew => ({key: crew.id, value: crew.abbreviation})))
      : []
    // eslint-disable-next-line no-unused-expressions
    !isEmpty(objects)
      ? setObjects(objects.map(object => ({key: object.id, value: object.address})))
      : []
    // eslint-disable-next-line no-unused-expressions
    !isEmpty(taskStatus)
      ? setTaskStatus(taskStatus.map(status => ({key: status.id, value: status.name})))
      : []
  }, []);

  useEffect(() => {
    (async () => setObjects(
      !isEmpty(objects)
        ? await Promise.all(objects.map(async object => ({
          key: generate(),
          value: object.address,
          coords: await getCoordsByAddress(object.address)})))
        : []
    ))();
  }, []);

  // useEffect(() => {
  //   setEventForm({
  //     name: '',
  //     description:'',
  //     status: '',
  //     crewID: '',
  //     objectID: '',
  //   });
  // }, [setEventForm]);

  return (
    <section className={'flex flex-col w-1/4 p-5'}>
      <div className={'flex mb-6'}>
        <SelectBox>

        </SelectBox>
        {/*<Selectbox*/}
        {/*  label={t('eurocash.type')}*/}
        {/*  twBody={'w-1/2 mr-4'}*/}
        {/*  isRequired={true}*/}
        {/*  items={taskStatus}*/}
        {/*  value={selectedTaskStatus}*/}
        {/*  setValue={setSelectedTaskStatus}*/}
        {/*/>*/}
        <InputGroup
          className={'mt-6 lg:mt-0 lg:w-5/12'}
          isRequired={true}
          {...ctrl('name')}
        />
      </div>
      <Textarea
        title={t('eurocash.description')}
        twBody={'mb-6'}
        rows={4}
        isRequired={true}
        {...ctrl('description')}
      />
      <Selectbox
        label={t('eurocash.objectsAndAddresses')}
        twBody={'mb-6'}
        items={objects}
        value={selectedObject}
        setValue={setSelectedObject}
      />
      <div className='relative h-80 mb-6'>
        <Map singleMarkerCoords={selectedObject.coords}>
          <Nullable on={selectedObject.coords}>
            <Marker onLoad={onMapLoad} position={selectedObject.coords}/>
          </Nullable>
        </Map>
      </div>
      <Selectbox
        label={t('eurocash.crews')}
        twBody={'mb-6'}
        items={crews}
        value={selectedCrew}
        setValue={setSelectedCrew}
      />
    </section>
  );
};

export default TaskEditForm;
