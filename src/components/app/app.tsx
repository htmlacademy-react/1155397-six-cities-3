import Loader from '../loader/loader';
import Layout from '../layout/layout';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import PrivateRoute from '../private-route';
import MainPage from '../../pages/main-page/main-page';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFound from '../../pages/not-found/not-found';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../store/hooks';
import { AppRoute } from '../../const';
import { fetchOffers, checkAuthorization } from '../../store/api-action';
import { store } from '../../store';
import OfferPage from '../../pages/offer/offer';

store.dispatch(checkAuthorization());
store.dispatch(fetchOffers());

function App() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isLoading = useAppSelector((state) => state.isLoading);

  if(isLoading) {
    return (
      <HelmetProvider>
        <Loader/>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Main} element={<Layout />}>
            <Route index path={AppRoute.Main} element={ <MainPage />} />
            <Route path={AppRoute.Login} element={ <Login /> } />
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <Favorites />
              </PrivateRoute>
            }
            />
            <Route path={`${AppRoute.Offer}/:offerId`} element={ <OfferPage /> } />
          </Route>
          <Route path={AppRoute.NotFound} element={ <NotFound /> }></Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
