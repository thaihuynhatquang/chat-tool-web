import React, { PureComponent } from 'react';
import { Input } from 'reactstrap';

class Search extends PureComponent {
  render() {
    return (
      <div className='search-input'>
        <i className='fas fa-search' />
        <Input bsSize='sm' type='search' name='thread-search' placeholder='Tìm kiếm...' />
      </div>
    );
  }
}

export default Search;
