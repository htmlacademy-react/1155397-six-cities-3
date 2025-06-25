import { useEffect, useRef } from 'react';
import { TOffers, TCity } from '../../types/offers';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import { LEAFLET_DEFAULT_PIN, LEAFLET_ACTIVE_PIN } from '../../const';
import { layerGroup } from 'leaflet';

type MapProps = {
  offers: TOffers;
  city: TCity;
  selectedPoint: string | null;
  className: string;
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

function Map({city, offers, selectedPoint, className}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap({mapRef, city});

  useEffect(() => {
    if(map) {
      const markerLayer = layerGroup().addTo(map);
      offers.map((offer) => {
        leaflet.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {icon: offer.id === selectedPoint ? currentCustomIcon : defaultCustomIcon},
        ).addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedPoint]);

  return (
    <section className={`${className} map`} ref={mapRef} />
  );
}

export default Map;
