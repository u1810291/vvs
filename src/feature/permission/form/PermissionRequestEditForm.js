import useResultForm, {FORM_FIELD} from 'hook/useResultForm';
import {PermissionRequestListRoute} from '../routes';
import {useCrewRequestFull} from '../api';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import InputGroup from 'components/atom/input/InputGroup';
import {map, constant, curry, isString, pipe, safe, chain, Sum, mreduce} from 'crocks';
import {formatISODuration} from 'date-fns';

const regexDurationPart = curry((names, value) => pipe(
  safe(isString),
  map(a => a.match(new RegExp(`((?<want>\\d+) {0,}(${names.join('|')}))`, 'i'))?.groups?.want),
  map(parseInt),
  chain(safe(isFinite)),
)(value));

const extractHours = regexDurationPart(['v', 'val.?', 'hr', 'hours', 'h']);
const extractMinutes = regexDurationPart(['m', 'min.?']);
const extractSeconds = regexDurationPart(['s', 'sek', 'sec.?', ]);

const PermissionRequestEditForm = ({saveRef}) => {
  const {id} = useParams();
  const {t} = useTranslation('permission', {keyPrefix: 'request.edit'});

  const {ctrl, result, setForm} = useResultForm({
    value: FORM_FIELD.TEXT({label: t`value`}),
    duration: FORM_FIELD.TEXT({
      label: t`duration`,
      validator: constant(true),
      props: {
        onChange: a => b => {
          const value = b.target.value;
          const allSeconds = mreduce(Sum, [
            extractSeconds(value).option(0),
            extractMinutes(value).map(num => num * 60).option(0),
            extractHours(value).map(num => num * 60 * 60).option(0),
          ]);

          const days = Math.floor(allSeconds / 60 / 60 / 24);
          const hours = Math.floor((allSeconds / 60 / 60) - (days * 24));
          const minutes = Math.floor((allSeconds / 60) - (hours * 60) - (days * 24 * 60));
          const seconds = allSeconds - (minutes * 60) - (hours * 60 * 60) - (days * 24 * 60 * 60);

          const formatted = formatISODuration({
            days,
            hours,
            minutes,
            seconds,
          })

          console.log({
            formatted,
            days: parseInt(formatted.match(/P.*(\d+)D/i)?.[1]),
            hours: parseInt(formatted.match(/P.*\D+.*(\d+)H/i)?.[1]),
            minutes: parseInt(formatted.match(/P.*\D+(\d+)M/i)?.[1]),
            seconds: parseInt(formatted.match(/P.*\D+(\d+)S/i)?.[1]),
          });
          a.set(b.target.value);
        },
      }
    })
  });

  useCrewRequestFull({
    id,
    formResult: result,
    setForm,
    successRedirectPath: PermissionRequestListRoute.props.path,
    saveRef,
  });

  return (
    <section className={'flex'}>
      <div className={'p-6 space-y-4 flex-grow'}>
        <InputGroup {...ctrl('value')} />
        <InputGroup {...ctrl('duration')} />
      </div>
    </section>
  );
}

export default PermissionRequestEditForm;
