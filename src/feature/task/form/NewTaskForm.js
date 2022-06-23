import React, {useState, useEffect} from 'react';

import Map from '../../map/component/Map';
import Nullable from '../../../components/atom/Nullable';
import Textarea from '../../../components/obsolete/input/Textarea';
import Selectbox from '../../../components/obsolete/input/Selectbox';
import ControlledInput from '../../../components/obsolete/input/ControlledInput';

import useAsync from '../../../hook/useAsync';
import useGeocode from '../../../hook/useGeocode';
import useLanguage from '../../../hook/useLanguage';
import useResultForm from '../../../hook/useResultForm';
import {useGoogleApiContext} from '../../../context/google';

import {asyncCreateEvent} from '../api/newTaskApi';

import {generate} from 'shortid';
import {identity, or, isEmpty} from 'crocks';
import resultToAsync from 'crocks/Async/resultToAsync';
import {lengthGt, hasntLength} from '../../../util/pred';
import {Marker} from '@react-google-maps/api';

const NewTaskForm = () => {
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

  const {
    isFullyComplete: isEventFullyComplete,
    ctrl: ctrlEvent,
    result: eventResult,
    setForm: setEventForm,
  } = useResultForm({
    // token: {
    //   initial: `Bearer ${accessToken}`,
    //   validator: or(hasntLength, lengthGt(5)),
    //   message: t('validation.error.token'),
    //   props: () => {}
    // },
    name: {
      initial: '',
      validator: or(hasntLength, lengthGt(5)),
      message: t('validation.error.taskName'),
      props: inputGroupValidationProps,
    },
    description: {
      initial: '',
      validator: or(hasntLength, lengthGt(5)),
      message: t('validation.error.taskDescription'),
      props: inputGroupValidationProps,
    },
    status: {
      initial: '',
      validator: or(hasntLength, lengthGt(5)),
      message: t('validation.error.taskStatus'),
      props: () => {},
    },
    crewID: {
      initial: '',
      validator: or(hasntLength, lengthGt(5)),
      message: t('validation.error.crewID'),
      props: () => {},
    },
    objectID: {
      initial: '',
      validator: or(hasntLength, lengthGt(5)),
      message: t('validation.error.objectID'),
      props: () => {},
    },
  });

  // const [crewsResponse, forkCrews] = useAsync(asyncGetCrews(accessToken), identity);
  // const [objectsResponse, forkObjects] = useAsync(asyncGetObjects(accessToken), identity);
  const [eventResponse, forkEvent] = useAsync(resultToAsync(eventResult).chain(asyncCreateEvent), identity);

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
        <Selectbox
          label={t('eurocash.type')}
          twBody={'w-1/2 mr-4'}
          isRequired={true}
          items={taskStatus}
          value={selectedTaskStatus}
          setValue={setSelectedTaskStatus}
        />
        <ControlledInput
          title={t('eurocash.name')}
          twBody={'mr-0 w-1/2'}
          isRequired={true}
          {...ctrlEvent('name')}
        />
      </div>
      <Textarea
        title={t('eurocash.description')}
        twBody={'mb-6'}
        rows={4}
        isRequired={true}
        {...ctrlEvent('description')}
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

export default NewTaskForm;
