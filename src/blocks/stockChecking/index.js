import React from 'react';
import { compose, mapProps, withHandlers, withStateHandlers } from 'recompose';
import { withFetcher } from 'shared/hooks';
import { generate_random_string } from 'shared/utils';
import InputSearch from './components/InputSearch';
import Products, { CONTAINER_ID } from './components/Products';
import * as services from './services';

export const StockChecking = (props) => {
  const { priceSort, updatePriceSort, searchText, setSearchText, isLoading, products, getProducts, totalItems } = props;
  return (
    <div
      className='position-absolute'
      style={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}>
      <div className='d-flex flex-column h-100'>
        <div className='pt-1 px-1 pb-2 flex-grow-0 flex-shrink-1'>
          <InputSearch
            priceSort={priceSort}
            updatePriceSort={updatePriceSort}
            searchText={searchText}
            setSearchText={setSearchText}
            isLoading={isLoading}
          />
        </div>
        <div id={CONTAINER_ID} className='flex-grow-1 flex-shrink-1' style={{ overflowY: 'auto' }}>
          <Products totalItems={totalItems} products={products} getProducts={getProducts} />
        </div>
      </div>
    </div>
  );
};

let currentRequestKey = null;
const LOCAL_STORAGE_PRICE_SORT_KEY = 'stockPriceSort';

const enhance = compose(
  withStateHandlers(
    {
      searchText: '',
      priceSort: localStorage.getItem(LOCAL_STORAGE_PRICE_SORT_KEY) || 'none',
      isLoading: false,
      products: [],
      pageSize: 10,
      nextPage: 0,
      totalItems: 0,
    },
    {
      setSearchText: (state) => (searchText) => ({
        ...state,
        searchText: searchText,
      }),
      setLoading: (state) => (value) => ({ ...state, isLoading: value }),
      setPaginate: (state) => ({ nextPage, totalItems }) => ({
        ...state,
        nextPage,
        totalItems,
      }),
      setProducts: (state) => (products) => ({
        ...state,
        products: products,
      }),
      insertProducts: (state) => (products) => ({
        ...state,
        products: [...state.products, ...products],
      }),
      setPriceSort: (state) => (value) => ({
        ...state,
        priceSort: value,
      }),
    },
  ),
  withHandlers({
    updatePriceSort: (props) => () => {
      const order = ['none', 'asc', 'desc'];
      const index = (order.findIndex((item) => item === props.priceSort) + 1) % 3 || 0;
      props.setPriceSort(order[index]);
      localStorage.setItem(LOCAL_STORAGE_PRICE_SORT_KEY, order[index]);
    },
    getProducts: (props) => async (input, isAppend = false) => {
      if (!props.searchText) return;
      const { priceSort } = props;
      const order = priceSort !== 'none' ? 'price' : null;
      const orderBy = priceSort !== 'none' ? priceSort : null;
      const nextPage = input && typeof input.nextPage === 'number' ? input.nextPage : props.nextPage;

      const requestKey = generate_random_string();
      currentRequestKey = requestKey;
      const res = await services.getProducts({
        searchText: props.searchText.trim(),
        order,
        orderBy,
        nextPage,
        requestKey,
      });

      const { result, status, products, requestKey: returnRequestKey } = res;
      if (!result && !status) return;

      props.setPaginate({
        nextPage: nextPage + 1,
        totalItems: products.length === 0 ? 0 : Number.MAX_SAFE_INTEGER,
      });

      const sortedProducts = products.sort((a, b) => b.numberInStockSaleable - a.numberInStockSaleable);
      // Append or insert
      if (isAppend) {
        props.insertProducts(sortedProducts);
      } else if (returnRequestKey === currentRequestKey) {
        props.setProducts(sortedProducts);
      }

      return res;
    },
  }),
  withFetcher(
    'productSearch',
    async (props) => {
      props.setLoading(true);
      await props.getProducts({
        nextPage: 0,
      });
      props.setLoading(false);
    },
    {
      fetchOnPropsChange: ['searchText', 'priceSort'],
    },
  ),
  mapProps((props) => {
    const {
      priceSort,
      updatePriceSort,
      searchText,
      isLoading,
      setSearchText,
      products,
      getProducts,
      totalItems,
    } = props;
    return {
      priceSort,
      updatePriceSort,
      searchText,
      isLoading,
      setSearchText,
      products,
      getProducts,
      totalItems,
    };
  }),
);

export default enhance(StockChecking);
