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
  Favorites = 'favorites'
}

export const CardVariants = {
  primary: { prefix: 'cities', width: 260, height: 200 },
  favorite: { prefix: 'favorites', width: 150, height: 110 },
  near: { prefix: 'near-places', width: 150, height: 110 }
};

export const starRating = [
  { starCount: 5, title: 'perfect' },
  { starCount: 4, title: 'good' },
  { starCount: 3, title: 'not bad' },
  { starCount: 2, title: 'badly' },
  { starCount: 1, title: 'terribly', }
];
