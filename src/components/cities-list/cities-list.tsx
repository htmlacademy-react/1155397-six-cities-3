import { CITIES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectCity } from '../../store/action';

function CitiesList() {
  const selectedCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  return (
    <ul className="locations__list tabs__list">
      {
        CITIES.map((city) => (
          <li key={city.name} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${city.name === selectedCity.name ? 'tabs__item--active' : ''}`}
              href="#"
              onClick={() => dispatch(selectCity(city))}
            >
              <span>{city.name}</span>
            </a>
          </li>)
        )
      }
    </ul>
  );
}

export default CitiesList;
