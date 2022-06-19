import Card from 'components/atom/Card';
import CheckBox from 'components/atom/input/CheckBox';
import Button from 'components/Button';
import InputGroup from 'components/InputGroup';
import {constant, once, pipe} from 'crocks';
import useResultForm from 'hook/useResultForm';
import {useTranslation} from 'react-i18next';

const always = pipe(
  constant,
  once
);

const MainLoginForm = () => {
  const {t} = useTranslation('login', {keyPrefix: 'mainForm'});
  const {result, ctrl} = useResultForm({
    email: {
      initial: 'lukas.l@s-e.lt',
      props: {
        label: always(t`label.email`),
        type: always('email'),
      }
    },
    password: {
      initial: 'EuroCash2022',
      props: {
        label: always(t`label.password`),
        type: always('password'),
      }
    },
    rememberMe: {
      initial: true,
      props: {
        label: always(t`label.rememberMe`),
        type: always('password'),
        name: always('remember-me'),
        isChecked: ({value}) => value,
      }
    }
  })

  return (
    <Card>
      <form className='space-y-6'>
        <InputGroup {...ctrl('email')} />
        <InputGroup {...ctrl('password')} />
        <CheckBox {...ctrl('rememberMe')}/>
        <Button.Sm type='submit' className='w-full' onClick={
          a => {
            a.preventDefault();
            console.log(a);
          }
        }>{t`button.submit`}</Button.Sm>
      </form>
    </Card>
  );
};

export default MainLoginForm;
