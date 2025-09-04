import { TCities } from './types/offers';
import { StatusCodes } from 'http-status-codes';

export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;
export const DEFAULT_RATING_VALUE = 0;
export const NEAR_BY_OFFERS_COUNT = 3;
export const MAX_DETAIL_OFFER_IMG_COUNT = 6;

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN',
}

export enum AppRoute {
  Main = '/',
  NotFound = '*',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorites = '/favorites',
}

export enum PlaceCardClassNamePrefix {
  Main = 'cities',
  Favorites = 'favorites',
  Near = 'near'
}

export const CITIES: TCities = [
  {
    name: 'Paris',
    location:{
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,

    }
  },
  {
    name: 'Cologne',
    location:{
      latitude: 50.935173,
      longitude: 6.953101,
      zoom: 12,

    }
  },
  {
    name: 'Brussels',
    location:{
      latitude: 50.85045,
      longitude: 4.34878,
      zoom: 12,

    }
  },
  {
    name: 'Amsterdam',
    location:{
      latitude: 52.3909553943508,
      longitude: 4.897070,
      zoom: 12,

    }
  },
  {
    name: 'Hamburg',
    location:{
      latitude: 53.551086,
      longitude:  9.993682,
      zoom: 12,

    }
  },
  {
    name: 'Dusseldorf',
    location:{
      latitude: 51.233334,
      longitude: 6.783333,
      zoom: 12,

    }
  }
];

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

export const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

export const enum FavoriteValue {
  Add = 1,
  Remove = 0,
}
