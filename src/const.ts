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
  Offer = '/offer/:offerId',
}

export enum PlaceCardClassNamePrefix {
  Main = 'cities',
  Favorites = 'favorites'
}


export const PlaceCardImageSize = {
  SMALL: {'width': '150', 'height': '110'},
  STANDART: {'width': '260', 'height': '200'}
} as const;


export const viewPlaceCardVariants = {
  primary: { prefix: 'cities', imageWidth: 260, imageHeight: 200 },
  favorite: { prefix: 'favorites', imageWidth: 150, imageHeight: 110 },
  near: { prefix: 'near-places', imageWidth: 150, imageHeight: 110 }
};
