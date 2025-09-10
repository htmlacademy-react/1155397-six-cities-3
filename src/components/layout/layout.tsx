import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import classNames from 'classnames';
import { useAppDispatch } from '../../store/hooks';
import { logoutUser } from '../../store/thunks/user';
import { getAuthStatus, getUserData } from '../../store/slices/user-slice';
import { getOffers } from '../../store/slices/offers-slice';

function Layout() {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);
  const user = useAppSelector(getUserData);
  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;
  const pathname = window.location.pathname as AppRoute;
  const isUserNotAuth = pathname !== AppRoute.Login;
  const navigate = useNavigate();
  const favoritesOffers = offers.filter((offer) => offer.isFavorite);

  const pageClassName = classNames({
    'page': true,
    'page--gray page--main': (pathname === AppRoute.Main),
    'page--gray page--login': (pathname === AppRoute.Login),
    'page--favorites-empty': (pathname === AppRoute.Favorites && favoritesOffers.length === 0),
    'page__main--index-empty': (pathname === AppRoute.Main && offers.length === 0),
  });

  const headerLogoClassName = classNames({
    'header__logo-link': true,
    'header__logo-link--active': (pathname === AppRoute.Main)}
  );

  const handleLoginClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if(isAuth) {
      dispatch(logoutUser());
      navigate(AppRoute.Main);
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <div className={pageClassName}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className={headerLogoClassName}
                to={AppRoute.Main}
                onClick={() => navigate(AppRoute.Main)}
              >
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            {isUserNotAuth &&
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {isAuth &&
                    <li className="header__nav-item user">
                      <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        {user && (
                          <span className="header__user-name user__name">
                            {user.email}
                          </span>
                        )}
                        <span className="header__favorite-count">{favoritesOffers ? favoritesOffers.length : 0}</span>
                      </Link>
                    </li>}
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={isAuth ? AppRoute.Login : AppRoute.Main} onClick={handleLoginClick}>
                      <span className={classNames({
                        'header__login' : !isAuth,
                        'header__signout' : isAuth
                      })}
                      >{isAuth ? 'Log Out' : 'Log in'}
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>}
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}


export default Layout;
