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
import {format} from 'date-fns';



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

  // console.log(form['created_at']);
  
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
          <Detail.Item left={t`field.client`} right={form['user']?.fullName} />
          <Detail.Item left={t`field.created_at`} right={form['created_at'] && format(new Date(form['created_at']), 'Y-MM-dd HH:mm')} />
          <Detail.Item left={t`field.subject`} right={form['subject']} />
          <Detail.Item left={t`field.answer_type`} right={form['answer_type']} />
        </Detail>
      </aside>
    </section>
  );
}

export default HelpEditForm;
