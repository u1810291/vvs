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
  isEmpty,
  constant,
  pipe,
  map,
  getPathOr,
  safe,
  option,
  tap,
  getPropOr,
} from 'crocks';

const TaskCreateForm = ({saveRef}) => {
  const gc = useGoogleApiContext();
  const {t} = useTranslation();
  const api = useCreateTask();
  const typeValueToText = useMemo(() => pipe(
    String,
    safe(not(isEmpty)),
    map(pipe(
      a => a.toLowerCase(),
      v => `field.type.${v}`,
      t,
    )),
    option(''),
  ), [t]);

  const {ctrl, ...result} = useResultForm({
    type: {
      validator: not(isEmpty),
      initial: '',
      message: t`field.type.validation`,
      props: {
        labelText: constant(t`field.type.label`),
        isRequired: constant(true),
        placeholder: constant(t`field.type.placeholder`),
        value: ({value}) => value,
        onChange: ({set}) => value => {set(value)},
        displayValue: constant(b => typeValueToText(b)),
      },
    },
    name: {
      validator: not(isEmpty),
      initial: '',
      messages: t`field.name.validation`,
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
      messages: t`field.description.validation`,
      props: {
        label: constant(t`field.description.label`),
        isRequired: constant(true),
        value: ({value}) => value,
        onChange: ({set}) => onInputEventOrEmpty(set),
      },
    },
    address: {
      validator: not(isEmpty),
      initial: '',
      messages: t`field.address.validation`,
      props: {
        isRequired: constant(true),
        label: constant(t`field.address.label`),
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
  });

  return (
    <section className='p-4 space-y-4'>
      <div className='flex space-x-4 w-full'>
        <ComboBox className='flex-grow flex-shrink' {...ctrl('type')}>
          {pipe(
            getPathOr([], ['data', 'types']),
            map(value => (
              <ComboBox.Option key={value} value={value}>
                {typeValueToText(value)}
              </ComboBox.Option>
            )),
          )(api)}
        </ComboBox>
        <InputGroup className='flex-grow flex-shrink' {...ctrl('name')} />
      </div>
      <TextAreaInputGroup {...ctrl('description')} />
      <ComboBox.Autocomplete {...ctrl('address')} />
    </section>
  );
};

export default TaskCreateForm;
