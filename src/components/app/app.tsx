import { AuthorizationStatus, RoutePath } from '../../const';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../private-route';
import MainPage from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFound from '../../pages/not-found/not-found';
import OfferPage from '../../pages/offer/offer';
import { useAppSelector } from '../../store/hooks';
import { TReviews } from '../../types/reviews';

const defaultCity = {
  name: 'Amsterdam',
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 11
  }
};

type TAppProps = {
    reviews: TReviews;
};

function App({reviews}: TAppProps) {
  const offersAll = useAppSelector((state)=> state.offers);
  const checkedCityName = useAppSelector((state) => state.selectedCity);

  const filteredOffers = offersAll.filter((item) => (
    checkedCityName === item.city?.name
  ));

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePath.Main} element={ <MainPage defaultCity={defaultCity} offers={filteredOffers} />} />
        <Route path={RoutePath.Login} element={ <Login /> } />
        <Route path={`${RoutePath.Offer}/:offerId`} element={ <OfferPage offers={filteredOffers} reviews={reviews} /> } />
        <Route path={RoutePath.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <Favorites offers={offersAll} />
          </PrivateRoute>
        }
        />
        <Route path={RoutePath.NotFound} element={ <NotFound /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
