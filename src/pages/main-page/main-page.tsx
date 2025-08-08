import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { useState } from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../store/hooks';
import Sorting from '../../components/sorting/sorting';
import EmptyPlacesList from '../../components/empty-places-list/empty-places-list';
import { SortDictionary } from '../../utils';
import { TOffers } from '../../types/offers';

function MainPage() {
  const offers = useAppSelector((state)=> state.offers);
  const selectedCity = useAppSelector((state) => state.city);
  const currentOffers = offers.filter((offer)=> offer.city.name === selectedCity.name);
  const currentSort = useAppSelector((state) => state.sort);

  const sortedoffers: TOffers = currentSort === 'Popular' ? currentOffers : currentOffers.slice().sort(SortDictionary[currentSort]);

  const [activeOffer, setactiveOffer] = useState<null | string>(null);
  const activeOfferChangeHandler = (id: string | null) => setactiveOffer(id);

  const emptyPageClass = currentOffers.length === 0 ? 'page__main--index-empty' : '';
  const emptyContainerClass = currentOffers.length === 0 ? 'cities__places-container--empty' : '';

  return (
    <main className={`page__main ${emptyPageClass} page__main--index`}>
      <h1 className="visually-hidden">Cities</h1>

      <div className="tabs">
        <section className="locations container">
          <CitiesList />
        </section>
      </div>

      <div className="cities">
        <div className={`cities__places-container ${emptyContainerClass} container`}>
          { sortedoffers.length > 0 ? (
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in Amsterdam</b>
              <Sorting />
              <PlacesList
                offers={sortedoffers}
                cardVariant={'primary'}
                onActiveOfferChange={activeOfferChangeHandler}
              />
            </section>
          ) : (
            <EmptyPlacesList />
          )}

          <div className="cities__right-section">
            {
              currentOffers.length > 0 &&
                <Map
                  className='cities__map'
                  offers={currentOffers}
                  city={selectedCity}
                  selectedPoint={activeOffer}
                />
            }
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
