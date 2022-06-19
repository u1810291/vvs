import ProtectedRoute from './feature/protected';
import MainRoutes from 'Routes';
import {BrowserRouter, Routes, Route, useNavigate, Outlet} from 'react-router-dom';
import {useEvent} from '@react-aria/utils';
import {useEffect} from 'react';
import {useAuth} from 'context/auth';
import {LOGIN_PAGE} from 'feature/login/routes';

const Lol = () => {
  const {isAuthorized} = useAuth();
  const a = useNavigate();

  useEffect(() => {
    if (!isAuthorized) a(LOGIN_PAGE);
  }, []);
  return <Outlet/>
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Lol/>}>
          {MainRoutes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
