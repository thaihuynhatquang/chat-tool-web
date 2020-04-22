// @flow
import React from 'react';
import { Input } from 'reactstrap';
import TagSelector from './TagSelector';

// TODO: rewrite proptype

// TODO: rewrite proptype
const getCustomersText = (customers) => {
  if (customers.length === 1) {
    return customers[0].name;
  } else {
    return `${customers[0].name} và ${customers.length - 1} KH khác`;
  }
};

const CustomerInfo = (props) => {
  const { customers } = props;
  const fstCustomer = customers[0];
  return (
    <div className='pl-2 pr-2 pt-1 mt-1 border-top'>
      <div>
        <span>Khách hàng: </span>
        <small>
          <div className='d-inline-block text-muted pl-1'>{getCustomersText(customers)}</div>
        </small>
      </div>
      <div className='search-input mt-2'>
        <i className='fas fa-search' />
        <Input bsSize='sm' type='search' name='thread-search' placeholder='Tìm kiếm...' />
      </div>
      <div className='d-flex align-items-center pt-2'>
        <div className='mr-2' style={{ width: 50 }}>
          <img className='rounded-circle mw-100' src={fstCustomer.additionData.avatarUrl} alt='avatar' />
        </div>
        <div>{fstCustomer.name}</div>
      </div>

      <div className='pt-2'>
        <TagSelector customerTags={fstCustomer.tags} tags={props.tags} />
      </div>
    </div>
  );
};

export default CustomerInfo;
