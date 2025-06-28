import dayjs from 'dayjs';
import offers from './mocks/offers';
import { TReviews } from './types/reviews';
import { TOffer } from './types/offers';

export const calculateStarRating = (rating: number) => `${ Math.round(rating) * 100 / 5}%`;

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
