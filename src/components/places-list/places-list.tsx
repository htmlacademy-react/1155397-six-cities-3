import PlaceCard from '../place-card/place-card';
import { TOffers, TOffer} from '../../types/offers';
import { TPlaceCardVariant } from '../../const';
import { memo } from 'react';

type TPlaceListProps = {
  offers: TOffers;
  cardVariant: Extract<keyof typeof TPlaceCardVariant, 'primary'>;
  onActiveOfferChange: (id: string | null) => void;
} | {
  offers: TOffers;
  cardVariant: Exclude<keyof typeof TPlaceCardVariant, 'primary'>;
  onActiveOfferChange?: never;
};

function PlacesListComponent({offers, cardVariant, onActiveOfferChange}: TPlaceListProps) {

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
const PlacesList = memo(
  PlacesListComponent,
  (prevProps, nextProps) =>
    prevProps.offers === nextProps.offers && prevProps.cardVariant === nextProps.cardVariant
);

export default PlacesList;
