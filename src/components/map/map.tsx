import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import { useEffect, useRef } from 'react';
import { TOffers, TCity } from '../../types/offers';
import { LEAFLET_DEFAULT_PIN, LEAFLET_ACTIVE_PIN } from '../../const';
import { layerGroup, LayerGroup } from 'leaflet';

type MapProps = {
  city: TCity;
  offers: TOffers;
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
  const markerLayer = useRef<LayerGroup>(layerGroup());

  useEffect(()=>{
    if(map){
      map.setView({
        lat: city.location.latitude,
        lng: city.location.longitude,
      }, city.location.zoom);
      markerLayer.current.addTo(map);
      markerLayer.current.clearLayers();
    }
  },[city, map]);


  useEffect(() => {
    if(map) {
      offers.map((offer) => {
        leaflet.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {icon: offer.id === selectedPoint ? currentCustomIcon : defaultCustomIcon},
        ).addTo(markerLayer.current);
      });
    }
  }, [map, offers, selectedPoint]);

  return (
    <section className={`${className} map`} ref={mapRef} />
  );
}

export default Map;
