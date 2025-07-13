import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../store/hooks';
import Sorting from '../../components/sorting/sorting';
import EmptyPlacesList from '../../components/empty-places-list/empty-places-list';


function MainPage() {
  const offers = useAppSelector((state)=> state.offers);
  const selectedCity = useAppSelector((state) => state.city);
  const currentOffers = offers.filter((offer)=> offer.city.name === selectedCity.name);

  const [activeOffer, setactiveOffer] = useState<null | string>(null);
  const activeOfferChangeHandler = (id: string | null) => setactiveOffer(id);

  const emptyPageClass = currentOffers.length === 0 ? 'page__main--index-empty' : '';
  const emptyContainerClass = currentOffers.length === 0 ? 'cities__places-container--empty' : '';

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className={`page__main ${emptyPageClass} page__main--index`}>
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>

        <div className="cities">
          <div className={`cities__places-container ${emptyContainerClass} container`}>
            { currentOffers.length > 0 ? (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentOffers.length} places to stay in Amsterdam</b>
                <Sorting />
                <PlacesList
                  offers={currentOffers}
                  cardVariant={'primary'}
                  onActiveOfferChange={activeOfferChangeHandler}
                />
              </section>
            ) : (
              <EmptyPlacesList />
            )}

            <div className="cities__right-section">
              { currentOffers.length > 0 &&
                <Map className='cities__map' offers={currentOffers} city={selectedCity} selectedPoint={activeOffer} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
