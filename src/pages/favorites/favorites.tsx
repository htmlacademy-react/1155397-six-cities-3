// import { TOffers } from '../../types/offers';
// import { Helmet } from 'react-helmet-async';
// import PlacesList from '../../components/places-list/places-list';
import { useAppSelector } from '../../store/hooks';
// import { getAuthStatus } from '../../store/slices/user-slice';
import { getFavoriteOffers } from '../../store/slices/favorite-slice';
import Footer from '../../components/footer/footer';
import FavoriteEmpty from '../../components/favorite-empty/favorite-empty';

function Favorites() {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  // const isAuth = useAppSelector(getAuthStatus);

  if(favoriteOffers.length === 0) {
    return (
      <>
        <FavoriteEmpty />
        <Footer/>
      </>
    );
  }
}

export default Favorites;
