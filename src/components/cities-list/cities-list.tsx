import { CITIES } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateOffers, selectCity } from '../../store/action';
import { TCity } from '../../types/offers';
import classNames from 'classnames';

function CitiesList() {
  const currentCity = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();

  const cityTabClickHandler = ({ currentTarget }: React.MouseEvent<HTMLElement>) => {
    const cityTarget = currentTarget.dataset.city;
    const selectedCity: Omit<TCity, 'location'> = {};
    selectedCity.name = cityTarget;
    dispatch(selectCity(cityTarget));
    dispatch(updateOffers());
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {
          CITIES.map((city) => (
            <li key={`${city.name}-tab`} className="locations__item">
              <a className={classNames({
                'locations__item-link tabs__item': true,
                'tabs__item--active' : city.name === currentCity.name})}
              href="#" data-city={city.name}
              onClick={cityTabClickHandler}
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
