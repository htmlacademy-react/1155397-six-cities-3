import dayjs from 'dayjs';
import { TReviews } from './types/reviews';
import { TSortDictionary, TSortBy } from './types/sort';

export const calculateStarRating = (rating: number) => `${Math.round(rating) * 100 / 5}%`;

export const formatDateReview = (date: string) => dayjs(date).format('MMMM YYYY');

export const sortReviewsByDate = (reviews: TReviews | null) => {
  if (reviews && reviews.length > 1) {
    reviews.sort((firstReview, secondReview) => dayjs(secondReview.date).valueOf() - dayjs(firstReview.date).valueOf());
    return reviews;
  }
};

export const SortDictionary: TSortDictionary = {
  'Popular': null,
  'Price: low to high': (a, b) => a.price - b.price,
  'Price: high to low': (a, b) => b.price - a.price,
  'Top rated first': (a, b) => b.rating - a.rating,
};

export const SortKeys = Object.keys(SortDictionary) as TSortBy[];
