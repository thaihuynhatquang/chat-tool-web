import React from 'react';
import { Input } from 'reactstrap';
import { pure } from 'recompose';

export const Search = (props) => {
  const { onChangeSearchText, onSearch, toggleSearchMode, initSearchText } = props;
  return (
    <div className='search-input'>
      <i className='fas fa-search' />
      <Input
        bsSize='sm'
        type='search'
        name='thread-search'
        placeholder='Tìm kiếm...'
        defaultValue={initSearchText}
        onChange={onChangeSearchText}
        onKeyUp={onSearch}
      />
      <div className='d-flex justify-content-end'>
        <button className='btn btn-sm btn-link px-1 py-0' onClick={toggleSearchMode}>
          <small>Tìm kiếm nâng cao</small>
        </button>
      </div>
    </div>
  );
};

export default pure(Search);
