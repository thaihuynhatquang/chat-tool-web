import React, { Fragment } from 'react';
import Verified from 'shared/components/Verified';

export const formatThreadLastMessage = (message) => {
  const { content, additionData, isVerified, customer, user } = message;

  const customerName = customer && customer.name;
  const userName = user && user.name;
  const isAttachmentMessage = additionData && additionData.attachments;
  const contentFormat = isAttachmentMessage ? (
    <Fragment>
      {' '}
      Đã gửi một tập tin <i className='fas fa-paperclip' />{' '}
    </Fragment>
  ) : (
    content
  );

  return (
    <span>
      {userName || customerName}
      {isVerified && <Verified />}: {contentFormat}
    </span>
  );
};
