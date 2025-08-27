import React, { useEffect, useRef } from 'react';
import { ChangeEventHandler, useState } from 'react';
import { starRating } from '../../const';
import { fetchNewReview } from '../../store/api-action';
import { useAppDispatch } from '../../store/hooks';

type ReviewsFormProps = {
  offerId: string;
}

function ReviewForm({offerId}: ReviewsFormProps) {
  const dispatch = useAppDispatch();
  const form = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState(false);
  const [submitButtonStatus, setSubmitButtonStatus] = useState(true);
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
    offerId: offerId,
  });

  useEffect(() => {
    if(formData.rating > 0 && formData.comment.length >= 50) {
      setSubmitButtonStatus(false);
    } else {
      setSubmitButtonStatus(true);
    }
  }, [formData]);

  type TGetHandler = (type: keyof typeof formData) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>

  const getHandler: TGetHandler = (type) => ({target}) => {
    setFormData({ ...formData, [type]: type === 'rating' ? Number(target.value) : target.value });
  };

  const toggleFormStatus = (status: boolean) => {
    if(status) {
      setFormData({
        rating: 0,
        comment: '',
        offerId: offerId,
      });
      form.current?.reset();
    } else {
      setSubmitButtonStatus(false);
    }
    setFormStatus(false);
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitButtonStatus(true);
    setFormStatus(true);
    dispatch(fetchNewReview({...formData, disableForm: (status: boolean) => toggleFormStatus(status)}));
  };

  return (
    <form ref={form} className="reviews__form form" action="#" method="post" onSubmit={formSubmitHandler}>
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
              disabled={formStatus}
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
        disabled={formStatus}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={submitButtonStatus}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
