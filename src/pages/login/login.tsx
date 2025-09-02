import { Helmet } from 'react-helmet-async';
import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAuthStatus } from '../../store/slices/user-slice';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/thunks/user';
import { AppRoute } from '../../const';

function Login() {
  const isAuth = useAppSelector(getAuthStatus);
  const navigate = useNavigate();
  const userEmail = useRef<HTMLInputElement | null>(null);
  const userPass = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(userEmail.current !== null && userPass.current !== null) {
      dispatch(loginUser({email: userEmail.current.value, password: userPass.current.value}));
    }
  };

  if(isAuth) {
    navigate(AppRoute.Main);
  }

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
              <input ref={ userPass } className="login__input form__input" type="password" name="password" placeholder="Password" required />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
