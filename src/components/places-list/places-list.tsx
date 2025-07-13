import { TOffers, TOffer} from '../../types/offers';
import { TPlaceCardVariant } from '../../const';
import PlaceCard from '../place-card/place-card';

type TPlaceListProps = {
  offers: TOffers;
  cardVariant: Extract<keyof typeof TPlaceCardVariant, 'primary'>;
  onActiveOfferChange: (id: string | null) => void;
} | {
  offers: TOffers;
  cardVariant: Exclude<keyof typeof TPlaceCardVariant, 'primary'>;
  onActiveOfferChange?: never;
};

function PlacesList({offers, cardVariant, onActiveOfferChange}: TPlaceListProps) {
  return(
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer: TOffer): JSX.Element => cardVariant === 'primary'
        ? (
          <PlaceCard
            offer={offer}
            key={offer.id}
            variant='primary'
            onPlaceCardHoverChange={onActiveOfferChange}
          />
        ) : (
          <PlaceCard
            offer={offer}
            key={offer.id}
            variant={cardVariant}
          />
        )
      )}
    </div>
  );
}

export default PlacesList;
