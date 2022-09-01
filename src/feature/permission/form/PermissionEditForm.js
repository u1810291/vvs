import SelectBox from 'components/atom/input/SelectBox';
import ComboBox from 'components/atom/input/ComboBox';
import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {titleCase} from '@s-e/frontend/transformer/string';
import {PermissionListRoute} from '../routes';
import {useCrewRequest,useCrewRequestStatus, usePermission} from '../api';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useCrews} from 'feature/crew/api/crewEditApi';
import {
  constant,
  chain,
  getProp,
  isEmpty,
  map,
  isTruthy,
  not,
  option,
  pipe,
  safe,
  identity,
  // tap,
} from 'crocks';

const displayValue = mapper => pipe(
  // tap(console.log),
  getProp('value'),
  chain(safe(not(isEmpty))),
  map(mapper),
  option(''),
  constant,
)

const onChange = ({set}) => ({value}) => set(value);

const PermissionEditForm = ({saveRef}) => {
  const {id} = useParams();
  const {t} = useTranslation('permission', {keyPrefix: 'edit'});
  const {t: tf} = useTranslation('permission', {keyPrefix: 'edit.field'});
  const {t: ts} = useTranslation('permission', {keyPrefix: 'status'});
  const requests = useCrewRequest();
  const statuses = useCrewRequestStatus(true);
  const crews = useCrews({filters: {}});

  // console.log({requests});

  const {ctrl, result, form, setForm} = useResultForm({
    crew_id: FORM_FIELD.TEXT({label: tf`crew_id`, props: {
      displayValue: displayValue(identity),
      // onChange,
      disabled: ({value}) => isTruthy(value),
    }}),
    request_id: FORM_FIELD.TEXT({label: tf`request_id`, validator: () => true, props: {
      displayValue: displayValue(titleCase),
      value: a => {
        // console.log({a});
      },
      // onChange,
    }}),
    status: FORM_FIELD.TEXT({label: tf`status`, validator: () => true, props: {
      displayValue: displayValue(titleCase),
      onChange,
    }}),
  });

  usePermission({
    id,
    formResult: result,
    setForm,
    successRedirectPath: PermissionListRoute.props.path,
    saveRef,
  });

  return (
    <section className={'flex'}>
      <div className={'p-6 space-y-4 lg:space-y-0 lg:flex lg:space-x-4 flex-grow'}>
        <SelectBox 
          className={'lg:w-1/4 xl:w-1/4'} 
          {...ctrl('status')} 
          multiple={false}
          onChange={(v) => {
            const theForm = {...form};
            theForm['status'] = v;
            setForm(theForm);
          }}>
          {map(value => (
            <SelectBox.Option key={value} value={value}>
              {titleCase(value)}
            </SelectBox.Option>
          ), statuses)}
        </SelectBox>

        <ComboBox 
          className={'w-1/4'} 
          labelText={tf('request_id')}
          multiple={false}
          placeholder={'Search [Single choice]'}
          {...ctrl('request_id')} 
          value={form['request_id']}
          data-id={form['request_id']}
          onChange={(v) => {
            const theForm = {...form};
            theForm['request_id'] = v;
            setForm(theForm);
          }}
        >
          {map(request => (
            <ComboBox.Option key={request.value} value={request.value}>
              {titleCase(request.value)}
            </ComboBox.Option>
          ), (requests?.data || []))}
        </ComboBox>

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
    </section>
  );
}

export default PermissionEditForm;
