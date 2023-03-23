import React from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setCategotyId, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { seacrhValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategotyId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = seacrhValue ? `&search=${seacrhValue}` : '';

    //   fetch(
    //     `https://63f9e49dbeec322c57e960a3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    //   )
    //     .then((res) => res.json())
    //     .then((arr) => {
    //       setItems(arr);
    //       setIsLoading(false);
    //     });
    //   //window.scrollTo(0, 0);
    // }, [categoryId, sort.sortProperty, seacrhValue, currentPage]);

    axios
      .get(
        `https://63f9e49dbeec322c57e960a3.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, seacrhValue, currentPage]);

  const pizzas = items.map((obj) => (
    <PizzaBlock
      key={obj.id}
      title={obj.title}
      price={obj.price}
      imageUrl={obj.imageUrl}
      sizes={obj.sizes}
      types={obj.types}
    />
  ));

  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination currentPage={currentPage} onChange={onChangePage} />
    </div>
  );
};
export default Home;
