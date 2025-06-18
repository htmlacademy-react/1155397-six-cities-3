import { TOffers } from '../../types/offers';
import PlacesList from '../../components/places-list/places-list';
import { useState } from 'react';

type FavoritesProps = {
  offers: TOffers;
};

function Favorites({offers}: FavoritesProps) {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const cities = [...new Set(favoriteOffers.map(({ city }) => city.name))];
  const [, setID] = useState<string | null>(null);

  return (
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
                      <PlacesList offers={offerOfCity} cardVariant={'favorite'} onActiveOfferChange={(id: string | null) => {
                        setID(id);
                      }}
                      />
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
