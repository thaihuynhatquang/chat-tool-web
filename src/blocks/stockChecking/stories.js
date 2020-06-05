import { storiesOf } from '@storybook/react';
import React from 'react';
import { product, products } from 'storybook/sampleData';
import { StockChecking } from '../stockChecking';
import InputSearch from './components/InputSearch';
import Product from './components/Product';
import Products from './components/Products';

const ThreadWrapper = (story) => <div style={{ width: '50%', height: 600 }}>{story()}</div>;

storiesOf('StockChecking', module)
  .addDecorator(ThreadWrapper)
  .add('simple', () => <Product product={product} />)
  .add('advance list', () => <Products products={products} getProducts={() => {}} totalItems={100} />)
  .add('input search', () => <InputSearch searchText='' setSearchText={() => {}} isLoading />)
  .add('stock checking', () => (
    <StockChecking
      searchText=''
      setSearchText={() => {}}
      isLoading
      products={products}
      totalItems={100}
      getProducts={() => {}}
    />
  ));
