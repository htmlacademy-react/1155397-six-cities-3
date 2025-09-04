import { useAppSelector } from '../../store/hooks';
import { fetchReviews } from '../../store/thunks/reviews';
import { store } from '../../store';
import { useEffect } from 'react';
import Review from '../review/review';
import { sortReviewsByDate } from '../../utils';
import { getReviews } from '../../store/slices/reviews-slice';

type ReviewsListProps = {
  offerId: string;
}

function ReviewsList({offerId}: ReviewsListProps) {
  const reviews = useAppSelector(getReviews);
  const sortedReviews = sortReviewsByDate(reviews);

  useEffect(() => {
    store.dispatch(fetchReviews(offerId));
  }, [offerId]);


  return (
    <>
      <h2 className="reviews__title">Reviews&middot; <span className="reviews__amount">{ reviews.length}</span></h2>
      <ul className="reviews__list">
        {sortedReviews && sortedReviews.slice(0,10).map((review) => <Review key={review.id} review={review} />)}
      </ul>
    </>
  );
}

export default ReviewsList;
