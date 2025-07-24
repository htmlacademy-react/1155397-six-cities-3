import Map from '../../components/map/map';
import ReviewForm from '../../components/review-form/review-form';
import NotFound from '../not-found/not-found';
import ReviewsList from '../../components/reviews-list/rewies-list';
import PlacesList from '../../components/places-list/places-list';
import { TOffers } from '../../types/offers';
import { useParams } from 'react-router-dom';
import { calculateStarRating } from '../../utils';
import { useAppSelector } from '../../store/hooks';

type OfferPageProps = {
  offers: TOffers;
}

function OfferPage({offers}: OfferPageProps) {
  const { id } = useParams();
  const reviews = useAppSelector((state)=> state.reviews);
  const currentOffer = offers.find((offer) => offer.id === id);
  const isFavorite = currentOffer?.isFavorite ? 'offer__bookmark-button--active' : '';

  if(!currentOffer) {
    return <NotFound />;
  }

  const offerPage = {...offers, ...currentOffer};

  return(
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/room.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className={`offer__bookmark-button ${isFavorite} button`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: calculateStarRating(currentOffer.rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {(currentOffer.bedrooms > 1) ? `${currentOffer.bedrooms} Bedrooms` : `${currentOffer.bedrooms} Bedroom`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {(currentOffer.maxAdults > 1) ? `Max ${currentOffer.maxAdults} Adults` : `Max ${currentOffer.maxAdults} Adult`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={good + currentOffer.id}>
                      {good}
                    </li>)
                  )}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={`${currentOffer.host.avatarUrl}`} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {currentOffer.host.isPro}
                  </span>
                </div>
                <div className="offer__description">
                  {currentOffer.description}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map className="offer__map" offers={offers} city={offerPage.city} selectedPoint={offerPage.id}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList offers={offers} cardVariant='near'/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
