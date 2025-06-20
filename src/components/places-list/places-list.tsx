import { TOffers, TOffer} from '../../types/offers';
import { CardVariants } from '../../const';
import PlaceCard from '../place-card/place-card';

type TPlaceListProps = {
  offers: TOffers;
  cardVariant: Extract<keyof typeof CardVariants, 'primary'>;
  onActiveOfferChange: (id: string | null) => void;
} | {
  offers: TOffers;
  cardVariant: Exclude<keyof typeof CardVariants, 'primary'>;
  onActiveOfferChange?: never;
};

function PlacesList({offers, cardVariant, onActiveOfferChange}: TPlaceListProps) {
  return(
    <>
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
    </>
  );
}

export default PlacesList;
