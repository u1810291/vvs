import useResultForm from 'hook/useResultForm';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {
  constant,
  chain,
  getProp,
  isEmpty,
  map,
  not,
  option,
  pipe,
  safe,
} from 'crocks';
import Detail from 'components/Disclosure/AsideDisclosure';
import useQuestion from '../api/useQuestion';
import {HelpListRoute} from '../routes';



const displayValue = mapper => pipe(
  getProp('value'),
  chain(safe(not(isEmpty))),
  map(mapper),
  option(''),
  constant,
)



const onChange = ({set}) => ({value}) => set(value);

const HelpEditForm = ({saveRef, removeRef, assignRef, removeRelRef}) => {
  const {id} = useParams();

  const {t} = useTranslation('help', {keyPrefix: 'edit'});
  const {t: tf} = useTranslation('help', {keyPrefix: 'edit.field'});
  
  

  const {ctrl, result, form, setForm} = useResultForm({
    id: {
      initial: id,
      validator: constant(true),
    },
  });

  // console.log({form});
  
  // save 
  useQuestion({
    id,
    formResult: result,
    setForm,
    saveRef,
    successRedirectPath: HelpListRoute.props.path,
  });


  return (
    <section className={'flex flex-col lg:flex-row lg:min-h-full'}>
      <div className='flex flex-col flex-1 p-4 space-y-4'>
        <h2 className='text-sm font-normal text-gray-500'>{t('message')}</h2>

        <p className='font-normal text-[13px]'>{form['message']}</p>
      </div>
      <aside className={'border-l border-gray-border'}>
        <Detail title={t`information`}>
          <Detail.Item left={<span className='block min-w-[6rem] whitespace-nowrap'>{t`field.client`}</span>} right={<span>{form['user_id']}</span>} />
          <Detail.Item left={<span className='block min-w-[6rem] whitespace-nowrap'>{t`field.created_at`}</span>} right={<span>{form['created_at']}</span>} />
          <Detail.Item left={<span className='block min-w-[6rem] whitespace-nowrap'>{t`field.subject`}</span>} right={<span>{form['subject']}</span>} />
          <Detail.Item left={<span className='block min-w-[6rem] whitespace-nowrap'>{t`field.answer_type`}</span>} right={<span>{form['answer_type']}</span>} />
        </Detail>
      </aside>
    </section>
  );
}

export default HelpEditForm;
