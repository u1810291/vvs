import {useAuth} from 'context/auth';
import {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {LOGIN_PAGE} from 'feature/login/routes';





const AuthorizedOutlet = () => {
  const {isAuthorized, userData} = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (isAuthorized === false) nav(LOGIN_PAGE);
  }, [isAuthorized]);

  if (isAuthorized === null) return null;

  return <Outlet/>
};

export default AuthorizedOutlet;
