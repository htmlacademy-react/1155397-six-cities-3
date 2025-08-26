import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNearbyOffers, fetchOfferById } from '../../store/api-action';
import Loader from '../../components/loader/loader';
import { calculateStarRating } from '../../utils';
import ReviewsList from '../../components/reviews-list/rewies-list';
import { AuthorizationStatus } from '../../const';
import ReviewForm from '../../components/review-form/review-form';
import PlacesList from '../../components/places-list/places-list';
import Map from '../../components/map/map';

function OfferPage() {
  const { offerId } = useParams();
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const nearByOffers = useAppSelector((state) => state.nearByOffers);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    if(offerId && currentOffer?.id !== offerId) {
      dispatch(fetchOfferById(offerId));
      dispatch(fetchNearbyOffers(offerId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!currentOffer || currentOffer.id !== offerId) {
    <Loader/>;
  }

  return(
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 cities: Offer</title>
      </Helmet>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            { currentOffer?.images.map((imageSrc) => (
              <div key={imageSrc} className="offer__image-wrapper">
                <img className="offer__image" src={imageSrc} alt="Photo studio" />
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {currentOffer?.isPremium &&
              <div className="offer__mark">
                <span>Premium</span>
              </div>}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {currentOffer?.title}
              </h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: calculateStarRating(currentOffer?.rating) }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{currentOffer?.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {currentOffer?.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {
                  (currentOffer?.bedrooms ?? 1) > 1
                    ? `${currentOffer?.bedrooms} Bedrooms`
                    : `${currentOffer?.bedrooms} Bedroom`
                }
              </li>
              <li className="offer__feature offer__feature--adults">{
                (currentOffer?.maxAdults ?? 1) > 1
                  ? `Max ${currentOffer?.maxAdults ?? 1} Adults`
                  : `Max ${currentOffer?.maxAdults ?? 1} Adult`
              }
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{currentOffer?.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {currentOffer?.goods.map((good) => (
                  <li key={good} className="offer__inside-item">
                    {good}
                  </li>
                ))}

              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src={currentOffer?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  {currentOffer?.host.name}
                </span>
                <span className="offer__user-status">
                  {currentOffer?.host.isPro}

                </span>
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {
                    currentOffer?.description
                  }
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              {offerId && <ReviewsList offerId={offerId}/>}
              {isAuth && offerId && <ReviewForm offerId={offerId} />}
            </section>
          </div>
        </div>
        { currentOffer?.city &&
          <Map
            className='offer__map'
            offers={nearByOffers}
            city={currentOffer?.city}
            selectedPoint={null}
          />}
      </section>
      <div className="container">
        { nearByOffers &&
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList
                offers={nearByOffers}
                cardVariant={'primary'}
                onActiveOfferChange={() => {}}
              />
            </div>
          </section>}
      </div>
    </main>
  );
}

export default OfferPage;
