import React from 'react';
import { storiesOf } from '@storybook/react';

import Customer from './components/Customer';

import { customer } from 'storybook/sampleData';

const CustomersInfoWrapper = (story) => <div style={{ width: '30%' }}>{story()}</div>;

storiesOf('Customer', module)
  .addDecorator(CustomersInfoWrapper)
  .add('simple', () => <Customer customer={customer} totalCount={100} threadId={1} />);
