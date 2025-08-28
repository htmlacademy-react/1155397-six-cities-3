import React, { useRef } from 'react';
import { ChangeEventHandler, useState } from 'react';
import { starRating, MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, DEFAULT_RATING_VALUE } from '../../const';
import { fetchNewReview } from '../../store/api-action';
import { useAppDispatch } from '../../store/hooks';

type ReviewsFormProps = {
  offerId: string;
}

function ReviewForm({offerId}: ReviewsFormProps) {
  const dispatch = useAppDispatch();
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
    offerId: offerId,
  });

  const isFormValid = () => {
    const { comment, rating } = formData;
    return comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH && rating > DEFAULT_RATING_VALUE;
  };

  type TGetHandler = (type: keyof typeof formData) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>

  const getHandler: TGetHandler = (type) => ({target}) => {
    setFormData({ ...formData, [type]: type === 'rating' ? Number(target.value) : target.value });
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    setIsSubmitting(true);
    dispatch(fetchNewReview({
      ...formData,
      onSuccess: (successMessage) => {
        setFormData({ comment: '', rating: 0, offerId });
        form.current?.reset();
        setIsSubmitting(false);
        setSuccess(successMessage);
        setTimeout(() => setSuccess(''), 3000);
      },
      onFail: (errorMessage) => {
        setIsSubmitting(false);
        setError(errorMessage);
        setTimeout(() => setError(''), 3000);
      },
    }));
  };

  return (
    <form ref={form} className="reviews__form form" action="#" method="post" onSubmit={formSubmitHandler}>
      {error && (
        <div className="form__error" style={{ color: '#b22222', backgroundColor: '#ffeded', padding: '10px', marginBottom: '10px', borderRadius: '6px', fontSize: '14px', }}>
          {error}
        </div>
      )}
      {success && (
        <div className="form__error" style={{ color: '#334d18', backgroundColor: '#b3fabeff', padding: '10px', marginBottom: '10px', borderRadius: '6px', fontSize: '14px', }}>
          {success}
        </div>
      )}
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {starRating.map(({ starCount, title }) => (
          <React.Fragment key={starCount}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={starCount}
              id={`${starCount}-stars`}
              type="radio"
              onChange={getHandler('rating')}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${starCount}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        className="reviews__textarea form__textarea"
        onChange={getHandler('comment')}
        disabled={isSubmitting}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitting || !isFormValid()}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
