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
  find,
  getProp,
  isEmpty,
  map,
  not,
  option,
  pipe,
  safe,
  identity,
  getPropOr,
  propEq,
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
  const {t: tp} = useTranslation('permission', {keyPrefix: 'edit.fieldPlaceholder'});
  const {t: ts} = useTranslation('permission', {keyPrefix: 'status'});
  const requests = useCrewRequest();
  const statuses = useCrewRequestStatus(true);
  const crews = useCrews({filters: {}});

  // console.log({requests});

  const {ctrl, result, form, setForm} = useResultForm({
    crew_id: FORM_FIELD.TEXT({label: tf`crew_id`, props: {
      displayValue: displayValue(identity),
      onChange: ({set}) => set,
      labelText: constant(tf`crew_id`),
      displayValue: ({value}) => () => pipe(
        getProp('data'),
        chain(find(propEq('id', value))),
        chain(getProp('name')),
        option(''),
      )(crews),
    }}),
    request_id: FORM_FIELD.TEXT({label: tf`request_id`, validator: () => true, props: {
      displayValue: displayValue(titleCase),
      labelText: constant(tf`request_id`),
      multiple: constant(false),
      placeholder: constant(tp`request_id`),
      value: ({value}) => value,
      onChange: ({set}) => set,
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

        <ComboBox className={'w-1/4'} {...ctrl('request_id')}>
          {ComboBox.asOptions(
            [
              getPropOr(null, 'value'),
              ({value}) => titleCase(value || t`untitledRequest`),
            ],
            getProp('data', requests)
          )}
        </ComboBox>

        <ComboBox className={'w-1/4'} {...ctrl('crew_id')}>
          {ComboBox.asOptions(
            [getPropOr(null, 'id'), ({name, id}) => titleCase(name || id)],
            getProp('data', crews)
          )}
        </ComboBox>
      </div>
    </section>
  );
}

export default PermissionEditForm;
