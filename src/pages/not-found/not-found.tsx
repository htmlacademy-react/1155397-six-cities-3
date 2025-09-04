import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return(
    <div className="page">
      <Helmet>
        <title>6 cities - 404 Page not found</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} onClick={() => navigate(AppRoute.Main)}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main">
        <div className="page-not-found" style={{ display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '800px', margin: '0 auto', }} >
          <div className="page-not-found__img">
            <img className="offer__image" src="img/404.png" alt="Error 404" />
          </div>
          <h1>We can`t seem to find a page you`re looking for.</h1>
          <Link to="/" style={{borderBottom: '1px solid #589af8', maxWidth: '280px', margin: '0 auto', }}>Back to main page</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFound;
