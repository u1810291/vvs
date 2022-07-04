import {isEmail} from '@s-e/frontend/pred';
import Card from 'components/atom/Card';
import Button from 'components/Button';
import InputGroup from 'components/atom/input/InputGroup';
import resultToAsync from 'crocks/Async/resultToAsync';
import useAsync from 'hook/useAsync';
import useResultForm from 'hook/useResultForm';
import {useEffect, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {always} from 'util/func';
import {lengthGt} from 'util/pred';
import login from '../api/login';
import Checkbox from 'components/atom/input/CheckBox';
import {useAuth} from 'context/auth';
import {useNavigate} from 'react-router-dom';

const MainLoginForm = () => {
  const nav = useNavigate()
  const {isAuthorized, update} = useAuth();
  const {t} = useTranslation('login', {keyPrefix: 'mainForm'});
  const {result, ctrl} = useResultForm({
    username: {
      initial: 'lukas.l@s-e.lt',
      validator: isEmail,
      props: {
        value: ({value}) => value,
        onChange: ({set}) => ({target: {value}}) => set(value),
        label: always(t`label.email`),
        type: always('email'),
      }
    },
    password: {
      initial: 'EuroCash2022',
      validator: lengthGt(5),
      props: {
        value: ({value}) => value,
        onChange: ({set}) => ({target: {value}}) => set(value),
        label: always(t`label.password`),
        type: always('password'),
      }
    },
    rememberMe: {
      initial: true,
      validator: always(true),
      opt: true,
      props: {
        value: ({value}) => value,
        onChange: ({set}) => ({target: {value}}) => set(value),
        label: always(t`label.rememberMe`),
        type: always('password'),
        name: always('remember-me'),
        isChecked: ({value}) => value,
      }
    }
  });

  const [state, fork] = useAsync(
    resultToAsync(result).chain(login),
    console.error,
    update
  );

  const submit = useCallback((event) => { event.preventDefault(); fork() }, [fork]);

  useEffect(() => {
    if (isAuthorized === true) nav('/');
  }, [isAuthorized]);

  return (
    <Card.SmRounded>
      <form className='space-y-6'>
        <InputGroup {...ctrl('username')} />
        <InputGroup {...ctrl('password')} />
        <Checkbox {...ctrl('rememberMe')} />
        <Button.Sm type='submit' className='w-full' onClick={submit}>
          {t`button.submit`}
        </Button.Sm>
      </form>
    </Card.SmRounded>
  );
};

export default MainLoginForm;
