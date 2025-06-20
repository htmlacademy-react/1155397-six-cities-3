import dayjs from 'dayjs';
import offers from './mocks/offers';
import { TReviews } from './types/reviews';
import { TOffer, TOffers } from './types/offers';

const MAX_NEAR_OFFERS = 3;

export const calculateStarRating = (rating: number) => `${ Math.round(rating) * 100 / 5}%`;

export const formatDateReview = (date: string) => dayjs(date).format('MMMM YYYY');

export const sortReviewsByDate = (reviews: TReviews | null) => {
  if (reviews && reviews.length > 1) {
    reviews.sort((firstReview, secondReview) => dayjs(secondReview.date).valueOf() - dayjs(firstReview.date).valueOf());
    return reviews;
  }
};

export const getNearOffers = (offer: TOffer) => {
  const nearOffers: TOffers = [];

  for(let i = 0; i < offers.length; i++) {
    if(offers[i].id !== offer.id && offers[i].city.name === offer.city.name) {
      nearOffers.push(offers[i]);
    }

    if(nearOffers.length >= MAX_NEAR_OFFERS) {
      break;
    }
  }
  return nearOffers;
};
