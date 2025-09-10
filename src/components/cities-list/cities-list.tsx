import { CITIES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TCity } from '../../types/offers';
import { changeCity, getCurrentCity } from '../../store/slices/offers-slice';
import classNames from 'classnames';

function CitiesList() {
  const currentCity = useAppSelector(getCurrentCity);
  const dispatch = useAppDispatch();

  const getCityClickHandler = (city: TCity) => () => {
    dispatch(changeCity(city));
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          CITIES.map((city) => (
            <li key={`${city.name}-tab`} className="locations__item">
              <a
                className={classNames({
                  'locations__item-link tabs__item': true,
                  'tabs__item--active' : city.name === currentCity.name})}
                href="#"
                onClick={getCityClickHandler(city)}
              >
                <span>{city.name}</span>
              </a>
            </li>))
        }
      </ul>
    </section>
  );
}

export default CitiesList;
