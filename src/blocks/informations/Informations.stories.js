import React from 'react';
import { storiesOf } from '@storybook/react';
import ThreadInfo from './components/ThreadInfo';
import CustomerInfo from './components/CustomerInfo';
import NoteInfo from './components/NoteInfo';
import InformationsLayout from './components/InformationsLayout';

import { thread, customer, customers, tags, user, users } from 'storybook/sampleData';

const ThreadWrapper = (story) => <div style={{ width: '30%' }}>{story()}</div>;

storiesOf('Informations', module)
  .addDecorator(ThreadWrapper)
  .add('thread', () => <ThreadInfo thread={thread} activeStaffs={[user]} historyStaffs={users} />)
  .add('customer', () => <CustomerInfo customers={customers} tags={tags} />)
  .add('note', () => <NoteInfo notes={customer.notes} />)
  .add('layout', () => (
    <InformationsLayout
      thread={thread}
      activeStaffs={[user]}
      historyStaffs={users}
      customers={customers}
      tags={tags}
      notes={customer.notes}
    />
  ));
