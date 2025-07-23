import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../private-route';
import MainPage from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFound from '../../pages/not-found/not-found';
import OfferPage from '../../pages/offer/offer';
import { useAppSelector } from '../../store/hooks';
import { AuthorizationStatus, RoutePath } from '../../const';
import { fetchOffers } from '../../store/api-action';
import { store } from '../../store';
store.dispatch(fetchOffers());

function App() {
  const offers = useAppSelector((state)=> state.offers);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePath.Main} element={ <MainPage />} />
        <Route path={RoutePath.Login} element={ <Login /> } />
        <Route path={`${RoutePath.Offer}/:id`} element={ <OfferPage offers={offers} /> } />
        <Route path={RoutePath.Favorites} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <Favorites />
          </PrivateRoute>
        }
        />
        <Route path={RoutePath.NotFound} element={ <NotFound /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
