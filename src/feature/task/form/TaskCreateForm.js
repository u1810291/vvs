import ComboBox from 'components/atom/input/ComboBox';
import InputGroup from 'components/atom/input/InputGroup';
import TextAreaInputGroup from 'components/atom/input/InputGroup/TextAreaInputGroup';
import useResultForm from '../../../hook/useResultForm';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import {useCreateTask} from '../api/useTaskCreateForm';
import {useMemo} from 'react';
import {useGoogleApiContext} from 'context/google';
import {useTranslation} from 'react-i18next';
import {
  not,
  getPath,
  isEmpty,
  constant,
  pipe,
  or,
  map,
  either,
  safe,
  option,
  tap,
  find,
  getPropOr,
  identity,
  isSame,
  chain,
  propEq,
  hasProps,
  and,
  isNumber,
  Maybe,
} from 'crocks';
import useTask from '../api/useTask';
import {TaskListRoute} from '../routes';
import {getObjectName} from 'feature/object/utils';
import {caseMap} from '@s-e/frontend/flow-control';
import {titleCase} from '@s-e/frontend/transformer/string';

const TaskCreateForm = ({saveRef}) => {
  const gc = useGoogleApiContext();
  const {t} = useTranslation('task');
  const api = useCreateTask();
  const getTypeText = useMemo(() => pipe(
    String,
    safe(not(isEmpty)),
    map(pipe(
      a => a.toUpperCase(),
      caseMap(identity, [
        [isSame('NEW'), constant('new')],
        [isSame('CANCELLED'), constant('cancelled')],
        [isSame('ON_ROAD'), constant('onRoad')],
        [isSame('INSPECTION'), constant('inspection')],
        [isSame('INSPECTION_DONE'), constant('inspectionDone')],
        [isSame('FINISHED'), constant('finished')],
        [isSame('WAIT_FOR_APPROVAL'), constant('waitForApproval')],
        [isSame('ON_THE_ROAD'), constant('onRoad')],
      ]),
      v => `status.${v}`,
      t,
    )),
    option(''),
  ), [t]);

  const {ctrl, setForm, result} = useResultForm({
    type: {
      validator: not(isEmpty),
      initial: null,
      message: t`field.type.validation`,
      props: {
        labelText: constant(t`field.type.label`),
        isRequired: constant(true),
        placeholder: constant(t`field.type.placeholder`),
        value: ({value}) => value,
        onChange: ({set}) => set,
        children: constant(ComboBox.asOptions(
          [identity, titleCase],
          getPath(['data', 'types'], api).alt(Maybe.Just([]))
        )),
      },
    },
    status: {
      validator: not(isEmpty),
      initial: 'NEW',
      message: t`field.status.validation`,
      props: {
        labelText: constant(t`field.status.label`),
        isRequired: constant(true),
        placeholder: constant(t`field.status.placeholder`),
        value: ({value}) => value,
        onChange: ({set}) => set,
        children: constant(ComboBox.asOptions(
          [identity, getTypeText],
          getPath(['data', 'statuses'], api).alt(Maybe.Just(['NEW']))
        )),
      },
    },
    name: {
      validator: not(isEmpty),
      initial: '',
      message: t`field.name.validation`,
      props: {
        label: constant(t`field.name.label`),
        isRequired: constant(true),
        value: ({value}) => value,
        onChange: ({set}) => onInputEventOrEmpty(set),
      },
    },
    description: {
      validator: not(isEmpty),
      initial: '',
      message: t`field.description.validation`,
      props: {
        label: constant(t`field.description.label`),
        isRequired: constant(true),
        value: ({value}) => value,
        onChange: ({set}) => onInputEventOrEmpty(set),
      },
    },
    object_id: {
      opt: true,
      initial: null,
      validator: constant(true),
      message: t`field.object.validation`,
      props: {
        labelText: constant(t`field.object.label`),
        placeholder: constant(t`field.object.placeholder`),
        value: ({value}) => value,
        onChange: ({setForm}) => object_id => {
          pipe(
            getPath(['data', 'objects']),
            chain(find(propEq('id', object_id))),
            chain(safe(hasProps(['address', 'latitude', 'longitude']))),
            either(
              constant(setForm({object_id})), 
              ({address, longitude, latitude}) => setForm({object_id, address, longitude, latitude}),
            ),
          )(api)
        },
        children: constant(ComboBox.asOptions(
          [getPropOr('', 'id'), item => getObjectName(item).option(t`untitledObject`)],
          getPath(['data', 'objects'], api),
        )),
      },
    },
    address: {
      validator: not(isEmpty),
      initial: '',
      message: t`field.address.validation`,
      opt: true,
      props: {
        isRequired: constant(true),
        labelText: constant(t`field.address.label`),
        placeholder: constant(t`field.address.placeholder`),
        value: ({value}) => value,
        onChange: ({set}) => set,
        resultToOptionProps: constant(text => ({key: text, children: text, value: text})),
        onQuery: constant((query, setResult) => gc.geocode({address: query}).fork(
          constant(setResult([])),
          pipe(
            map(getPropOr('', 'formatted_address')),
            tap(setResult),
          )
        )),
      },
    },
    crew_id: {
      opt: true,
      initial: null,
      validator: constant(true),
      message: t`field.crew.validation`,
      props: {
        labelText: constant(t`field.crew.label`),
        placeholder: constant(t`field.crew.placeholder`),
        value: ({value}) => value,
        onChange: ({set}) => set,
        children: constant(ComboBox.asOptions(
          [getPropOr('', 'value'), getPropOr('', 'text')],
          getPath(['data', 'crews'], api),
        )),
      },
    },
    latitude: {
      initial: null,
      validator: or(isSame(null), and(isNumber, isFinite)), message: t`field.latitude.validation`,
    },
    longitude: {
      initial: null,
      validator: or(isSame(null), and(isNumber, isFinite)),
      message: t`field.longitude.validation`,
    }
  });

  useTask({
    saveRef,
    formResult: result,
    setForm,
    successRedirectPath: TaskListRoute.props.path,
  });

  return (
    <section className='p-4 space-y-4 w-1/2'>
      <div className='flex space-x-4 w-full'>
        <ComboBox className='flex-grow flex-shrink' {...ctrl('type')}/>
        <InputGroup className='flex-grow flex-shrink' {...ctrl('name')} />
      </div>
      <TextAreaInputGroup {...ctrl('description')} />
      <ComboBox className='flex-grow flex-shrink' {...ctrl('object_id')}/>
      <ComboBox.Autocomplete {...ctrl('address')} />
      <ComboBox className='flex-grow flex-shrink' {...ctrl('crew_id')} />
    </section>
  );
};

export default TaskCreateForm;
