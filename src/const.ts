export enum AuthorizationStatus{
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum RoutePath {
  Main = '/',
  NotFound = '*',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum PlaceCardClassNamePrefix {
  Main = 'cities',
  Favorites = 'favorites',
  Near = 'near'
}

export const TPlaceCardVariant = {
  primary: { prefix: 'cities', width: 260, height: 200 },
  favorite: { prefix: 'favorites', width: 150, height: 110 },
  near: { prefix: 'near-places', width: 260, height: 200 }
};

export const starRating = [
  { starCount: 5, title: 'perfect' },
  { starCount: 4, title: 'good' },
  { starCount: 3, title: 'not bad' },
  { starCount: 2, title: 'badly' },
  { starCount: 1, title: 'terribly', }
];

export const LEAFLET_TILE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const LEAFLET_TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
export const LEAFLET_DEFAULT_PIN = 'img/pin.svg';
export const LEAFLET_ACTIVE_PIN = 'img/pin-active.svg';
