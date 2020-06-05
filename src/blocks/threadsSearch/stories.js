import React from 'react';
import { storiesOf } from '@storybook/react';

import NormalThreadSearch from './components/Normal';
import AdvanceThreadSearch from './components/Advance';
import { THREAD_STATUS_UNREAD } from 'shared/constants';

const ThreadWrapper = (story) => <div style={{ width: '28%', height: 600 }}>{story()}</div>;
const emptyFunction = () => {};

storiesOf('ThreadSearch', module)
  .addDecorator(ThreadWrapper)
  .add('normal mode', () => (
    <NormalThreadSearch
      initSearchText='ahihi'
      onChangeSearchText={emptyFunction}
      onKeyDownSearch={emptyFunction}
      toggleSearchMode={emptyFunction}
    />
  ))
  .add('advance mode', () => (
    <AdvanceThreadSearch
      localFilterBy={{
        status: THREAD_STATUS_UNREAD,
      }}
      onChangeFilter={emptyFunction}
      onSearch={emptyFunction}
      toggleSearchMode={emptyFunction}
    />
  ));
