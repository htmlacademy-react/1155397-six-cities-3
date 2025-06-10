import { AuthorizationStatus, RoutePath } from '../../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../private-route';
import MainPage from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFound from '../../pages/not-found/not-found';
import OfferPage from '../../pages/offer/offer';
import { TOffers } from '../../types/offers';

type TAppProps = {
    offers: TOffers;
    foundPlacesCount: number;
};

function App({offers, foundPlacesCount}: TAppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePath.Main} element={ <MainPage offers={offers} foundPlacesCount={foundPlacesCount} />} />
        <Route path={RoutePath.Login} element={ <Login /> } />
        <Route path={`${RoutePath.Offer}/:offerId`} element={ <OfferPage offers={offers} /> } />
        <Route path={RoutePath.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <Favorites offers={offers} />
          </PrivateRoute>
        }
        />
        <Route path={RoutePath.NotFound} element={ <NotFound /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
