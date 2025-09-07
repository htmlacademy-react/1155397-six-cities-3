import { Helmet } from 'react-helmet-async';
import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAuthStatus } from '../../store/slices/user-slice';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/thunks/user';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useEffect } from 'react';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { CITIES } from '../../const';
import { TCity } from '../../types/offers';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { changeCity } from '../../store/slices/offers-slice';

function Login() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getAuthStatus);
  const navigate = useNavigate();
  const userEmail = useRef<HTMLInputElement | null>(null);
  const userPass = useRef<HTMLInputElement | null>(null);
  const [passwordError, setPasswordError] = useState<string>('');

  useEffect(() => {
    if (isAuth === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [isAuth, navigate]);

  const randomCity: TCity = useMemo(() => CITIES[Math.floor(Math.random() * CITIES.length)], []);

  const handleValidatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^(?=.*[A-Za-z])(?=.*\d).+$/;

    if (value.length === 0) {
      setPasswordError('');
    } else if (!regex.test(value)) {
      setPasswordError('Пароль должен содержать хотя бы одну букву и цифру.');
    } else {
      setPasswordError('');
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(userEmail.current !== null && userPass.current !== null) {
      dispatch(loginUser({email: userEmail.current.value, password: userPass.current.value}));
    }
  };

  const handleCityButtonClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(changeCity(randomCity));
    navigate(AppRoute.Main);
  };

  return(
    <main className="page__main page__main--login">
      <Helmet>
        <title>6 cities: Login</title>
      </Helmet>
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input ref={ userEmail } className="login__input form__input" type="email" name="email" placeholder="Email" required />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                ref={ userPass }
                className={`login__input form__input ${
                  passwordError ? 'input-error' : ''
                }`}
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleValidatePassword}
                required
              />
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link
              className="locations__item-link"
              to={AppRoute.Main}
              onClick={handleCityButtonClick}
            >
              <span>{randomCity.name}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
