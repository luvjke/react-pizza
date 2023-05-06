import React from 'react';

import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilter,
  setCategotyId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const { seacrhValue } = React.useContext(SearchContext);

  const onChangeCategory = (id) => {
    dispatch(setCategotyId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = seacrhValue ? `&search=${seacrhValue}` : '';

    dispatch(fetchPizzas({ sortBy, order, category, search, currentPage }));
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
    }
  });
  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, seacrhValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          Произошла ошибка <icon>😓</icon>
          <p>
            Не удалось получить ПИЦЦУ^^
            <br />
            Нам очень грустно.ХЕЛЛОУ КИТТИ
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChange={onChangePage} />
    </div>
  );
};
export default Home;
