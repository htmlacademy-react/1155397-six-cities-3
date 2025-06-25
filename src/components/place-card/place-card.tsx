import { useNavigate } from 'react-router-dom';
import { TPlaceCardVariant, RoutePath } from '../../const';
import { TOffer } from '../../types/offers';
import { calculateStarRating } from '../../utils';
import { MouseEventHandler, useState } from 'react';

type TPlaceCardVariant = keyof typeof TPlaceCardVariant;

type PlaceCardProps = {
  offer: TOffer;
  variant: Extract<TPlaceCardVariant, 'primary'>;
  onPlaceCardHoverChange: (id: string | null) => void;
} | {
  offer: TOffer;
  variant: Exclude<TPlaceCardVariant, 'primary'>;
  onPlaceCardHoverChange?: never;
}

function PlaceCard({offer, variant, onPlaceCardHoverChange}: PlaceCardProps) {
  const {id, title, type, price, isPremium, rating, images} = offer;
  const {prefix, width, height} = TPlaceCardVariant[variant];
  const [previewImage] = images;

  const [isFavoriteOffer, setIsFavoriteOffer] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = onPlaceCardHoverChange && variant === 'primary'
    ? () => onPlaceCardHoverChange(id)
    : undefined;

  const handleMouseLeave = onPlaceCardHoverChange && variant === 'primary'
    ? () => onPlaceCardHoverChange(null)
    : undefined;

  const handleArticleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    navigate(`${RoutePath.Offer}/${id}`);
  };

  const handleBookmark: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsFavoriteOffer(!isFavoriteOffer);
  };

  const favoriteOffer = `place-card__bookmark-button button ${isFavoriteOffer ? 'place-card__bookmark-button--active' : ''}`;

  return (
    <article
      className={`${prefix}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleArticleClick}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${prefix}__image-wrapper place-card__image-wrapper`}>
        <img
          className="place-card__image"
          src={previewImage}
          width={width}
          height={height}
          alt="Place image"
        />
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={favoriteOffer}
            type="button"
            onClick={handleBookmark}
          >
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
          {title}
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>

  );
}

export default PlaceCard;
