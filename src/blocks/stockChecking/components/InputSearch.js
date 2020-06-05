import Tooltip from 'antd/lib/tooltip';
import React from 'react';
import { Input } from 'reactstrap';
import { compose, withHandlers } from 'recompose';

const InputSearch = (props) => {
  const { isLoading, priceSort, updatePriceSort, searchText, onChangeSearchText, onKeyDownSearch } = props;
  return (
    <div className='search-input'>
      <i className='fas fa-search' />
      <Input
        bsSize='sm'
        type='search'
        placeholder='Tìm kiếm sản phẩm theo tên / mã'
        autoComplete='off'
        defaultValue={searchText}
        onChange={onChangeSearchText}
        onKeyDown={onKeyDownSearch}
      />
      {isLoading && <i className='fa-loading fas fa-circle-notch fa-spin' />}
      <p className='text-secondary font-size-sm pl-2'>
        Sắp xếp giá:{' '}
        <button disabled className='btn btn-sm' onClick={updatePriceSort} style={{ outline: 0, boxShadow: 'none' }}>
          {priceSort === 'asc' && (
            <Tooltip title='Tăng dần' placement='right'>
              <i className='fas fa-sort-amount-up text-success' />
            </Tooltip>
          )}
          {priceSort === 'desc' && (
            <Tooltip title='Giảm dần' placement='right'>
              <i className='fas fa-sort-amount-down text-danger' />
            </Tooltip>
          )}
          {priceSort === 'none' && (
            <Tooltip title='Không sắp xếp' placement='right'>
              <i className='fas fa-random text-primary' />
            </Tooltip>
          )}
        </button>
      </p>
    </div>
  );
};
let timeout = null;
const enhance = compose(
  withHandlers({
    onChangeSearchText: (props) => (e) => {
      const text = e.target.value;
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        props.setSearchText(text);
      }, 500);
    },
    onKeyDownSearch: (props) => (e) => {
      if (e.key === 'Enter') {
        const text = e.target.value;
        timeout && clearTimeout(timeout);
        props.setSearchText(text);
      }
    },
  }),
);

export default enhance(InputSearch);
