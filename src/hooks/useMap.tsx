import { useEffect, useState, useRef } from 'react';
import { LEAFLET_TILE_LAYER, LEAFLET_TILE_ATTRIBUTION } from '../components/map/const';
import leaflet from 'leaflet';
import { TLocation } from '../types/offers';
import { Map } from 'leaflet';

type UseMapProps = {
  location: TLocation;
  containerRef: React.RefObject<HTMLElement | null>;
}

const useMap = ({containerRef, location}: UseMapProps) => {
  const [map, setMap] = useState(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (containerRef.current !== null && !isRenderedRef.current) {

      const instance = leaflet.map(containerRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      leaflet.tileLayer(LEAFLET_TILE_LAYER, {attribution: LEAFLET_TILE_ATTRIBUTION}).addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [containerRef, location]);

  return map
};

export default useMap;
