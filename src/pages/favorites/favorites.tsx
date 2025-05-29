import { Offers } from '../../types/offers';
import PlacesList from '../../components/places-list/places-list';
import { PlaceCardClassNamePrefix } from '../../const';

type FavoritesProps = {
  offers: Offers;
};

function Favorites({offers}: FavoritesProps) {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const cities = favoriteOffers.reduce((newOffers: string[], offer) => {
    if (!newOffers.includes(offer.city.name)) {
      newOffers.push(offer.city.name);
    }
    return newOffers;
  }, []);

  return(
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {
              cities.map((city) => {
                const offerOfCity = favoriteOffers.filter((offer) => offer.city.name === city);
                return (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <PlacesList offers={offerOfCity} classNamePrefix={PlaceCardClassNamePrefix.Favorites}/>
                    </div>
                  </li>
                );
              })
            }
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Favorites;
