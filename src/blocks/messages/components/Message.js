import React, { Fragment } from 'react';
import classNames from 'classnames';
import Verified from 'shared/components/Verified';
import Attachments from './Attachments';
import { visualTime } from 'shared/utils';
import { formatMessage } from '../utils';
import { SEND_STATUS_PENDING, SEND_STATUS_ARRIVED, SEND_STATUS_COMPLETED } from '../constants';

const Message = (props) => {
  const { message, isShowName, isShowAvatar } = props;
  const { mid, content, customer, user, isVerified, additionData, sendingStatus, errorMessage, msgCreatedAt } = message;
  const ownerName = (isVerified && user && user.name) || (customer && customer.name);
  const ownerAvatar =
    (isVerified && user && user.avatarUrl) || (customer && customer.additionData && customer.additionData.avatarUrl);
  const attachments = additionData && additionData.attachments;
  const tooltipId = `message_${mid}`;
  return (
    <Fragment>
      <div
        className={classNames('mb-1 mw-55', {
          'pr-5 float-right': isVerified,
          'pl-5': !isVerified,
        })}
        title={visualTime(msgCreatedAt)}>
        {isShowName && (
          <small
            className={classNames('d-block text-secondary', {
              'float-right': isVerified,
              'pl-3': !isVerified,
            })}>
            {ownerName}
            {!!isVerified && <Verified />}
          </small>
        )}
        <div className='position-relative'>
          {isShowAvatar && (
            <img
              className='rounded-circle position-absolute mt-1 object-fit-cover'
              src={ownerAvatar}
              alt={ownerName}
              width={25}
              height={25}
              style={{
                [isVerified ? 'right' : 'left']: '-2rem',
                bottom: '.25rem',
              }}
            />
          )}
          <span
            id={tooltipId}
            className={classNames('px-3 py-1 d-inline-block round-circle text-pre-wrap position-relative', {
              'bg-dark text-white float-right': isVerified,
              'bg-light': !isVerified,
            })}>
            {formatMessage(content)}
            {attachments && <Attachments attachments={attachments} />}
            {sendingStatus && (
              <small
                className='position-absolute'
                style={{
                  [isVerified ? 'left' : 'right']: '-1.25rem',
                  bottom: '.35rem',
                }}>
                <i
                  className={classNames('text-dark', {
                    'far fa-circle': sendingStatus === SEND_STATUS_PENDING,
                    'far fa-check-circle': sendingStatus === SEND_STATUS_ARRIVED,
                    'fas fa-check-circle': sendingStatus === SEND_STATUS_COMPLETED,
                  })}
                />
              </small>
            )}
          </span>

          <div className='clearfix' />
          {errorMessage && (
            <small
              className={classNames('d-block text-danger', {
                'pl-1': !isVerified,
              })}>
              <i className='fas fa-exclamation-circle' /> {errorMessage}
            </small>
          )}
        </div>
      </div>
      <div className='clearfix' />
    </Fragment>
  );
};

export default Message;
