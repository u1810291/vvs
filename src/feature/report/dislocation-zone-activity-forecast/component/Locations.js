import {useTranslation} from 'react-i18next';
import {Repeater} from 'util/react';
import {isSame, Maybe, pipe, find} from 'crocks';
import {PlusIcon, TrashIcon} from '@heroicons/react/solid';
import {useCallback, useMemo} from 'react';
import ComboBox from 'components/atom/input/ComboBox';
import data from '../data/locations.json';

export const getName = a => `${a.city} ${a.suburb}`;
export const getValue = a => `${a.city};${a.suburb};${a.latitude};${a.longitude}`;

const OPTION = Object.freeze({
  GETTERS: [
    getValue,
    getName,
  ],
  LIST: Maybe.of(data.sort((a, b) => getName(a).localeCompare(getName(b))))
});

const Location = ({index, className, onChange, values, disabled}) => {
  const {t} = useTranslation('request');
  const onRemove = useCallback(() => onChange(values.filter((_,i) => i !== index)), [values, onChange]);
  const value = values?.[index];

  const displayValue = useCallback(a => (
    OPTION
    .LIST
    .chain(find(pipe(
      getValue,
      isSame(a),
    )))
    .map(getName)
    .option('')
  ), []);

  const onUpdate = useCallback(value => {
    return onChange(values.map((v, i) => i === index ? value : v))
  }, [values, onChange]);

  return (
    <div className={['flex items-center space-x-2', className]}>
      <ComboBox
        displayValue={displayValue}
        value={value}
        className='flex-grow'
        onChange={onUpdate}
        disabled={disabled}
      >
        {ComboBox.asOptions(OPTION.GETTERS, OPTION.LIST)}
      </ComboBox>
      <button disabled={disabled} onClick={onRemove} className={`ml-2 flex items-center justify-center font-semibold text-red-400 hover:text-red-800 transition focus:outline-none focus:text-red-800 ${disabled && 'opacity-50'}`}>
        <TrashIcon className='w-6 mr-2'/>
        <span>{t`form.removeLocation`}</span>
      </button>
    </div>
  );
};

const Locations = props => {
  const {t} = useTranslation('request');
  const onClickAdd = useMemo(() => () => props.onChange([...props.value, {}]), [props]);
  return (
    <div>
      <div className='space-y-2'>
        <Repeater list={props?.value} passIndex>
          <Location onChange={props.onChange} values={props?.value} disabled={props?.disabled}/>
        </Repeater>
      </div>
      <button disabled={props?.disabled} onClick={onClickAdd} className={`mt-2 flex items-center justify-center font-semibold text-gray-400 hover:text-gray-900 transition focus:outline-none focus:text-gray-900 ${props?.disabled && 'opacity-50'}`}>
        <PlusIcon className='w-6 mr-2'/>
        <span>{t`form.addLocation`}</span>
      </button>
    </div>
  );
};


export default Locations;
