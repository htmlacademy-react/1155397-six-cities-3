import Review from '../review/review';
import { TReviews } from '../../types/reviews';

type ReviewsListProps = {
  reviews: TReviews;
}

function ReviewsList({reviews}: ReviewsListProps) {

  return (
    <ul>
      {reviews && reviews.slice(0,10).map((review) => <Review key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewsList;
