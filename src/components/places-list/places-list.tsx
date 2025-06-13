import { TOffers, TOffer} from '../../types/offers';
import { CardVariants } from '../../const';
import PlaceCard from '../place-card/place-card';
import { useState } from 'react';

type TPlaceListProps = {
  offers: TOffers;
  cardVariant: keyof typeof CardVariants;
  onActiveOfferChange: (id: string | null) => void;
};

function PlacesList({offers, cardVariant, onActiveOfferChange}: TPlaceListProps) {
  const [, setActiveOfferId] = useState<string | null>(null);

  const handleSetActiveOfferId = (id: string | null) => {
    setActiveOfferId(id);
    onActiveOfferChange(id);
  };

  const handleClearActiveOfferId = () => {
    setActiveOfferId(null);
    onActiveOfferChange(null);
  };

  return(
    <>
      {offers.map((offer: TOffer): JSX.Element => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          variant={cardVariant}
          onPlaceCardHover={() => handleSetActiveOfferId(offer.id)}
          onPlaceCardLeave={() => handleClearActiveOfferId()}
        />
      ))}
    </>
  );
}

export default PlacesList;
