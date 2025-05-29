import { useState } from 'react';
import { Offer } from '../../types/offers';
import { calculateStarRating } from '../../utils';
import { Link } from 'react-router-dom';

type PlaceCardProps = {
  offer: Offer;
  classNamePrefix: string;
  imgSize: {width: string; height: string};
}

function PlaceCard({offer, classNamePrefix, imgSize}: PlaceCardProps) {
  const {id, title, type, price, isFavorite, isPremium, rating, images} = offer;
  const favoriteClass = isFavorite ? 'place-card__bookmark-button--active button' : '';
  const previewImg = images[0];
  const [activeCard, setActiveCard] = useState('');
  const isActive = (activeCard) ? '' : null;

  const mouseOnCardHandler = (offerId: string): void => {
    setActiveCard(offerId);
  };

  return (
    <article onMouseEnter={() => mouseOnCardHandler(offer.id)} className={`${classNamePrefix}__card place-card`}>
      {isActive}
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className={`${classNamePrefix}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={`${previewImg}`} width={`${imgSize.width}`} height={`${imgSize.height}`} alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${favoriteClass} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: calculateStarRating(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
