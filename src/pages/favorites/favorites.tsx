import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../store/hooks';
import Footer from '../../components/footer/footer';
import FavoriteEmpty from '../../components/favorite-empty/favorite-empty';
import PlacesList from '../../components/places-list/places-list';
import { CITIES } from '../../const';
import { getOffers } from '../../store/slices/offers-slice';

function Favorites() {
  const offers = useAppSelector(getOffers);
  const favoritesOffers = offers.filter((offer) => offer.isFavorite);

  if(favoritesOffers.length === 0) {
    return (
      <>
        <FavoriteEmpty />
        <Footer/>
      </>
    );
  }

  return (
    <>
      <main className="page__main page__main--favorites">
        <Helmet>
          <title>6 cities: Favorites</title>
        </Helmet>
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                favoritesOffers && CITIES.map((city) => {
                  const cityOffers = favoritesOffers.filter((offer) => offer.city.name === city.name);
                  if (cityOffers.length > 0) {
                    return (
                      <li className="favorites__locations-items" key={city.name}>
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="#">
                              <span>{city.name}</span>
                            </a>
                          </div>
                        </div>
                        <div className="favorites__places">
                          <PlacesList
                            offers={cityOffers}
                            cardVariant='favorite'
                          />
                        </div>
                      </li>
                    );
                  }
                })
              }
            </ul>
          </section>
        </div>
      </main>
      <Footer/>
    </>
  );
}

export default Favorites;
