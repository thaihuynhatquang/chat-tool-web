import { storiesOf } from '@storybook/react';
import React, { Fragment } from 'react';
import { quickReplies } from 'storybook/sampleData';
import QuickReplies from './components/QuickReplies/components/QuickReplies';
import QuickReplyInput from './components/QuickReplyInput/components/QuickReplyInput';

const ThreadWrapper = (story) => <div style={{ width: '28%', height: 600 }}>{story()}</div>;

storiesOf('QuickReply', module)
  .addDecorator(ThreadWrapper)
  .add('simple', () => (
    <QuickReplies
      onClickItem={() => () => alert('on click item')}
      quickReplies={quickReplies}
      deleteQuickReply={(id) => () => alert('delete ' + id)}
    />
  ))
  .add('input simple', () => (
    <QuickReplyInput
      content={''}
      addNewQuickReply={() => alert('add new quick reply')}
      deleteQuickReply={(id) => () => alert(`delete reply ${id}`)}
      onChangeNewQuickReply={() => {}}
      isLoading={false}
    />
  ))
  .add('input loading', () => (
    <QuickReplyInput
      content={''}
      addNewQuickReply={() => alert('add new quick reply')}
      deleteQuickReply={(id) => () => alert(`delete reply ${id}`)}
      onChangeNewQuickReply={() => {}}
      isLoading
    />
  ))
  .add('replies simple', () => (
    <Fragment>
      <QuickReplies
        onClickItem={() => () => alert('on click item')}
        quickReplies={quickReplies}
        deleteQuickReply={(id) => () => alert('delete ' + id)}
      />
      <QuickReplyInput
        content={''}
        addNewQuickReply={() => alert('add new quick reply')}
        deleteQuickReply={(id) => () => alert(`delete reply ${id}`)}
        onChangeNewQuickReply={() => {}}
        isLoading={false}
      />
    </Fragment>
  ))
  .add('replies withLoading', () => (
    <Fragment>
      <QuickReplies
        onClickItem={() => () => alert('on click item')}
        quickReplies={quickReplies}
        deleteQuickReply={(id) => () => alert('delete ' + id)}
      />
      <QuickReplyInput
        content={''}
        addNewQuickReply={() => alert('add new quick reply')}
        deleteQuickReply={(id) => () => alert(`delete reply ${id}`)}
        onChangeNewQuickReply={() => {}}
        isLoading
      />
    </Fragment>
  ));
