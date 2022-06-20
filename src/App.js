import MainRoutes from 'Routes';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthorizedOutlet from 'feature/login/layout/AuthorizationOutlet';

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
