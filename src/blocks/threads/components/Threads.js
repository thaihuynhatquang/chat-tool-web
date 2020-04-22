import React, { PureComponent, Fragment } from 'react';
import Thread from './Thread';

class Threads extends PureComponent {
  render() {
    const { threads, selectedThread } = this.props;
    return (
      <Fragment>
        {threads.map((thread) => (
          <Thread key={thread.id} thread={thread} isSelected={thread.id === selectedThread} />
        ))}
      </Fragment>
    );
  }
}

export default Threads;
