import { useEffect, useRef } from 'react';
import { TOffers, TCity } from '../../types/offers';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import { LEAFLET_DEFAULT_PIN, LEAFLET_ACTIVE_PIN } from '../../const';

type MapProps = {
  offers: TOffers;
  city: TCity;
  selectedPoint: string | null;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: LEAFLET_DEFAULT_PIN,
  iconSize: [27, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: LEAFLET_ACTIVE_PIN,
  iconSize: [27, 40],
  iconAnchor: [20, 40],
});

function Map({city, offers, selectedPoint}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap({mapRef, city});

  useEffect(() => {
    if(map) {
      offers.map((offer) => {
        leaflet.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {icon: offer.id === selectedPoint ? currentCustomIcon : defaultCustomIcon},
        ).addTo(map);
      });
    }
  }, [map, offers, selectedPoint]);

  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default Map;
