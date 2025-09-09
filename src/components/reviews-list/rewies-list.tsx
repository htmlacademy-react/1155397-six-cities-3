import { useAppSelector } from '../../store/hooks';
import { fetchReviews } from '../../store/thunks/reviews';
import { store } from '../../store';
import { useEffect } from 'react';
import Review from '../review/review';
import { getReviews, getSortedReviews } from '../../store/slices/reviews-slice';
import { memo } from 'react';

type ReviewsListProps = {
  offerId: string;
}

function ReviewsListComponents({offerId}: ReviewsListProps) {
  const reviews = useAppSelector(getReviews);
  const sortedReviews = useAppSelector(getSortedReviews);

  useEffect(() => {
    store.dispatch(fetchReviews(offerId));
  }, [offerId]);

  return (
    <>
      <h2 className="reviews__title">Reviews&middot; <span className="reviews__amount">{ reviews.length}</span></h2>
      <ul className="reviews__list">
        {sortedReviews && sortedReviews.slice(0,10).map((review) => <Review key={`${review.id}-${review.date}`} review={review} />)}
      </ul>
    </>
  );
}

const ReviewsList = memo(ReviewsListComponents);

export default ReviewsList;
