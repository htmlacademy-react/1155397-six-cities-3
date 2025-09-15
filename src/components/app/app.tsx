import Loader from '../loader/loader';
import Layout from '../layout/layout';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import PrivateRoute from '../private-route/private-route';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import NotFound from '../../pages/not-found/not-found';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useAppSelector } from '../../store/hooks';
import { AppRoute } from '../../const';
import Offer from '../../pages/offer/offer';
import { getLoadingStatus } from '../../store/slices/offers-slice';
import { getErrorStatus } from '../../store/slices/offers-slice';
import ErrorScreen from '../error-screen/error-screen';

function App() {
  const isLoading = useAppSelector(getLoadingStatus);
  const isError = useAppSelector(getErrorStatus);

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        { isLoading && <Loader /> }
        { !isLoading && isError && <ErrorScreen /> }
        { !isLoading && !isError && (
          <Routes>
            <Route path={AppRoute.Main} element={<Layout />}>
              <Route index path={AppRoute.Main} element={ <Main />} />
              <Route path={AppRoute.Login} element={ <Login /> } />
              <Route path={AppRoute.Favorites} element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
              />
              <Route path={`${AppRoute.Offer}/:offerId`} element={ <Offer /> } />
            </Route>
            <Route path={AppRoute.NotFound} element={ <NotFound /> }></Route>
          </Routes>
        )}
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
