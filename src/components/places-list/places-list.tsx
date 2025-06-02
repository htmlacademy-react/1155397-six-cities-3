import { Offers, Offer } from '../../types/offers';
import { viewPlaceCardVariants } from '../../const';
import PlaceCard from '../place-card/place-card';
import { useState } from 'react';

type PlaceListProps = {
  offers: Offers;
  viewPlaceCardVariant: keyof typeof viewPlaceCardVariants;
};

function PlacesList({offers, viewPlaceCardVariant}: PlaceListProps) {
  const [hoverPlaceId, setHoverPlaceId] = useState('');

  function handlePlaceMouseEnter(id: string | null) {
    if(!id) {
      return;
    }
    setHoverPlaceId(id);
  }

  function handlePlaceMouseLeave() {
    setHoverPlaceId('');
  }

  return(
    <>
      {/* // WIP - чтобы линтер не ругался пока пробросил значение стейта в спан и скрыл */}
      <span style={{display: 'none'}}>{hoverPlaceId}</span>
      {offers.map((offer: Offer): JSX.Element => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          viewPlaceCardVariant={viewPlaceCardVariant}
          onPlaceCardHover={() => handlePlaceMouseEnter(offer.id)}
          onPlaceCardLeave={handlePlaceMouseLeave}
        />
      ))}
    </>
  );
}

export default PlacesList;
