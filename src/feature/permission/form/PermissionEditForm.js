import SelectBox from 'components/atom/input/SelectBox';
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
} from 'crocks';

const displayValue = mapper => pipe(
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
  const requests = useCrewRequest(true);
  const statuses = useCrewRequestStatus(true);
  const crews = useCrews({filters: {}});

  console.log({requests});

  const {ctrl, result, setForm} = useResultForm({
    crew_id: FORM_FIELD.TEXT({label: tf`crew_id`, props: {
      displayValue: displayValue(identity),
      onChange,
      disabled: ({value}) => isTruthy(value),
    }}),
    request_id: FORM_FIELD.TEXT({label: tf`request_id`, validator: () => true, props: {
      displayValue: displayValue(titleCase),
      value: a => {
        console.log({a});
      },
      onChange,
    }}),
    status: FORM_FIELD.TEXT({label: tf`status`, validator: () => true, props: {
      displayValue: displayValue(ts),
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
        <SelectBox className={'lg:w-1/3 xl:w-1/4'} {...ctrl('status')}>
          {map(value => (
            <SelectBox.Option key={value} value={value}>
              {titleCase(value)}
            </SelectBox.Option>
          ), statuses)}
        </SelectBox>

        <SelectBox className={'lg:w-1/3 xl:w-1/4'} {...ctrl('request_id')}>
          {map(value => (
            <SelectBox.Option key={value} value={value}>
              {titleCase(value)}
            </SelectBox.Option>
          ), requests)}
        </SelectBox>

        <SelectBox className={'lg:w-1/3 xl:w-1/4'} {...ctrl('crew_id')}>
          {map(crew => (
            <SelectBox.Option key={`${crew.id} ${+ new Date()}`} value={crew.id}>
              {titleCase(crew.name || crew.id)}
            </SelectBox.Option>
          ), (crews?.data || []))}
        </SelectBox>
      </div>
    </section>
  );
}

export default PermissionEditForm;
