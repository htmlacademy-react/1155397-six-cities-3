import { Link } from 'react-router-dom';

function NotFound() {
  return(
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </a>
                </li>
              </ul>
            </nav>
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
