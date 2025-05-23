import {AuthorizationStatus} from '../../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../private-route';
import MainPage from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFound from '../../pages/not-found/not-found';
import Offer from '../../pages/offer/offer';

type AppProps = {
    foundPlacesCount: number;
};

function App({foundPlacesCount}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <MainPage foundPlacesCount={foundPlacesCount} />} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/offer/:id" element={ <Offer /> } />
        <Route path="/favorites" element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <Favorites />
          </PrivateRoute>
        }
        />
        <Route path="*" element={ <NotFound /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
