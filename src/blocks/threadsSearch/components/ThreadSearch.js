import React from 'react';
import { Input } from 'reactstrap';

export const Search = (props) => {
  return (
    <div className='search-input'>
      <i className='fas fa-search' />
      <Input
        bsSize='sm'
        type='search'
        name='thread-search'
        placeholder='Tìm kiếm...'
        onChange={props.onChangeSearchText}
        onKeyUp={props.onSearch}
      />
    </div>
  );
};

export default Search;
