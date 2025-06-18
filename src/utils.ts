import dayjs from 'dayjs';
import { TReviews } from './types/reviews';


export const calculateStarRating = (rating: number) => `${ Math.round(rating) * 100 / 5}%`;

export const formatDateReview = (date: string) => dayjs(date).format('MMMM YYYY');

// export const sortReviews = (arr: string[], dateProperty:string) => arr.sort((a, b) => {
//   const dateA = dayjs(a[dateProperty]);
//   const dateB = dayjs(b[dateProperty]);
//   return dateB - dateA;
// });

export const sortReviewsByDate = (reviews: TReviews | null) => {
  if (reviews && reviews.length > 1) {
    reviews.sort((firstReview, secondReview) => dayjs(secondReview.date).valueOf() - dayjs(firstReview.date).valueOf());
    return reviews;
  }
};
