import { Offers, Offer } from '../../types/offers';
import { PlaceCardClassNamePrefix, PlaceCardImageSize } from '../../const';
import PlaceCard from '../place-card/place-card';

type PlaceListProps = {
  offers: Offers;
  classNamePrefix: PlaceCardClassNamePrefix;
}

function PlacesList({offers, classNamePrefix}: PlaceListProps) {
  const imgSize = (classNamePrefix === PlaceCardClassNamePrefix.Main) ? PlaceCardImageSize.STANDART : PlaceCardImageSize.SMALL;
  return(
    <>
      {offers.map((offer: Offer): JSX.Element => (
        <PlaceCard offer={offer} key={offer.id} classNamePrefix={classNamePrefix} imgSize={imgSize}/>
      ))}
    </>
  );
}

export default PlacesList;
