import { useAppDispatch } from '../../store/hooks';
import { fetchOffers } from '../../store/thunks/offers';
import '../error-screen/error-screen.css';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

function ErrorScreen() {
  const dispatch = useAppDispatch();

  const handleReloadBtnClick = () => {
    dispatch(fetchOffers());
  };

  return (
    <div className="error-screen">
      <p className="error-screen__text">При загрузке произошла ошибка</p>
      <button
        className="error-screen__reload-btn"
        type="button"
        onClick={handleReloadBtnClick}
      >Попробовать еще раз
      </button>
      <Link className="error-screen__link" to={AppRoute.Main}>На главную</Link>
    </div>
  );
}

export default ErrorScreen;
