import {AuthorizationStatus} from '../../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../private-route';
import MainPage from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFound from '../../pages/not-found/not-found';
import OfferPage from '../../pages/offer/offer';
import { Offers } from '../../types/offers';

type AppProps = {
    offers: Offers;
    foundPlacesCount: number;
};

function App({offers, foundPlacesCount}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <MainPage offers={offers} foundPlacesCount={foundPlacesCount} />} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/offer/:offerId" element={ <OfferPage offers={offers} /> } />
        <Route path="/favorites" element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <Favorites offers={offers} />
          </PrivateRoute>
        }
        />
        <Route path="*" element={ <NotFound /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
