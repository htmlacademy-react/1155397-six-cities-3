import dayjs from 'dayjs';
import { TReviews } from './types/reviews';
import { TSortDictionary, TSortBy } from './types/sort';

export const calculateStarRating = (rating: number = 0) => `${Math.round(rating) * 100 / 5}%`;

export const formatDateReview = (date: string) => dayjs(date).format('MMMM YYYY');

export const sortReviewsByDate = (reviews: TReviews | null) => {
  if (reviews !== null && reviews.length > 1) {
    const newReviews = [...reviews];
    newReviews.sort((firstReview, secondReview) => dayjs(secondReview.date).valueOf() - dayjs(firstReview.date).valueOf());

    return newReviews;
  }
  return reviews;
};

const getRandomInteger = (a: number, b: number) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const generateRandomIndex = (a: number, b: number) => {
  const indexNumbers: number[] = [];
  return () => {
    let currentIndex = getRandomInteger(a, b);
    if (indexNumbers.length === Math.floor(Math.max(a, b) + 1)) {
      return '';
    }
    while (indexNumbers.includes(currentIndex)) {
      currentIndex = getRandomInteger(a, b);
    }
    indexNumbers.push(currentIndex);
    return currentIndex;
  };
};

export const getRandomSubArray = <T>(arr: T[], count: number) => {
  if (arr.length <= count) {
    return arr;
  }
  const newArray: T[] = [];
  const indexGenerator = generateRandomIndex(0, arr.length - 1);
  for (let i = 0; i < count; i++) {
    const index = indexGenerator();
    if (index) {
      newArray.push(arr[index]);
    }
  }
  return newArray;
};

export const SortDictionary: TSortDictionary = {
  'Popular': null,
  'Price: low to high': (a, b) => a.price - b.price,
  'Price: high to low': (a, b) => b.price - a.price,
  'Top rated first': (a, b) => b.rating - a.rating,
};

export const SortKeys = Object.keys(SortDictionary) as TSortBy[];
