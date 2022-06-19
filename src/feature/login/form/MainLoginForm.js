import {isEmail} from '@s-e/frontend/pred';
import Card from 'components/atom/Card';
import CheckBox from 'components/atom/input/CheckBox';
import Button from 'components/Button';
import InputGroup from 'components/InputGroup';
import {constant, once, or, pipe} from 'crocks';
import resultToAsync from 'crocks/Async/resultToAsync';
import {empty} from 'crocks/pointfree';
import useAsync from 'hook/useAsync';
import useResultForm from 'hook/useResultForm';
import {useEffect, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {lengthGt} from 'util/pred';

const always = pipe(
  constant,
  once
);

const MainLoginForm = () => {
  const {t} = useTranslation('login', {keyPrefix: 'mainForm'});
  const {result, ctrl} = useResultForm({
    email: {
      initial: 'lukas.l@s-e.lt',
      validator: isEmail,
      props: {
        label: always(t`label.email`),
        type: always('email'),
      }
    },
    password: {
      initial: 'EuroCash2022',
      validator: lengthGt(5),
      props: {
        label: always(t`label.password`),
        type: always('password'),
      }
    },
    rememberMe: {
      initial: true,
      validator: always(true),
      opt: true,
      props: {
        label: always(t`label.rememberMe`),
        type: always('password'),
        name: always('remember-me'),
        isChecked: ({value}) => value,
      }
    }
  });

  /**
   * @todo
   * TODO: resultToAsync(result) -> api -> useAsync -> fork
   */
  const [state, fork] = useAsync(resultToAsync(result), console.error, console.warn);

  useEffect(() => {console.log(state)}, [state]);

  const submit = useCallback((event) => {
    event.preventDefault();
    fork()
  }, [fork]);

  return (
    <Card>
      <form className='space-y-6'>
        <InputGroup {...ctrl('email')} />
        <InputGroup {...ctrl('password')} />
        <CheckBox {...ctrl('rememberMe')}/>
        <Button.Sm type='submit' className='w-full' onClick={submit}>
          {t`button.submit`}
        </Button.Sm>
      </form>
    </Card>
  );
};

export default MainLoginForm;
