import React, { Fragment } from 'react';
import Thread from './Thread';

export const Threads = (props) => {
  const { threads, selectedThreadId, onSelectThread, onCloseThread, onProcessThread } = props;
  return (
    <Fragment>
      {threads.map((thread) => (
        <Thread
          key={thread.id}
          usersServing={thread.usersServing}
          thread={thread}
          isSelected={thread.id === selectedThreadId}
          onSelectThread={onSelectThread}
          onCloseThread={onCloseThread}
          onProcessThread={onProcessThread}
        />
      ))}
    </Fragment>
  );
};

export default Threads;
