import Detail from 'components/Disclosure/AsideDisclosure';
import useQuestion from '../api/useQuestion';
import useResultForm from 'hook/useResultForm';
import {HelpListRoute} from '../routes';
import {constant} from 'crocks';
import {format} from 'date-fns';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

const HelpEditForm = ({saveRef}) => {
  const {id} = useParams();
  const {t} = useTranslation('help', {keyPrefix: 'edit'});
  const {result, form, setForm} = useResultForm({
    id: {
      initial: id,
      validator: constant(true),
    },
  });

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
