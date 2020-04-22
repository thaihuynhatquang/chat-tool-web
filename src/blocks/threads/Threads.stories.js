import React from 'react';
import { storiesOf } from '@storybook/react';

import Thread from './components/Thread';
import Threads from './components/Threads';
import ThreadSearch from './components/ThreadSearch';
import ThreadHeader from './components/ThreadHeader';
import ThreadsLayout from './components/ThreadsLayout';

import { thread, threads } from 'storybook/sampleData';

const ThreadWrapper = (story) => <div style={{ width: '28%', height: 600 }}>{story()}</div>;

storiesOf('Thread', module)
  .addDecorator(ThreadWrapper)
  .add('simple', () => <Thread thread={thread} isSelected />)
  .add('with last message is attachment', () => (
    <Thread
      thread={{
        ...thread,
        lastMsg: {
          ...thread.lastMsg,
          isVerified: false,
          content: null,
          additionData: {
            attachments: [
              {
                type: 'image',
                payload: {
                  url:
                    'https://scontent.xx.fbcdn.net/v/t1.15752-9/44916255_1916856578389930_5293774628018192384_n.jpg?_nc_cat=106&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=b9e636b2aa696d936970591c7059d893&oe=5C7D19E2',
                },
              },
            ],
          },
        },
      }}
    />
  ))
  .add('with miss count and time', () => (
    <Thread thread={{ ...thread, missCount: 3, missTime: '2018-11-01 09:00:00' }} />
  ))
  .add('very long content text', () => (
    <Thread
      thread={{
        ...thread,
        title: 'This is very long name this is very long name',
        lastMsg: {
          ...thread.lastMsg,
          content:
            'This is very long text This is very long text This is very long text This is very long text This is very long text This is very long text This is very long text This is very long text This is very long text ',
        },
        updatedAt: '2016-10-31 13:00:00',
      }}
    />
  ));

storiesOf('Threads', module)
  .addDecorator(ThreadWrapper)
  .add('simple', () => <Threads threads={threads} selectedThread={2} />);

storiesOf('ThreadSearch', module)
  .addDecorator(ThreadWrapper)
  .add('simple', () => <ThreadSearch />);

storiesOf('ThreadHeader', module)
  .addDecorator(ThreadWrapper)
  .add('simple', () => <ThreadHeader status='processing' count={30} />);

storiesOf('ThreadLayout', module)
  .addDecorator(ThreadWrapper)
  .add('simple', () => (
    <ThreadsLayout threads={threads} currentFilterStatus='processing' countThreads={30} selectedThread={2} />
  ))
  .add('with scroll', () => (
    <ThreadsLayout threads={threads} currentFilterStatus='processing' countThreads={30} selectedThread={2} />
  ));
