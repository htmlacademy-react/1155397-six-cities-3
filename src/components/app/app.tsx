import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../private-route';
import MainPage from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFound from '../../pages/not-found/not-found';
import OfferPage from '../../pages/offer/offer';
import { useAppSelector } from '../../store/hooks';
import { RoutePath } from '../../const';
import { fetchOffers } from '../../store/api-action';
import { store } from '../../store';
import Loader from '../loader/loader';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../layout/layout';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

store.dispatch(fetchOffers());

function App() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const offers = useAppSelector((state) => state.offers);
  const isLoading = useAppSelector((state) => state.isLoading);

  if(isLoading) {
    return (
      <HelmetProvider>
        <Loader/>
      </HelmetProvider>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={RoutePath.Main} element={<Layout />}>
          <Route index path={RoutePath.Main} element={ <MainPage />} />
          <Route path={RoutePath.Login} element={ <Login /> } />
          <Route path={RoutePath.Favorites} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites />
            </PrivateRoute>
          }
          />
        </Route>
        <Route path={`${RoutePath.Offer}/:id`} element={ <OfferPage offers={offers} /> } />
        <Route path={RoutePath.NotFound} element={ <NotFound /> }></Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
