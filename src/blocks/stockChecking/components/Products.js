import React from 'react';
import { compose } from 'recompose';
import { withEmpty, withInfiniteScroll } from 'shared/hooks';
import Product from './Product';

export const CONTAINER_ID = 'productlist';

const Products = (props) => {
  const { products } = props;
  return (
    <div className='row p-0 m-0'>
      {products.map((product, index) => (
        <div className='col-12 p-0' key={index}>
          <Product product={product} />
        </div>
      ))}
    </div>
  );
};

const isBottom = (el) => {
  if (!el) return false;
  const { scrollTop, clientHeight, scrollHeight } = el;
  return scrollTop + clientHeight >= scrollHeight - 20;
};

const enhance = compose(
  withEmpty((props) => props.products.length === 0, { centerVertical: true }),
  withInfiniteScroll(
    CONTAINER_ID,
    (props) => {
      const wrappedElement = document.getElementById(CONTAINER_ID);
      return isBottom(wrappedElement);
    },
    (props) => props.products.length < props.totalItems,
    async (props) => {
      return props.getProducts(null, true);
    },
    (props) => (res) => {
      // handle response success
    },
    (props) => (error) => {
      // handle response error
    },
  ),
);
export default enhance(Products);
