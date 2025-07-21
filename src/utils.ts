import dayjs from 'dayjs';
import offers from './mocks/offers';
import { TReviews } from './types/reviews';
import { TOffer } from './types/offers';
import { TSortDictionary, TSortNames } from './types/sort';

export const calculateStarRating = (rating: number) => `${Math.round(rating) * 100 / 5}%`;

export const formatDateReview = (date: string) => dayjs(date).format('MMMM YYYY');

export const sortReviewsByDate = (reviews: TReviews | null) => {
  if (reviews && reviews.length > 1) {
    reviews.sort((firstReview, secondReview) => dayjs(secondReview.date).valueOf() - dayjs(firstReview.date).valueOf());
    return reviews;
  }
};

export const getNearOffers = (offer: TOffer) => {
  const nearOffers = offers.filter(({city}) => city.name === offer.city.name).slice(0, 3);
  return nearOffers;
};

export const SortDictionary: TSortDictionary = {
  'Popular': null,
  'Price: low to high': (a, b) => a.price - b.price,
  'Price: high to low': (a, b) => b.price - a.price,
  'Top rated first': (a, b) => b.rating - a.rating,
};

export const SortKeys = Object.keys(SortDictionary) as TSortNames[];
