import { memo } from 'react';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { SortKeys } from '../../utils';
import { TSortBy } from '../../types/sort';
import { getCurrentSort } from '../../store/slices/offers-slice';
import { changeSort } from '../../store/slices/offers-slice';

function SortingComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const currentSort = useAppSelector(getCurrentSort);
  const dispatch = useAppDispatch();

  const handleToggleSortPopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectSortClick = (key: TSortBy) => {
    dispatch(changeSort(key));
  };

  const getSortingHandler = (key: TSortBy) => () => {
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
              onClick={getSortingHandler(key)}
            >
              {key}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

const Sorting = memo(SortingComponent);

export default Sorting;
