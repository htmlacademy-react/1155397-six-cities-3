import { ChangeEventHandler, useState } from 'react';
import { starRating } from '../../const';
import React from 'react';

function ReviewForm() {
  const [formData, setFormData] = useState({
    rating: -1,
    reviewText: '',
  });

  type TGetHandler = (type: keyof typeof formData) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>

  const getHandler: TGetHandler = (type) => ({target}) => {
    setFormData({ ...formData, [type]: type === 'rating' ? Number(target.value) : target.value });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {starRating.map(({ starCount, title }) => (
          <React.Fragment key={starCount}>
            <input className="form__rating-input visually-hidden"
              name="rating"
              value={starCount}
              id={`${starCount}-stars`}
              type="radio"
              onChange={getHandler('rating')}
            />
            <label htmlFor={`${starCount}-stars`}className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea onChange={getHandler('reviewText')} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
