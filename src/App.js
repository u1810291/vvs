import ProtectedRoute from './feature/protected';
import MainRoutes from 'Routes';
import {BrowserRouter, Routes, Route, useNavigate, Outlet} from 'react-router-dom';
import {useEvent} from '@react-aria/utils';
import {useEffect} from 'react';
import {useAuth} from 'context/auth';
import LoginRoute, {LOGIN_PAGE} from 'feature/login/routes';

const AuthorizedOutlet = () => {
  const {isAuthorized} = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (!isAuthorized) nav(LOGIN_PAGE);
  }, []);
  return <Outlet/>
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthorizedOutlet/>}>
          {MainRoutes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
