import dayjs from 'dayjs';
import offers from './mocks/offers';
import { TReviews } from './types/reviews';
import { TOffer } from './types/offers';
import { TSortDictionary } from './types/sort';

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

// export const sortDictionary: TSortDictinary = {
//   'Popular': {
//     name: 'Popular',
//     handler: () => 0,
//   },
//   'Price: low to high': {
//     name: 'Price: low to high',
//     handler: (a: TOffer, b: TOffer) => {
//       if(a.price > b.price) {
//         return 1;
//       }
//       if(a.price < b.price) {
//         return -1;
//       }
//       return 0;
//     },
//   },
//   'Price: high to low' : {
//     name: 'Price: high to low',
//     handler: (a: TOffer, b: TOffer) => {
//       if(a.price > b.price) {
//         return -1;
//       }
//       if(a.price < b.price) {
//         return 1;
//       }
//       return 0;
//     },
//   },
//   'Top rated first': {
//     name: 'Top rated first',
//     handler: (a: TOffer, b: TOffer) => {
//       if(a.rating > b.rating) {
//         return -1;
//       }
//       if(a.rating < b.rating) {
//         return 1;
//       }
//       return 0;
//     },
//   }
// };

export const SortDictionary: TSortDictionary = {
  'Popular': null,
  'Price: low to high': (a, b) => a.price - b.price,
  'Price: high to low': (a, b) => b.price - a.price,
  'Top rated first': (a, b) => b.rating - a.rating,
};

// export const sortKeys = Object.keys(SortDictionary) as TSortNames[];
