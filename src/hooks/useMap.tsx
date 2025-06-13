import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useRef} from 'react';
import { TCity } from '../types/offers';
import leaflet, { Map as LeafletMap } from 'leaflet';
import { LEAFLET_TILE_LAYER, LEAFLET_TILE_ATTRIBUTION } from '../const';

type UseMapProps = {
  mapRef: React.RefObject<HTMLElement | null >;
  city: TCity;
}

function useMap({mapRef, city}: UseMapProps) {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        zoom: city.location.zoom
      });

      leaflet.tileLayer(LEAFLET_TILE_LAYER, {attribution: LEAFLET_TILE_ATTRIBUTION}).addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}


export default useMap;
