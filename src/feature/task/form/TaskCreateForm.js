import Map from '../../map/component/Map';
import Marker from 'feature/map/component/Marker';
import Nullable from '../../../components/atom/Nullable';

import InputGroup from 'components/atom/input/InputGroup';
import useGeocode from '../../../hook/useGeocode';
import useLanguage from '../../../hook/useLanguage';
import useResultForm, {FORM_FIELD} from '../../../hook/useResultForm';
import {useGoogleApiContext} from '../../../context/google';
import {lengthGt} from '../../../util/pred';
import SelectBox from '../../../components/atom/input/SelectBox';
import {hasLength} from '@s-e/frontend/pred';
import useEventTypeDropdown from '../api/useEventTypeDropdown';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useCrews} from 'feature/crew/api/crewEditApi';
import ComboBox from 'components/atom/input/ComboBox';
import {useObjects} from 'feature/object/api';
import TextAreaInputGroup from 'components/atom/input/InputGroup/TextAreaInputGroup';
import {useTranslation} from 'react-i18next';
import {constant, chain, getProp, not, safe, isEmpty, map, pipe, option} from 'crocks';
import {TaskListRoute} from '../routes';
import useTask from '../api/useTask';
import {useMemo, useState} from 'react';


const displayValue = mapper => pipe(
  getProp('value'),
  chain(safe(not(isEmpty))),
  map(mapper),
  option(''),
  constant,
)


