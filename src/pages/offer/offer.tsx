import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/loader';
import { calculateStarRating } from '../../utils';
import ReviewsList from '../../components/reviews-list/rewies-list';
import ReviewForm from '../../components/review-form/review-form';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';
import { fetchOfferById,fetchNearbyOffers } from '../../store/thunks/offer';
import { getOffer, getNearbyOffers } from '../../store/slices/detail-offer-slice';
import { getAuthStatus } from '../../store/slices/user-slice';
import { AuthorizationStatus } from '../../const';
import { NEAR_BY_OFFERS_COUNT, MAX_DETAIL_OFFER_IMG_COUNT } from '../../const';
import classNames from 'classnames';
import { changeFavorite } from '../../store/thunks/favorites';
import { AppRoute } from '../../const';
import { useNavigate } from 'react-router-dom';
import { MouseEventHandler } from 'react';

function Offer() {
  const { offerId } = useParams();
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector(getOffer);
  const isAuth = useAppSelector(getAuthStatus);
  const nearByOffers = useAppSelector(getNearbyOffers);
  const navigate = useNavigate();

  useEffect(() => {
    if(offerId && currentOffer?.id !== offerId) {
      dispatch(fetchOfferById(offerId));
      dispatch(fetchNearbyOffers(offerId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBookmark: MouseEventHandler<HTMLButtonElement> = () => {
    if(currentOffer) {
      if(isAuth === AuthorizationStatus.Auth) {
        const status = (currentOffer.isFavorite) ? 0 : 1;
        dispatch(changeFavorite({offerId: currentOffer.id, status: status}));
      } else {
        navigate(AppRoute.Login);
      }
    }
  };

  const currentOfferIsFavorite = classNames({
    'offer__bookmark-button button': true,
    'offer__bookmark-button--active': currentOffer?.isFavorite
  });

  if(!currentOffer || currentOffer.id !== offerId) {
    <Loader/>;
  } else {
    return(
      <main className="page__main page__main--offer">
        <Helmet>
          <title>6 cities: Offer</title>
        </Helmet>
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.slice(0, MAX_DETAIL_OFFER_IMG_COUNT).map((imageSrc) => (
                <div key={imageSrc} className="offer__image-wrapper">
                  <img className="offer__image" src={imageSrc} alt="Photo studio" />
                </div>
              ))}
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
                <button
                  className={currentOfferIsFavorite}
                  type="button"
                  onClick={handleBookmark}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: calculateStarRating(currentOffer.rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {
                    (currentOffer.bedrooms ?? 1) > 1
                      ? `${currentOffer.bedrooms} Bedrooms`
                      : `${currentOffer.bedrooms} Bedroom`
                  }
                </li>
                <li className="offer__feature offer__feature--adults">{
                  (currentOffer.maxAdults ?? 1) > 1
                    ? `Max ${currentOffer.maxAdults ?? 1} Adults`
                    : `Max ${currentOffer.maxAdults ?? 1} Adult`
                }
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
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={
                    classNames({
                      'offer__avatar-wrapper user__avatar-wrapper': true,
                      'offer__avatar-wrapper--pro': currentOffer.host.isPro,
                    })
                  }
                  >
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  <span className="offer__user-status">
                    {currentOffer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {currentOffer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                {offerId && <ReviewsList offerId={offerId}/>}
                {isAuth === AuthorizationStatus.Auth && offerId && <ReviewForm offerId={offerId} />}
              </section>
            </div>
          </div>
          <Map
            className='offer__map'
            offers={[...nearByOffers.slice(0, NEAR_BY_OFFERS_COUNT), currentOffer]}
            city={currentOffer.city}
            selectedPoint={currentOffer.id}
          />
        </section>
        <div className="container">
          {nearByOffers &&
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList
                offers={nearByOffers.slice(0, NEAR_BY_OFFERS_COUNT)}
                cardVariant={'primary'}
                onActiveOfferChange={() => {}}
              />
            </div>
          </section>}
        </div>
      </main>
    );
  }
}

export default Offer;
