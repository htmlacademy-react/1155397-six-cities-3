export enum AuthorizationStatus{
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum PlaceCardClassNamePrefix {
  Main = 'cities',
  Favorites = 'favorites'
}


export const PlaceCardImageSize = {
  SMALL: {'width': '150', 'height': '110'},
  STANDART: {'width': '260', 'height': '200'}
} as const;
