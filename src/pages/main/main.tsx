import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import Sorting from '../../components/sorting/sorting';
import EmptyPlacesList from '../../components/empty-places-list/empty-places-list';
import Loader from '../../components/loader/loader';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { SortDictionary } from '../../utils';
import { TOffers } from '../../types/offers';
import { getOffers, getCurrentCity, getCurrentSort } from '../../store/slices/offers-slice';

function Main() {
  const offers = useAppSelector(getOffers);
  const currentCity = useAppSelector(getCurrentCity);
  const currentSort = useAppSelector(getCurrentSort);
  const currentOffers = offers.filter(({city}) => city.name === currentCity.name);
  const sortedoffers: TOffers = currentSort === 'Popular'
    ? currentOffers
    : currentOffers.slice().sort(SortDictionary[currentSort]);
  const [activeOffer, setActiveOffer] = useState<string | null>(null);
  const activeOfferChangeHandler = (id: string | null) => setActiveOffer(id);
  const emptyPageClass = offers.length === 0 ? 'page__main--index-empty' : '';
  const emptyContainerClass = offers.length === 0 ? 'cities__places-container--empty' : '';

  if (!offers) {
    return <Loader />;
  }

  return (
    <main className={`page__main ${emptyPageClass} page__main--index`}>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <CitiesList />
      </div>
      {currentOffers.length === 0 && <EmptyPlacesList city={currentCity} />}
      {currentOffers.length &&
      <div className="cities">
        <div className={`cities__places-container ${emptyContainerClass} container`}>
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{currentOffers.length} places to stay in {currentCity.name}</b>
            <Sorting />
            <PlacesList
              offers={sortedoffers}
              cardVariant={'primary'}
              onActiveOfferChange={activeOfferChangeHandler}
            />
          </section>
          <div className="cities__right-section">
            <Map
              className='cities__map'
              offers={currentOffers}
              city={currentCity}
              selectedPoint={activeOffer}
            />
          </div>
        </div>
      </div>}
    </main>
  );
}

export default Main;
