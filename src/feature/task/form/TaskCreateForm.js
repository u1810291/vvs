import useResultForm from '../../../hook/useResultForm';
import {useTranslation} from 'react-i18next';
import ComboBox from 'components/atom/input/ComboBox';
import {createUseList} from 'api/buildApiHook';
import {useEffect, useMemo} from 'react';
import InputGroup from 'components/atom/input/InputGroup';
import {onInputEventOrEmpty} from '@s-e/frontend/callbacks/event/input';
import TextAreaInputGroup from 'components/atom/input/InputGroup/TextAreaInputGroup';
import {useGoogleApiContext} from 'context/google';
import {hasLength} from '@s-e/frontend/pred';
import {
  not,
  isEmpty,
  chain,
  constant,
  getProp,
  head,
  pipe,
  identity,
  Async,
  mapProps,
  map,
  getPathOr,
  safe,
  option,
  propEq,
  ifElse,
} from 'crocks';

const gql = identity;
const useCreateTask = createUseList({
  graphQl: gql`
    query {
      types: task_type {
        value
      }
      crews: crew {
        id
        name
      }
    }
  `,
  asyncMapFromApi: pipe(
    mapProps({
      crews: map(({id, name}) => ({value: id, text: name})),
      types: map(({value}) => value)
    }),
    Async.Resolved,
  ),
});

let addressTimeout = null;
const TaskCreateForm = ({saveRef}) => {
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

  const gc = useGoogleApiContext();
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
        label: constant(t`field.address.label`),
        isRequired: constant(true),
        value: ({value}) => value,
        onChange: ({set}) => onInputEventOrEmpty(set),
      },
    },

    // name: FORM_FIELD.TEXT({
    //   label: t`field.name`, 
    //   validator: lengthGt(4),
    //   message: t`validation.name`,
    //   showValidationBelow: true,
    //   props: {
    //     isRequired: constant(true),
    //   }
    // }),
    // description: FORM_FIELD.TEXT({
    //   label: t`field.description`,
    //   validator: hasLength,
    //   message: t`validation.description`,
    //   showValidationBelow: true,
    //   props: {
    //     isRequired: constant(true),
    //   }
    // }),
    // object: FORM_FIELD.TEXT({
    //   label: t`field.to_call_after`, 
    //   validator: constant(true)
    // }),
    // address: FORM_FIELD.TEXT({
    //   label: t`field.address`, 
    //   validator: hasLength,
    //   message: t`validation.address`,
    //   showValidationBelow: true,
    //   props: {
    //     isRequired: constant(true),
    //   }
    // }),
    // crew_id: FORM_FIELD.TEXT({
    //   label: t`crew_id`, 
    //   validator: hasLength,
    //   message: t`validation.crew_id`,
    //   showValidationBelow: true,
    //   props: {
    //     isRequired: constant(true),      
    //     displayValue: displayValue((v) => {
    //       const crew = crews?.data?.find(c => c.id === v);
    //       return titleCase(crew?.name || crew?.id);
    //     }),
    //   }
    // }),

  });

  useEffect(() => {
    const address = result?.form?.address;
    clearTimeout(addressTimeout);
    addressTimeout = setTimeout(() => {
      if (!address) return;
      gc.geocode({address})
        .fork(console.error, pipe(
          safe(hasLength),
          map(ifElse(
            propEq('length', 1),
            pipe(
              head,
              chain(getProp('formatted_address')),
              map(result.set('address')),
            ),
            identity,
          )),
        ));
    }, 500);
  }, [result.form.address, result.set])

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
      <InputGroup {...ctrl('address')} />
    </section>
  );
};

export default TaskCreateForm;
