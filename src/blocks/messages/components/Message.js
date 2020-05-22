import React, { Fragment } from 'react';
import classNames from 'classnames';
import { pure } from 'recompose';
import Verified from 'shared/components/Verified';
import Attachments from './Attachments';
import { visualTime } from 'shared/utils';
import { formatMessage } from '../utils';
import { SEND_STATUS_PENDING, SEND_STATUS_ARRIVED, SEND_STATUS_COMPLETED } from '../constants';

const Message = (props) => {
  const {
    isShowName,
    isShowAvatar,
    sendingStatus,
    errorMessage,
    mid,
    content,
    customer,
    user,
    isVerified,
    additionData,
    msgCreatedAt,
    messageLevel = 1,
  } = props;
  const shouldFloatRight = messageLevel === 1 && isVerified;
  const ownerName = (isVerified && user && user.name) || (customer && customer.name);
  const ownerAvatar =
    (isVerified && user && user.avatarUrl) || (customer && customer.additionData && customer.additionData.avatarUrl);
  const attachments = additionData && additionData.attachments;
  const tooltipId = `message_${mid}`;
  return (
    <Fragment>
      <div
        className={classNames('mb-1 mw-55', {
          'pr-5 float-right': shouldFloatRight,
          'pl-5': !shouldFloatRight,
        })}>
        {isShowName && (
          <small
            className={classNames('d-block text-secondary', {
              'float-right': shouldFloatRight,
              'pl-3': !shouldFloatRight,
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
              title={ownerName}
              width={25}
              height={25}
              style={{
                [shouldFloatRight ? 'right' : 'left']: '-2rem',
                bottom: '.25rem',
              }}
            />
          )}
          <span
            id={tooltipId}
            className={classNames(
              'px-3 py-1 d-inline-block round-circle text-pre-wrap text-justify position-relative',
              {
                'bg-dark text-white float-right': shouldFloatRight,
                'bg-light': !shouldFloatRight,
              },
            )}
            title={visualTime(msgCreatedAt)}>
            {formatMessage(content)}
            {attachments && <Attachments attachments={attachments} />}
            {sendingStatus && (
              <small
                className='position-absolute'
                style={{
                  [shouldFloatRight ? 'left' : 'right']: '-1.25rem',
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
        </div>
        {errorMessage && (
          <small
            className={classNames('d-block text-danger text-pre-wrap text-justify', {
              'pl-1': !isVerified,
            })}>
            <i className='fas fa-exclamation-circle' /> {errorMessage}
          </small>
        )}
      </div>
      <div className='clearfix' />
    </Fragment>
  );
};

export default pure(Message);
