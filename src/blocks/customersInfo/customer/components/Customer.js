import React, { Fragment } from 'react';
import SearchBox from './SearchBox';

const getCustomersText = (props) => {
  const { totalCount, customer } = props;
  if (totalCount === 1) return customer.name;
  return `${customer.name} và ${totalCount - 1} KH khác`;
};

const CustomerInfo = (props) => {
  const {
    searchCustomers,
    selectCustomer,
    customer: { name, additionData },
    totalCount,
  } = props;
  const avatarUrl = (additionData && additionData.avatarUrl) || '/images/default.png';
  return (
    <Fragment>
      <div>
        <span>Khách hàng: </span>
        <small>
          <div className='d-inline-block text-muted pl-1'>{getCustomersText(props)}</div>
        </small>
      </div>
      {totalCount > 1 && <SearchBox searchCustomers={searchCustomers} selectCustomer={selectCustomer} />}
      <div className='d-flex align-items-center pt-2'>
        <img
          className='rounded-circle mw-100 mr-2 object-fit-cover'
          width={40}
          height={40}
          src={avatarUrl}
          alt={name}
        />
        <span>{name}</span>
      </div>
    </Fragment>
  );
};

export default CustomerInfo;
