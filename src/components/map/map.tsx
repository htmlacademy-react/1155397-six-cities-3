import { useEffect, useRef } from 'react';
import { TOffers, TCity } from '../../types/offers';
import { LEAFLET_DEFAULT_PIN, LEAFLET_ACTIVE_PIN } from './const';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';

type MapProps = {
  city: TCity;
  offers: TOffers;
  activeOfferId?: string | null;
}

const defaultCustomIcon = leaflet.icon(LEAFLET_DEFAULT_PIN);

const currentCustomIcon = leaflet.icon(LEAFLET_ACTIVE_PIN);

function Map({city, offers, activeOfferId}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap({containerRef: mapContainerRef, location: city.location});

  useEffect(() => {
    if(map) {
      offers.map((offer) => {
        leaflet.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {icon: offer.id === activeOfferId ? currentCustomIcon : defaultCustomIcon},
        );
      });
    }
  }, [map, activeOfferId, offers]);

  return (
    <section className="cities__map map" ref={mapContainerRef}></section>
  );
}

export default Map;
