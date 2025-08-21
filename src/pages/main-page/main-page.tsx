import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import Sorting from '../../components/sorting/sorting';
import EmptyPlacesList from '../../components/empty-places-list/empty-places-list';
import Loader from '../../components/loader/loader';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';

function MainPage() {
  const offers = useAppSelector((state)=> state.offers);
  const currentCity = useAppSelector((state) => state.city);

  const [activeOffer, setactiveOffer] = useState<null | string>(null);
  const activeOfferChangeHandler = (id: string | null) => setactiveOffer(id);
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
      {offers.length === 0 && <EmptyPlacesList city={currentCity} />}
      {offers.length &&
      <div className="cities">
        <div className={`cities__places-container ${emptyContainerClass} container`}>
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in Amsterdam</b>
            <Sorting />
            <PlacesList
              offers={offers}
              cardVariant={'primary'}
              onActiveOfferChange={activeOfferChangeHandler}
            />
          </section>
          <div className="cities__right-section">
            <Map
              className='cities__map'
              offers={offers}
              city={currentCity}
              selectedPoint={activeOffer}
            />

          </div>
        </div>
      </div>}
    </main>
  );
}

export default MainPage;
