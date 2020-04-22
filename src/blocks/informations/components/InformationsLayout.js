import React from 'react';
import ThreadInfo from './ThreadInfo';
import CustomerInfo from './CustomerInfo';
import NoteInfo from './NoteInfo';

const InformationsLayout = (props) => {
  const { thread, activeStaffs, historyStaffs, notes, customers, tags } = props;
  return (
    <div className='border-left h-100' style={{ overflowY: 'auto' }}>
      <ThreadInfo thread={thread} activeStaffs={activeStaffs} historyStaffs={historyStaffs} />
      <CustomerInfo customers={customers} tags={tags} />
      <NoteInfo notes={notes} />
    </div>
  );
};

export default InformationsLayout;
