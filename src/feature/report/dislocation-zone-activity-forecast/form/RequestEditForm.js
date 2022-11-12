import {InputGroup as Ig} from 'components/atom/input/InputGroup';
import useResultForm from 'hook/useResultForm';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {withMergedClassName} from 'util/react';
import useRequest from '../api/useRequest';
import {always} from 'util/func';
import {identity, ifElse, isArray, pipe, safe, map, omit, mapProps, option, isString, isTruthy, setProp} from 'crocks';
import {addDays, eachDayOfInterval, format, isDate} from 'date-fns';
import Label from 'components/atom/input/InputGroup/Base/Label';
import Locations from '../component/Locations';
import Calendar from 'components/Calendar';
import Input from 'components/atom/input/InputGroup/Base/Input';
import {useReducer} from 'react';
import {Transition} from 'components/Dropdown';
import {every} from 'util/array';
import {joinString} from '@s-e/frontend/transformer/array';
import {selectValueToObject} from '../utils';
import {useAuth} from '../context/auth';

const RequestEditForm = ({saveRef, ...props}) => {
  const params = useParams();
  const {t} = useTranslation('request');
  const disabled = always(isTruthy(params?.id))
  const {ctrl, result, setForm} = useResultForm({
    dateFromTo: {
      initial: '',
      message: t`validation.dateTo`,
      validator: always(true),
      props: {
        label: always(t`field.dateFromTo`),
        onChange: ({set}) => set,
        value: ({value}) => value,
        ranged: always(true),
        disabled,
      }
    },
    locations: {
      initial: [],
      message: t`validation.locations`,
      validator: always(true),
      props: {
        label: always(t`field.locations`),
        onChange: ({set}) => set,
        value: ({value}) => value,
        disabled,
      }
    }
  });

  const auth = useAuth();

  useRequest({
    id: params?.id,
    saveRef,
    formResult: result.map(pipe(
      a => ({
        ...a,
        dateFrom: a?.dateFromTo?.[0],
        dateTo: a?.dateFromTo?.[1],
      }),
      omit(['dateFromTo']),
      mapProps({
        locations: pipe(
          safe(isArray),
          map(map(pipe(
            safe(isString),
            map(selectValueToObject),
            option(null)
          ))),
          option([]),
          a => a.filter(isTruthy),
        ),
      }),
      setProp('user_id', auth.userData.id),
    )),
    setForm: setForm,
  });

  return (
    <div {...props}>
      <Ig Label={Label} Input={DatePicker} {...ctrl('dateFromTo')} />
      <Ig Label={Label} Input={Locations} {...ctrl('locations')} />
    </div>
  );
};

const DatePicker = ({ranged, onChange, value, ...props}) => {
  const [isOpen, setOpen] = useReducer(a => props?.disabled ? false : !a, false)

  const onSelect = (input) => {
    onChange(input);
    if (ranged && input?.length > 1) setOpen();
    if (!ranged) setOpen();
  }

  const selectedDates = pipe(
    ifElse(isArray, identity, a => [a]),
    safe(every(isDate)),
  )(value)

  return (
    <>
      <Input
        {...props}
        onFocus={setOpen}
        onChange={identity}
        value={selectedDates
          .map(map(date => format(date, 'yyyy-MM-dd')))
          .map(joinString(' - '))
          .option('')
        }
      />
      <Transition show={isOpen} as={'div'} className='z-10 absolute'>
        <Calendar ranged={ranged}
          selectedDates={selectedDates.option([])}
          onSelect={onSelect}
          availableDates={eachDayOfInterval({
            start: new Date(),
            end: addDays(new Date(), 15),
          })}
        />
      </Transition>
    </>
  );
};

export default withMergedClassName('space-y-4', RequestEditForm);
