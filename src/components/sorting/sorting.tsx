import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { sortOffers } from '../../store/action';
import { SortKeys } from '../../utils';
import { TSortNames } from '../../types/sort';

function Sorting() {
  const [isOpen, setIsOpen] = useState(false);
  const currentSort = useAppSelector((state) => state.sort);
  const dispatch = useAppDispatch();

  const handleToggleSortPopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectSortClick = (key: TSortNames) => {
    dispatch(sortOffers(key));
  };

  const combinebSortingHandler = (key: TSortNames) => {
    handleToggleSortPopup();
    handleSelectSortClick(key);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by  </span>
      <span onClick={handleToggleSortPopup} className="places__sorting-type" tabIndex={0}>
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {
          SortKeys.map((key) => (
            <li
              className={`places__option ${currentSort === key ? 'places__option--active' : ''}`}
              tabIndex={0}
              key={key}
              onClick={() => combinebSortingHandler(key)}
            >
              {key}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default Sorting;
