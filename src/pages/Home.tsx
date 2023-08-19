import React, { useEffect, useRef, useCallback } from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { typeSort } from '../components/Sort';
import Pizza from '../components/Pizza';
import SkeletonPizza from '../components/Pizza/Skeleton';
import Pagination from '../components/Pagination';

import { setViewCategories, setCurrentPage, setFilters } from '../redux/Slices/filter/slice';
import { selectHome } from '../redux/Slices/filter/selector';

import { fetchPizzas  } from '../redux/Slices/pizza/slice';
import { SearchPizzaParams } from '../redux/Slices/pizza/types';
import { selectPizza } from '../redux/Slices/pizza/selector';

import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMount = useRef(false);

	import('../utils/math').then(math => {
		console.log(math.add(777, 888));
	})

  const { viewCategories, sort, currentPage, searchValue } = useSelector(selectHome);
  const {items, status } = useSelector(selectPizza);

  const categoriesChange = viewCategories > 0 ? `category=${viewCategories}&` : '';
  const sortChange = `sortBy=${sort.sortProperty}&order=desc`;
	
  const getPizzas = useCallback( async () => {
		// @ts-ignore
			dispatch(fetchPizzas({
				currentPage: String(currentPage),
				categoriesChange,
				sortChange,
			}))
		window.scrollTo(0, 0);
		
  }, [categoriesChange, sortChange, currentPage, dispatch]);
	
  useEffect(() => {
    if (window.location.search) {
      const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;
      const sortParam = typeSort.find((obj) => obj.sortProperty === params.sortChange);
      dispatch(
        setFilters({
					searchValue: params.currentPage,
					viewCategories: Number(params.categoriesChange),
          currentPage:Number(params.currentPage) ,
          sort: sortParam || typeSort[0],
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
      getPizzas();
    isSearch.current = false;
  }, [getPizzas]);

  useEffect(() => {
    if (isMount.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoriesChange,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMount.current = true;
  }, [categoriesChange, sort.sortProperty, currentPage, navigate]);

  const itemsValue = items.filter((item: any) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((obj: any) => (<Pizza key={obj.id} {...obj} />));
  const skeleton = [...Array(8)].map((_, i) => (<SkeletonPizza key={i} />));

  // const onClickViewCategories = (id: number) => {
  //   dispatch(setViewCategories(id));
  // };
  const onClickViewCategories = React.useCallback((id: number) => {
    dispatch(setViewCategories(id));
  }, [dispatch])

  const onClickCurrentPage = (id: number) => {
    dispatch(setCurrentPage(id));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={viewCategories} onClickViewCategories={onClickViewCategories} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loading'
          ? skeleton
          : itemsValue
        }
      </div>
      <Pagination
        onClickCurrentPage={(id: number) => onClickCurrentPage(id)} />
    </div>
  );
}

export default Home;