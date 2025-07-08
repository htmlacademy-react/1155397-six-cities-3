import { CITIES } from '../../const';
import { useAppDispatch } from '../../store/hooks';
import { selectCity } from '../../store/action';

type TListCities = {
  selectedCity: string;
}

function ListCities({ selectedCity }: TListCities) {

  const dispatch = useAppDispatch();

  return (
    <ul className="locations__list tabs__list">
      {
        CITIES.map((city) => (
          <li key={city} className="locations__item">
            <a
              className={`locations__item-link tabs__item ${city === selectedCity ? 'tabs__item--active' : ''}`}
              href="#"
              onClick={() => dispatch(selectCity(city))}
            >
              <span>{city}</span>
            </a>
          </li>)
        )
      }
    </ul>
  );
}

export default ListCities;
