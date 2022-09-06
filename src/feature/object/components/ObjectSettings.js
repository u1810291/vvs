import CheckBox from 'components/atom/input/CheckBox';
import InputGroup from 'components/atom/input/InputGroup';
import {useTranslation} from 'react-i18next';



const ObjectSettings = ({ctrl}) => {
  const {t} = useTranslation('object', {keyPrefix: 'edit'});


  return (
    <div className='p-6 flex flex-col space-y-8'>
      <h2 className='font-bold text-xl'>{t('feedback_settings')}</h2>

      <div className='flex flex-row w-full space-x-10'>
        <CheckBox className='items-end' {...ctrl('is_crew_autoasigned')}/>
        <InputGroup  {...ctrl('feedback_from')}/>
        <InputGroup {...ctrl('feedback_until')}/>
        <InputGroup {...ctrl('feedback_sla_time_in_min')} type='number'/>
      </div>
      <div>
        <CheckBox className='items-end' {...ctrl('is_call_after_inspection')} />
      </div>
      <div>
        <CheckBox className='items-end' {...ctrl('is_atm')}/>
      </div>
    </div>
  );
}

export default ObjectSettings;