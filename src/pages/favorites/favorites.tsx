import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../store/hooks';
import { getFavoriteOffers } from '../../store/slices/favorite-slice';
import Footer from '../../components/footer/footer';
import FavoriteEmpty from '../../components/favorite-empty/favorite-empty';
import PlacesList from '../../components/places-list/places-list';

function Favorites() {
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  if(favoriteOffers.length === 0) {
    return (
      <>
        <FavoriteEmpty />
        <Footer/>
      </>
    );
  } else {
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
                <PlacesList
                  offers={favoriteOffers}
                  cardVariant={'primary'}
                  onActiveOfferChange={() => {}}
                />
              </ul>
            </section>
          </div>
        </main>
        <Footer/>
      </>
    );
  }
}

export default Favorites;
