import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOfferById } from '../../store/api-action';
import Loader from '../../components/loader/loader';
import { calculateStarRating } from '../../utils';
import ReviewsList from '../../components/reviews-list/rewies-list';
import { AuthorizationStatus } from '../../const';
import ReviewForm from '../../components/review-form/review-form';

function OfferPage() {
  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const { offerId } = useParams();

  useEffect(() => {
    if(offerId && currentOffer?.id !== offerId) {
      dispatch(fetchOfferById(offerId));
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
        <section className="offer__map map"></section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <article className="near-places__card place-card">
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <a href="#">
                  <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place image" />
                </a>
              </div>
              <div className="place-card__info">
                <div className="place-card__price-wrapper">
                  <div className="place-card__price">
                    <b className="place-card__price-value">&euro;80</b>
                    <span className="place-card__price-text">&#47;&nbsp;night</span>
                  </div>
                  <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                    <svg className="place-card__bookmark-icon" width="18" height="19">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">In bookmarks</span>
                  </button>
                </div>
                <div className="place-card__rating rating">
                  <div className="place-card__stars rating__stars">
                    <span style={{width: '80%'}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <h2 className="place-card__name">
                  <a href="#">Wood and stone place</a>
                </h2>
                <p className="place-card__type">Room</p>
              </div>
            </article>

            <article className="near-places__card place-card">
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <a href="#">
                  <img className="place-card__image" src="img/apartment-02.jpg" width="260" height="200" alt="Place image" />
                </a>
              </div>
              <div className="place-card__info">
                <div className="place-card__price-wrapper">
                  <div className="place-card__price">
                    <b className="place-card__price-value">&euro;132</b>
                    <span className="place-card__price-text">&#47;&nbsp;night</span>
                  </div>
                  <button className="place-card__bookmark-button button" type="button">
                    <svg className="place-card__bookmark-icon" width="18" height="19">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="place-card__rating rating">
                  <div className="place-card__stars rating__stars">
                    <span style={{width: '80%'}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <h2 className="place-card__name">
                  <a href="#">Canal View Prinsengracht</a>
                </h2>
                <p className="place-card__type">Apartment</p>
              </div>
            </article>

            <article className="near-places__card place-card">
              <div className="place-card__mark">
                <span>Premium</span>
              </div>
              <div className="near-places__image-wrapper place-card__image-wrapper">
                <a href="#">
                  <img className="place-card__image" src="img/apartment-03.jpg" width="260" height="200" alt="Place image" />
                </a>
              </div>
              <div className="place-card__info">
                <div className="place-card__price-wrapper">
                  <div className="place-card__price">
                    <b className="place-card__price-value">&euro;180</b>
                    <span className="place-card__price-text">&#47;&nbsp;night</span>
                  </div>
                  <button className="place-card__bookmark-button button" type="button">
                    <svg className="place-card__bookmark-icon" width="18" height="19">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="place-card__rating rating">
                  <div className="place-card__stars rating__stars">
                    <span style={{width: '100%'}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <h2 className="place-card__name">
                  <a href="#">Nice, cozy, warm big bed apartment</a>
                </h2>
                <p className="place-card__type">Apartment</p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferPage;
