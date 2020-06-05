import { storiesOf } from '@storybook/react';
import React from 'react';
import { customer } from 'storybook/sampleData';
import Customer from './components/Customer';

const CustomersInfoWrapper = (story) => <div style={{ width: '30%' }}>{story()}</div>;

storiesOf('Customer', module)
  .addDecorator(CustomersInfoWrapper)
  .add('simple', () => (
    <Customer customer={customer} totalCount={100} threadId={1} searchCustomers={() => {}} selectCustomer={() => {}} />
  ));
