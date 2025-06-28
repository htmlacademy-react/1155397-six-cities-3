import { TReviews } from '../../types/reviews';
import Review from '../review/review';
import { sortReviewsByDate } from '../../utils';

type ReviewsListProps = {
  reviews: TReviews;
}

function ReviewsList({reviews}: ReviewsListProps) {
  const sortReviews: TReviews | undefined = sortReviewsByDate(reviews);

  return (
    <ul>
      {sortReviews && sortReviews.slice(0,10).map((review) => <Review key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewsList;
