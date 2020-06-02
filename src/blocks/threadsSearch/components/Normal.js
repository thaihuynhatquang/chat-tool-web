import React from 'react';
import { Input } from 'reactstrap';
import { pure } from 'recompose';

export const NormalMode = (props) => {
  const { initSearchText, onChangeSearchText, onKeyDownSearch, toggleSearchMode } = props;
  return (
    <div className='search-input'>
      <i className='fas fa-search' />
      <Input
        bsSize='sm'
        type='search'
        name='thread-search'
        placeholder='Tìm kiếm...'
        autoComplete='off'
        defaultValue={initSearchText}
        onChange={onChangeSearchText}
        onKeyDown={onKeyDownSearch}
      />
      <div className='d-flex justify-content-end'>
        <button className='btn btn-sm btn-link px-1 py-0' onClick={toggleSearchMode}>
          <small>Tìm kiếm nâng cao</small>
        </button>
      </div>
    </div>
  );
};

export default pure(NormalMode);
