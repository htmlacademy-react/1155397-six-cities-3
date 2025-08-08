import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { AuthorizationStatus, RoutePath } from '../../const';
import classNames from 'classnames';
import { useAppDispatch } from '../../store/hooks';
import { logoutUser } from '../../store/api-action';

function Layout() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isUserAuth = authorizationStatus === AuthorizationStatus.Auth;
  const pathname = window.location.pathname as RoutePath;
  const isUserNotAuth = pathname !== RoutePath.Login;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const pageClassName = classNames({
    'page': true,
    'page--gray page--main': (pathname === RoutePath.Main),
    'page--gray page--login': (pathname === RoutePath.Login),
  });

  const headerLogoClassName = classNames({
    'header__logo-link': true,
    'header__logo-link--active': (pathname === RoutePath.Main)}
  );

  const handleLoginClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if(isUserAuth) {
      dispatch(logoutUser());
      navigate(RoutePath.Main);
    } else {
      navigate(RoutePath.Login);
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
                to={RoutePath.Main}
                onClick={() => navigate(RoutePath.Main)}
              >
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            {isUserNotAuth &&
              <nav className="header__nav">
                <ul className="header__nav-list">
                  {isUserAuth &&
                    <li className="header__nav-item user">
                      <a className="header__nav-link header__nav-link--profile" href="#">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                        <span className="header__favorite-count">0</span>
                      </a>
                    </li>}
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={(isUserAuth) ? RoutePath.Login : RoutePath.Main}
                      onClick={handleLoginClick}
                    >
                      <span className="header__signout">{(isUserAuth) ? 'Log Out' : 'Login'}</span>
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
