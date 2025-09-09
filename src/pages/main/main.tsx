import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import Sorting from '../../components/sorting/sorting';
import EmptyPlacesList from '../../components/empty-places-list/empty-places-list';
import Loader from '../../components/loader/loader';
import { Helmet } from 'react-helmet-async';
import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { getOffers, getCurrentCity, getCityOffers, getSortedCityOffers } from '../../store/slices/offers-slice';
import { fetchOffers } from '../../store/thunks/offers';
import { useAppDispatch } from '../../store/hooks';

function Main() {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);
  const currentCity = useAppSelector(getCurrentCity);
  const currentOffers = useAppSelector(getCityOffers);
  const sortedOffers = useAppSelector(getSortedCityOffers);

  useEffect(() => {
    if (!offers.length) {
      dispatch(fetchOffers());
    }
  }, [dispatch, offers.length]);

  const [activeOffer, setActiveOffer] = useState<string | null>(null);
  const activeOfferChangeHandler = useCallback((id: string | null) => setActiveOffer(id), []);
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
      {currentOffers.length > 0 &&
      <div className="cities">
        <div className={`cities__places-container ${emptyContainerClass} container`}>
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{currentOffers.length} places to stay in {currentCity.name}</b>
            <Sorting />
            <div className="cities__places-list places__list tabs__content">
              <PlacesList
                offers={sortedOffers}
                cardVariant={'primary'}
                onActiveOfferChange={activeOfferChangeHandler}
              />
            </div>
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
