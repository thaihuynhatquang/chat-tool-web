import { storiesOf } from '@storybook/react';
import React from 'react';
import { thread, threads, user } from 'storybook/sampleData';
import Thread from './components/Thread';
import Threads from './components/Threads';
import UserServing from './components/UserServing';
import UserServings from './components/UserServings';

const ThreadWrapper = (story) => <div style={{ width: '28%', height: 600 }}>{story()}</div>;

const closeFn = (id) => ({ cause }) => () => alert(`change status done of thread ${id}`);
const processFn = (id) => () => alert(`change change missCount of thread ${id}`);

storiesOf('Thread', module)
  .addDecorator(ThreadWrapper)
  .add('simple', () => (
    <Thread onSelectThread={(e) => e} thread={thread} isSelected onProcessThread={processFn} onCloseThread={closeFn} />
  ))
  .add('with last message is attachment', () => (
    <Thread
      isSelected
      onCloseThread={closeFn}
      onProcessThread={processFn}
      onSelectThread={(e) => e}
      thread={{
        ...thread,
        lastMessage: {
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
    <Thread
      isSelected
      onProcessThread={processFn}
      onCloseThread={closeFn}
      onSelectThread={(e) => e}
      thread={{ ...thread, missCount: 3, missTime: '2018-11-01 09:00:00' }}
    />
  ))
  .add('very long content text', () => (
    <Thread
      isSelected
      onProcessThread={processFn}
      onCloseThread={closeFn}
      onSelectThread={(e) => e}
      thread={{
        ...thread,
        title: 'This is very long name this is very long name',
        lastMessage: {
          ...thread.lastMsg,
          content:
            'This is very long text This is very long text This is very long text This is very long text This is very long text This is very long text This is very long text This is very long text This is very long text ',
        },
        updatedAt: '2016-10-31 13:00:00',
      }}
    />
  ))
  .add('user serving component', () => <UserServing user={user} isTooltipShow />)
  .add('list user serving component', () => <UserServings users={[user, { ...user, id: user.id + 1 }]} isTooltipShow />)
  .add('with user serving', () => (
    <Thread
      onProcessThread={processFn}
      onCloseThread={closeFn}
      isSelected
      onSelectThread={(e) => e}
      usersServing={[user, { ...user, id: user.id + 1 }]}
      thread={{
        ...thread,
        title: 'This is very long name this is very long name',
        lastMessage: {
          ...thread.lastMsg,
          content:
            'This is very long text This is very long text This is very long text This is very long text This is very long text This is very long text This is very long text This is very long text This is very long text ',
        },
        missCount: 30,
        updatedAt: '2016-10-31 13:00:00',
      }}
    />
  ));

storiesOf('Threads', module)
  .addDecorator(ThreadWrapper)
  .add('simple', () => (
    <Threads
      onProcessThread={processFn}
      onCloseThread={closeFn}
      selectedThreadId={1}
      onSelectThread={(e) => e}
      threads={threads}
      selectedThread={2}
    />
  ));
