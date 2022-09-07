import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {titleCase} from '@s-e/frontend/transformer/string';
import {useKeyBox} from '../api';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useCrews} from 'feature/crew/api/crewEditApi';
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
import InputGroup from 'components/atom/input/InputGroup';
import KeyObjectList from '../components/KeyObjectList';
// import Nullable from 'components/atom/Nullable';
import {KeyBoxEditRoute, KeyBoxListRoute} from '../routes';
import ComboBox from 'components/atom/input/ComboBox';
import {hasLength} from '@s-e/frontend/pred';



const displayValue = mapper => pipe(
  getProp('value'),
  chain(safe(not(isEmpty))),
  map(mapper),
  option(''),
  constant,
)



const onChange = ({set}) => ({value}) => set(value);

const KeyBoxEditForm = ({saveRef, removeRef, assignRef, removeRelRef}) => {
  const {id} = useParams();

  const {t} = useTranslation('key', {keyPrefix: 'edit'});
  const {t: tf} = useTranslation('key', {keyPrefix: 'edit.field'});
  
  const crews = useCrews({filters: {}});

  const {ctrl, result, form, setForm} = useResultForm({
    set_name: FORM_FIELD.TEXT({
      label: tf`set_name`, 
      validator: hasLength,
      message: t`validation.set_name`,
      showValidationBelow: true,
      props: {isRequired: constant(true)},
    }),
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
  });

  // console.log({form});
  
  // save key box
  useKeyBox({
    id,
    formResult: result,
    setForm,
    successRedirectPath: id ? KeyBoxListRoute.props.path : null,
    saveRef,
    removeRef,
    editRedirectPath: KeyBoxEditRoute.props.path,
    newObjectPath: ['insert_object_key_box_one', 'id'],
  });


  return (
    <section className={'flex flex-col'}>
      <div className={'p-6 space-y-4 lg:space-y-0 lg:flex lg:space-x-4 flex-grow'}>
        <InputGroup className={'lg:w-1/4 xl:w-1/4'} inputClassName={'h-[32px]'} {...ctrl('set_name')} />

        <ComboBox 
          className={'w-1/4'} 
          labelText={tf('crew')}
          multiple={false}
          placeholder={'Search [Single choice]'}
          {...ctrl('crew_id')} 
          value={form['crew_id']}
          data-id={form['crew_id']}
          displayValue={v => crews?.data?.find(o => o.id === v)?.name}
          onChange={(v) => {
            const theForm = {...form};
            theForm['crew_id'] = v;
            setForm(theForm);
          }}
        >
          {map(crew => (
            <ComboBox.Option key={crew.id} value={crew.id}>
              {titleCase(crew.name || crew.id)}
            </ComboBox.Option>
          ), (crews?.data || []))}
        </ComboBox>
      </div>

      <KeyObjectList boxId={id} assignRef={assignRef} removeRef={removeRelRef} />
    </section>
  );
}

export default KeyBoxEditForm;
