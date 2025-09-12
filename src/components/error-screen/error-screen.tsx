import { useAppDispatch } from '../../store/hooks';
import { fetchOffers } from '../../store/thunks/offers';
import '../error-screen/error-screen.css';
import { AppRoute } from '../../const';

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
      <a className="error-screen__link" href={AppRoute.Main}>На главную</a>
    </div>
  );
}

export default ErrorScreen;
