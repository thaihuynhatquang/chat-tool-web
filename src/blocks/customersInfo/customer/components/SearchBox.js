import React from 'react';
import AsyncSelect from 'react-select/lib/Async';

const CustomerOptionLabel = (customer) => {
  const { additionData, name } = customer;
  const avatar = (additionData && additionData.avatarUrl) || '/images/default.png';
  return (
    <div>
      <img className='rounded-circle object-fit-conver mr-3' src={avatar} alt={name} width={20} height={20} />
      {name}
    </div>
  );
};

const getOptionValue = (option) => option.id;

export const SearchBox = (props) => {
  const { selectCustomer, searchCustomers } = props;
  return (
    <div className='my-2'>
      <small>
        <AsyncSelect
          value={null}
          loadingMessage={() => 'Đang tải...'}
          noOptionsMessage={() => 'Danh sách rỗng'}
          placeholder='Nhập tên khách hàng muốn tìm kiếm...'
          formatOptionLabel={CustomerOptionLabel}
          getOptionValue={getOptionValue}
          onChange={selectCustomer}
          loadOptions={searchCustomers}
          defaultOptions
          cacheOptions
        />
      </small>
    </div>
  );
};

export default SearchBox;