const TaskCreateForm = ({saveRef}) => {
  const {t} = useLanguage();
  const {t: tf} = useTranslation('task', {keyPrefix: 'form'});
  const {onMapLoad} = useGoogleApiContext();
  const {getCoordsByAddress} = useGeocode();

  // const [selectedObject, setSelectedObject] = useState(null);

  const {ctrl, result, form, setForm} = useResultForm({
    event_type: FORM_FIELD.TEXT({
      label: t`field.event_type`, 
      validator: hasLength,
      message: t`validation.event_type`,
      showValidationBelow: true,
      props: {
        isRequired: constant(true),
      }
    }),
    name: FORM_FIELD.TEXT({
      label: t`field.name`, 
      validator: lengthGt(4),
      message: t`validation.name`,
      showValidationBelow: true,
      props: {
        isRequired: constant(true),
      }
    }),
    description: FORM_FIELD.TEXT({
      label: t`field.description`,
      validator: hasLength,
      message: t`validation.description`,
      showValidationBelow: true,
      props: {
        isRequired: constant(true),
      }
    }),
    status: FORM_FIELD.TEXT({label: t`field.status`, validator: constant(true)}),
    crew_id: FORM_FIELD.TEXT({
      label: tf`crew_id`, 
      validator: hasLength,
      message: t`validation.crew_id`,
      showValidationBelow: true,
      props: {
        isRequired: constant(true),      
        displayValue: displayValue((v) => {
          const crew = crews?.data?.find(c => c.id === v);
          return titleCase(crew?.name || crew?.id);
        }),
      }
    }),
    objectId: FORM_FIELD.TEXT({
      label: t`field.to_call_after`, 
      validator: constant(true)
    }),
    address: FORM_FIELD.TEXT({
      label: t`field.address`, 
      validator: hasLength,
      message: t`validation.address`,
      showValidationBelow: true,
      props: {
        isRequired: constant(true),
      }
    }),
    latitude: FORM_FIELD.TEXT({label: '', validator: constant(true)}),
    longitude: FORM_FIELD.TEXT({label: '', validator: constant(true)}),
  });

 
  const {data: eventTypes} = useEventTypeDropdown();
  const objects = useObjects({filters: {}});
  const crews = useCrews({filters: {}});
  const [addresses, setAddresses] = useState([]);

  // console.log(eventTypes, objects, crews);
  console.log(form);


  useTask({
    formResult: result,
    setForm,
    successRedirectPath: TaskListRoute.props.path,
    saveRef,
  });

  const onTypeChanged = (v) => {
    const theForm = {...form};
    theForm['event_type'] = v;
    setForm(theForm);
  }

  const onCrewChange = (v) => {
    const theForm = {...form};
    theForm['crew_id'] = form['crew_id'] === v ? null : v;
    setForm(theForm);
  }

  const onAddressChanged = (v) => {
    console.log('search address:', v, getCoordsByAddress('M. K. Čiurlionio g.'));

    const theForm = {...form};
    theForm['object_id'] = v ?? null;
    setForm(theForm);
  }

  const onObjectChanged = (v) => {
    const object = objects?.data?.find(o => o.id === v);
    console.log('object chosen', object);

    const theForm = {...form};

    if (form['object_id'] === v) {
      theForm['object_id'] = null;
      setForm(theForm);
      return;
    }

    theForm['object_id'] = object.id;
    theForm['address'] = object.address;

    onAddressChanged(theForm['address']);

    // theForm['latitude'] = object.latitude;
    // theForm['longitude'] = object.longitude;
    setForm(theForm);
  }

  // map
  const mapBox = useMemo(() => (
    <div className='relative h-80 mb-6'>
      <Map singleMarkerCoords={new google.maps.LatLng(form['latitude'], form['longitude'])}>
        <Nullable on={form['latitude'] && form['longitude']}>
          <Marker onLoad={onMapLoad} position={new google.maps.LatLng(form['latitude'], form['longitude'])} />
        </Nullable>
      </Map>
    </div>
  ), [form])


  return (
    <section className={'flex flex-col space-y-4 lg:w-1/4 md:w-1/2 p-5'}>
      <div className={'flex space-x-4 w-full'}>
        <SelectBox 
          className={'lg:w-1/2'} 
          {...ctrl('event_type')} 
          multiple={false}
          onChange={onTypeChanged}>
          {eventTypes?.map(({value, name}) => (
            <SelectBox.Option key={value} value={value}>
              {titleCase(name)}
            </SelectBox.Option>
          ))}
        </SelectBox>

        <InputGroup
          className={'lg:mt-0 lg:w-1/2'}
          {...ctrl('name')}
        />
      </div>

      <TextAreaInputGroup
        title={t('eurocash.description')}
        rows={4}
        {...ctrl('description')}
      />

      <ComboBox 
        className={'w-full'} 
        labelText={tf('object')}
        multiple={false}
        placeholder={'Search [Single choice]'}
        {...ctrl('object_id')} 
        value={form['object_id']}
        data-id={form['object_id']}
        displayValue={v => objects?.data?.find(o => o.id === v)?.name}
        onChange={onObjectChanged}
      >
        {map(object => (
          <ComboBox.Option key={object.id} value={object.id}>
            {titleCase(object.name || object.id)}
          </ComboBox.Option>
        ), (objects?.data || []))}
      </ComboBox>

      {/* <InputGroup
        {...ctrl('address')}
      /> */}

      <ComboBox 
        className={'w-full'} 
        labelText={tf('address')}
        multiple={false}
        placeholder={'Search [Single choice]'}
        {...ctrl('address')} 
        value={form['address']}
        data-id={form['address']}
        displayValue={v => v}
        onChange={onAddressChanged}
      >
        {map(address => (
          <ComboBox.Option key={address.address} value={address.address}>
            {titleCase(address.address)}
          </ComboBox.Option>
        ), (addresses?.data || []))}
      </ComboBox>

      {mapBox}
      
      <ComboBox 
        className={'w-full'} 
        labelText={tf('crew')}
        multiple={false}
        placeholder={'Search [Single choice]'}
        {...ctrl('crew_id')} 
        value={form['crew_id']}
        data-id={form['crew_id']}
        displayValue={v => crews?.data?.find(o => o.id === v)?.name}
        onChange={onCrewChange}
      >
        {map(crew => (
          <ComboBox.Option key={crew.id} value={crew.id}>
            {titleCase(crew.name || crew.id)}
          </ComboBox.Option>
        ), (crews?.data || []))}
      </ComboBox>
    </section>
  );
};

export default TaskCreateForm;