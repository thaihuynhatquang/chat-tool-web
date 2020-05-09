import React, { Fragment } from 'react';
import Thread from './Thread';

export const Threads = (props) => {
  const { threads, selectedThreadId, onSelectThread } = props;
  return (
    <Fragment>
      {threads.map((thread) => (
        <Thread
          key={thread.id}
          thread={thread}
          isSelected={thread.id === selectedThreadId}
          onSelectThread={onSelectThread}
        />
      ))}
    </Fragment>
  );
};

export default Threads;
